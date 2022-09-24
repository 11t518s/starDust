import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { PhoneNumberLoginType } from "./types";
import { FirebaseConfig } from "../firebaseConfig";

export class Auth extends FirebaseConfig {
  async signIn(
    phoneNumber: number | string,
    nickname: string
  ): Promise<PhoneNumberLoginType> {
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

      this.auth.currentUser &&
        (await updateProfile(this.auth.currentUser, { displayName: nickname }));

      return { result: true };
    } catch (error) {
      console.error(error);
      return { result: false };
    }
  }

  private async updateUserProfile() {}

  async confirmSignIn(confirmCode: string): Promise<PhoneNumberLoginType> {
    try {
      await (window as any).confirmationResult.confirm(confirmCode);
      return { result: true };
    } catch (error) {
      console.error(error);
      return { result: false };
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}

export const authApi = new Auth();
