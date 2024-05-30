import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
} from "aws-amplify/auth";
import { getErrorMessage } from "@/utils/get-error-message";

export async function handleSignUp(formData: FormData) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        // optional
        autoSignIn: true,
      },
    });
    return { nextStep, email: formData.get("email") };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function handleSendEmailVerificationCode(formData: FormData) {
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleConfirmSignUp(formData: FormData) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    return { nextStep };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function handleSignIn(formData: FormData) {
  let redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectLink = `/auth/verify?email=${formData.get("email")}`;
    } else if (nextStep.signInStep === "DONE") {
      redirectLink = "/dashboard";
    }
    return { redirectLink };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
}
