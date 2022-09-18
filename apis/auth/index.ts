import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { PhoneNumberLoginType } from "./types";
import { FirebaseConfig } from "../firebaseConfig";

export class Auth extends FirebaseConfig {
  async signIn(phoneNumber: number | string): Promise<PhoneNumberLoginType> {
    const recaptcha = new RecaptchaVerifier(
      "signIn",
      {
        size: "invisible",
      },
      this.auth
    );
    const KrPhoneNumber = "+82" + phoneNumber;

    try {
      (window as any).confirmationResult = await signInWithPhoneNumber(
        this.auth,
        KrPhoneNumber,
        recaptcha
      );

      return { result: true };
    } catch (error) {
      console.error(error);
      return { result: false };
    }
  }

  async confirmSignIn(confirmCode: string): Promise<PhoneNumberLoginType> {
    try {
      const test = await (window as any).confirmationResult.confirm(
        confirmCode
      );
      return { result: true };
    } catch (error) {
      console.error(error);
      return { result: false };
    }
  }
}

export const authApi = new Auth();
