import { FirebaseConfig } from "./config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

class AuthAPI extends FirebaseConfig {
  private auth = getAuth();

  private recaptcha = new RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: () => {},
    },
    this.auth
  );

  private appVerifier = this.recaptcha;

  async logIn(phoneNumber: number) {
    const KrPhoneNumber = "+82" + phoneNumber;
    try {
      return await signInWithPhoneNumber(
        this.auth,
        KrPhoneNumber,
        this.appVerifier
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async logOut() {
    try {
      return await signOut(this.auth);
    } catch (error) {
      return false;
    }
  }
}

const authApi = new AuthAPI();
