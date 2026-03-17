import * as actions from "./actionTypes";
import _ from "lodash";
import { functions } from "../../config";

interface UserCredentials {
  email: string;
  password?: string;
  provider?: string;
  type?: string;
}

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  handle?: string;
  country?: string;
  organizations?: string[];
  updatedAt?: any; // firebase.firestore.FieldValue
}

interface AuthAction {
  type: string;
  payload?: any;
}

type AppDispatch = (action: AuthAction | any) => void;

interface SetupData {
  orgData: boolean;
  name: string;
  handle: string;
  country: string;
  org_handle: string;
  org_name: string;
  org_website: string;
  org_country: string;
}

export const signIn =
  (credentials: UserCredentials) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.SIGN_IN_START });
      dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
      const userData = await firebase.login(credentials);
      const isVerified =
        _.get(userData, "user.user.emailVerified") ||
        _.get(userData, "user.emailVerified") ||
        _.get(userData, "emailVerified");

      if (isVerified || import.meta.env.VITE_APP_USE_EMULATOR === "true") {
        dispatch({ type: actions.SIGN_IN_SUCCESS });
      } else {
        await firebase.logout();
        dispatch({
          type: actions.SET_VERIFY_EMAIL_FAIL,
          payload: credentials.email
        });
        dispatch({
          type: actions.SIGN_IN_FAIL,
          payload: "email-unverified"
        });
      }
    } catch (e: any) {
      dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
    }
  };

export const signInWithGoogle =
  () =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.SIGN_IN_START });
      await firebase.login({
        provider: "google",
        type: "popup"
      });
      dispatch({ type: actions.SIGN_IN_SUCCESS });
    } catch (e: any) {
      dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
    }
  };

export const signInWithProviderID =
  (providerID: string) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      if (!["github", "twitter", "facebook"].includes(providerID)) {
        return;
      }
      dispatch({ type: actions.SIGN_IN_START });
      await firebase.login({
        provider: providerID,
        type: "popup"
      });
      dispatch({ type: actions.SIGN_IN_SUCCESS });
    } catch (e: any) {
      if (e.code === "auth/account-exists-with-different-credential") {
        const methods = await firebase
          .auth()
          .fetchSignInMethodsForEmail(e.email);
        dispatch({
          type: actions.SIGN_IN_FAIL,
          payload: `You already have an account created using ${methods.join(
            ", "
          )}. Log in with ${methods.join(", ")} to continue.`
        });
      } else {
        dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
      }
    }
  };

export const signOut =
  () =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
      dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
      dispatch({ type: actions.CLEAR_AUTH_RECOVER_PASSWORD_STATE });
      dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
      dispatch({ type: actions.CLEAR_PROFILE_DATA_STATE });
      dispatch({ type: actions.CLEAR_ORG_GENERAL_STATE });
      dispatch({ type: actions.CLEAR_ORG_USER_STATE });
      await firebase.logout();
      window.location.href = "/login";
    } catch (e: any) {
      console.log(e.message);
    }
  };

export const signUp =
  (userData: UserCredentials) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.SIGN_UP_START });
      const { email, password } = userData;

      await firebase.createUser({ email, password }, { email });
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        throw new Error("User not found after signup");
      }

      try {
        await currentUser.sendEmailVerification();
        console.log("Email verification sent successfully.");
      } catch (verificationError: any) {
        console.error("Error sending email verification:", verificationError);
        dispatch({ type: actions.SIGN_UP_FAIL, payload: verificationError });
        throw verificationError;
      }

      await firebase.logout();

      dispatch({ type: actions.SIGN_UP_SUCCESS });
    } catch (e: any) {
      dispatch({ type: actions.SIGN_UP_FAIL, payload: e });
    }
  };

export const clearAuthError =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
    dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
  };

export const clearRecoverPasswordError =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: actions.CLEAR_AUTH_RECOVER_PASSWORD_STATE });
  };

export const sendPasswordResetEmail =
  (email: string) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.SEND_RESET_EMAIL_START });
      await firebase.resetPassword(email);
      dispatch({ type: actions.SEND_RESET_EMAIL_SUCCESS });
    } catch (e: any) {
      dispatch({ type: actions.SEND_RESET_EMAIL_FAIL, payload: e });
    }
  };

export const verifyPasswordResetCode =
  (actionCode: string) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.VERIFY_RESET_CODE_START });
      const email = await firebase.verifyPasswordResetCode(actionCode);
      dispatch({ type: actions.VERIFY_RESET_CODE_SUCCESS, payload: email });
    } catch (e: any) {
      dispatch({ type: actions.VERIFY_RESET_CODE_FAIL, payload: e.message });
    }
  };

export const confirmPasswordReset =
  ({ actionCode, password }: any) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.PASSWORD_RECOVERY_START });
      await firebase.confirmPasswordReset(actionCode, password);
      dispatch({ type: actions.PASSWORD_RECOVERY_SUCCESS });
    } catch (e: any) {
      dispatch({ type: actions.PASSWORD_RECOVERY_FAIL, payload: e.message });
    }
  };

export const verifyEmail =
  (actionCode: string) =>
  async (firebase: any, dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.EMAIL_VERIFY_START });
      await firebase.auth().applyActionCode(actionCode);
      dispatch({ type: actions.EMAIL_VERIFY_SUCCESS });
    } catch (e: any) {
      dispatch({ type: actions.EMAIL_VERIFY_FAIL, payload: e.message });
    }
  };

export const resendVerifyEmail =
  (email: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch({ type: actions.RESEND_VERIFY_EMAIL_START });
      dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
      const resendVerificationEmail = functions.httpsCallable(
        "resendVerificationEmail"
      );
      await resendVerificationEmail({
        email
      });
      dispatch({ type: actions.RESEND_VERIFY_EMAIL_SUCCESS });
    } catch (e: any) {
      dispatch({ type: actions.RESEND_VERIFY_EMAIL_FAIL, payload: e.message });
    }
  };

export const checkUserHandleExists =
  (userHandle: string) =>
  async (firebase: any): Promise<boolean> => {
    try {
      const handle = await firebase
        .ref(`/cl_user_handle/${userHandle}`)
        .once("value");
      return handle.exists();
    } catch (e: any) {
      throw e.message;
    }
  };

export const checkOrgHandleExists =
  (orgHandle: string) =>
  async (firestore: any): Promise<boolean> => {
    try {
      const organizationHandle = await firestore
        .collection("cl_org_general")
        .doc(orgHandle)
        .get();

      console.log(organizationHandle);
      return organizationHandle.exists;
    } catch (e: any) {
      throw e.message;
    }
  };

export const setUpInitialData =
  (data: SetupData) =>
  async (
    firebase: any,
    firestore: any,
    dispatch: AppDispatch
  ): Promise<void> => {
    try {
      dispatch({ type: actions.INITIAL_SETUP_START });
      const userData = firebase.auth().currentUser;
      const {
        orgData,
        name: displayName,
        handle,
        country,
        org_handle,
        org_name,
        org_website,
        org_country
      } = data;

      const isUserHandleExists = await checkUserHandleExists(handle)(firebase);

      if (isUserHandleExists) {
        dispatch({
          type: actions.INITIAL_SETUP_FAIL,
          payload: { message: `Handle [${handle}] is already taken` }
        });
        return;
      }

      if (orgData) {
        const isOrgHandleExists = await checkOrgHandleExists(org_handle)(
          firestore
        );

        if (isOrgHandleExists) {
          dispatch({
            type: actions.INITIAL_SETUP_FAIL,
            payload: { message: `Handle [${org_handle}] is already taken` }
          });
          return;
        }

        await firestore.set(
          { collection: "cl_org_general", doc: org_handle },
          {
            org_name,
            org_handle,
            org_website,
            org_country,
            org_email: userData.email,
            org_created_date: firestore.FieldValue.serverTimestamp(),
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp()
          }
        );

        await firestore
          .collection("org_users")
          .doc(`${org_handle}_${userData.uid}`)
          .set({
            uid: userData.uid,
            org_handle: org_handle,
            permissions: [3]
          });

        const timeOutID = setTimeout(() => {
          firebase
            .updateProfile(
              {
                displayName,
                handle,
                country,
                organizations: [org_handle],
                updatedAt: firestore.FieldValue.serverTimestamp()
              },
              { useSet: false, merge: true }
            )
            .then(() => {
              window.location.reload();
              clearTimeout(timeOutID);
              dispatch({ type: actions.INITIAL_SETUP_SUCCESS });
            });
        }, 7000);
      } else {
        await firebase.updateProfile(
          {
            displayName,
            handle,
            country,
            organizations: [],
            updatedAt: firestore.FieldValue.serverTimestamp()
          },
          { useSet: false, merge: true }
        );
        dispatch({ type: actions.INITIAL_SETUP_SUCCESS });
      }
    } catch (e: any) {
      console.log(e);
      dispatch({ type: actions.INITIAL_SETUP_FAIL, payload: e });
    }
  };
