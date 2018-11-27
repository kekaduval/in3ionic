export interface Visitor {
    id: string
    name: string;
    email: string;
    phone: string;
    company: string;
    location: string;
    createdAt: any;
    lastSignIn: any;
    signedIn: boolean;
    visits: {
        when: any;
        reason?: string;
        length?: any;
    }[]
    reason?: any;
}
