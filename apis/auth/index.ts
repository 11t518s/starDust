import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { PhoneNumberLoginType } from "./types";

export const signIn = async (phoneNumber: number): Promise<any> => {
  const recaptcha = new RecaptchaVerifier(
    "signIn",
    {
      size: "invisible",
    },
    auth
  );
  const KrPhoneNumber = "+82" + phoneNumber;

  try {
    (window as any).confirmationResult = await signInWithPhoneNumber(
      auth,
      KrPhoneNumber,
      recaptcha
    );

    return { result: true };
  } catch (error) {
    console.error(error);
    return { result: false };
  }
};

export const confirmSignIn = async (confirmCode: string) => {
  console.log(confirmCode);
  try {
    const test = await (window as any).confirmationResult.confirm(confirmCode);
    return { result: true };
  } catch (error) {
    console.error(error);
    return { result: false };
  }
};
