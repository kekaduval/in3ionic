import { Injectable } from '@angular/core';
import { observable, action, } from 'mobx-angular';
import { reaction, configure } from 'mobx';

import { FirestoreService } from './providers/firestore/firestore.service';
import { Visitor } from './models/visitor.interface';

import { take, first } from 'rxjs/operators';

configure({ enforceActions: true })

@Injectable()
export class VisitorStore {
  // @observable
  // visitors: Visitor[] = [];

  @observable
  signOutSearchText = '';

  // ANY CHANGE IN THE LENGTH OF THE OBJECT REQUIRES IT
  // TO BE WRITTEN TO STORAGE
  // updateStorage = reaction(
  //   () =>
  //     this.visitors,
  //   visitors => {
  //     this.firestore.updateManyObjectsInCollection('visitors', this.visitors);
  //   }
  // );

  constructor(
    private firestore: FirestoreService
  ) {
    //this.deleteAllVisitors();
  }

  /**
   * 
   */
      // return this.visitors.filter(visitor => visitor.signedIn && visitor.name.toLowerCase().includes(this.signOutSearchText.toLowerCase()));
  signedInVisitors(input) {
    this.firestore.getAllObjectsFromCollection(
      'visitors',
      ref => ref.where('signedIn', '==', true).where('email', '==', input)
    )
  }

  /**
   * Checks if the visitor is already in the store. 
   * If they are, change their signedIn status and save the store.
   * If they aren't, add them and save the store.
   *
   * @param {Visitor} visitor
   * @visitorof VisitorStore
   */
  @action
  signIn(visitor: any) {
    console.log('Signing Visitor In');
    // look to see if visitor exists
    this.firestore.getAllObjectsFromCollection('visitors', ref => ref.where('name', '==', visitor.name))
      .pipe(first())
      .subscribe(allVisitors => {

        console.log('getting Visitor')
        let now = new Date();
        let meta = {
          reason: visitor.reason,
          event: visitor.event || '',
          member: visitor.member || ''
        }
        delete visitor.reason;
        delete visitor.event;
        delete visitor.member;
        // if visitor not found, add it to the list...
        if (allVisitors.length == 0) {
          let newVisitor: Partial<Visitor> = {
            ...visitor,
            createdAt: now,
            lastSignIn: now,
            signedIn: true,
          };
          this.firestore.addObjectToCollection('visitors', newVisitor).then(result => {
            console.log('object added: ', result)
            this.firestore.addObjectToCollection('visits', {
              visitor: result.id,
              startTime: now,
              signedIn: true,
              ...meta
            })
          })
        } else {
          debugger
          let fetchedVisitor = allVisitors[0];
          fetchedVisitor.signedIn = true;
          this.firestore.updateObjectInCollection('visitors', fetchedVisitor.id, fetchedVisitor);
          this.firestore.addObjectToCollection('visits', {
            visitor: fetchedVisitor.id,
            startTime: now,
            signedIn: true,
            ...meta
          })
        }
      })
  }

  /**
   *
   * @param {Visitor} visitor
   * @visitorof VisitorStore
   */
  @action
  signOut(visitor: Partial<Visitor>) {
    console.log('Signing Visitor Out');
    visitor.signedIn = false;
    this.firestore.updateObjectInCollection('visitors', visitor.id, visitor);

    // visitor.visits[0].length = Date.now() - visitor.lastSignIn;
    this.firestore.getAllObjectsFromCollection('visits', ref => ref.where('visitor', '==', visitor.id)
      .where('signedIn', '==', true))
      .pipe(take(1))
      .subscribe(visits => {
        console.log('getting all visits')
        if (visits.length > 0) {
          let visit = visits[0]
          visit.endTime = new Date();
          visit.signedIn = false;
          this.firestore.updateObjectInCollection('visits', visit.id, visit);
        } else
          console.log('No visits found for this visitor.')
      })

  }

  @action
  setSignOutSearchText(text) {
    this.signOutSearchText = text;
  }

}
