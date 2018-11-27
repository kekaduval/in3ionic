import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";

// FIREBASE
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase";

import { of } from "rxjs/observable/of";

export const firebaseConfig = {};

@Injectable()
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private platform: Platform
  ) {
    console.log("Hello FirestoreProvider Provider");
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  get auth() {
    return this.afAuth.auth;
  }

  /**
   *
   * @param email
   * @param password
   * @param _data
   */
  getUserProfile(userId) {
    let userProfiles = this.afs.collection<any>("user-profiles");
    return userProfiles.doc(userId).valueChanges();
  }

  /**
   *
   * @param email
   * @param password
   * @param _data
   */
  createUserProfile(email, _data) {
    let userProfiles = this.afs.collection<any>("user-profiles");
    try {
      if (_data.password)
        delete _data.password;
      return userProfiles.doc(_data.id).set({
        ..._data
      });
    } catch (e1) {
      debugger
      return Promise.reject(e1);
    }
  }

  editUserProfile(profile) {
    let userProfiles = this.afs.collection<any>("user-profiles");
    try {
      return userProfiles.doc(profile.id).set({
        ...profile
      }, {
          merge: true
        });
    } catch (e1) {
      return Promise.reject(e1);
    }
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  //
  // GENERIC OBJECT MANIPULATION
  //
  addObjectToCollection = (collectionName, collectionData) => {
    let newObject = { ...collectionData, id: this.afs.createId() }
    let collection = this.afs.collection<any>(collectionName);

    try {
      return collection.doc(newObject.id).set({
        ...newObject
      }).then(() => {
        return newObject
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  updateObjectInCollection = (collectionName, objectId, changedCollectionData) => {
    let collection = this.afs.collection<any>(collectionName);
    try {
      return collection.doc(objectId).set({
        ...changedCollectionData
      }, { merge: true });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  updateManyObjectsInCollection = (collectionName: string, changedObjectData: any[]) => {
    let collection = this.afs.collection<any>(collectionName);
    try {
      let promises = [];
      changedObjectData.forEach(dataObj =>
        promises.push(
          collection.doc(dataObj.id).set({
            ...dataObj
          }, { merge: true })
        )
      )
      // debugger
      return Promise.all(promises)
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * 
   */
  getObjectFromCollection = (collectionName, objectId) => {
    let collection = this.afs.collection<any>(collectionName);
    try {
      return collection.doc(objectId).valueChanges();
    } catch (error) {
      return of(Promise.reject(error));
    }
  }

  /**
   * 
   */
  getAllObjectsFromCollection = (collectionName, ref?) => {
    if (ref) {
      let collection = this.afs.collection<any>(collectionName, ref);
      return collection.valueChanges();
    }
    let collection = this.afs.collection<any>(collectionName);
    return collection.valueChanges();
  }

  removeObjectFromCollection = (collectionName, objectId) => {
    let collection = this.afs.collection<any>(collectionName);
    return collection.doc(objectId).delete();
  }
}