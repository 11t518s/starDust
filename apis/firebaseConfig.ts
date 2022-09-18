import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "@firebase/firestore";
// api 공개하고 url에서

export class FirebaseConfig {
  private config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  };

  private config2 = {
    apiKey: "AIzaSyC0CT60BNN9nkbuFfMNo6NJRzKmDxmr9zk",
    authDomain: "stardust-416db.firebaseapp.com",
    projectId: "stardust-416db",
    storageBucket: "stardust-416db.appspot.com",
    messagingSenderId: "322961152045",
    appId: "1:322961152045:web:4eb8bc0090b13461ab40a4",
    measurementId: "G-5RRQQMLVRZ",
  };

  protected app: FirebaseApp = initializeApp(this.config2);
  protected db: Firestore = getFirestore(this.app);
  protected auth: Auth = getAuth(this.app);

  constructor() {
    if (!getApps().length) {
      this.app = initializeApp(this.config2);
      this.db = getFirestore(this.app!);
      this.auth = getAuth(this.app);
    }
  }
}
