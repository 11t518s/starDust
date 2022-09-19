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

      console.log(this.auth.currentUser);
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
      const test = await (window as any).confirmationResult.confirm(
        confirmCode
      );
      return { result: true };
    } catch (error) {
      console.error(error);
      return { result: false };
    }
  }

  async getCurrentUser() {
    return this.auth.currentUser;
  }

  async getLoginStatus() {
    const state = await onAuthStateChanged(this.auth, (user) => {
      if (user) {
        return user;
      } else {
        return false;
      }
    });
    console.log(state);
  }
}

export const authApi = new Auth();
