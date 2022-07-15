import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  sendEmailVerification,
  signOut,
  RecaptchaVerifier,
  signInWithCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import sendPushNotification from "../utils/sendNotification";

const Auth = () => {
  const [authState, setAuthState] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // setEmailVerified(user.emailVerified);
        setEmailVerified(true);
        setCurrentUser(uid);
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    });
    return unsubscribe;
  }, [auth]);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // token = (await Notifications.getDevicePushTokenAsync()).data;
      // console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const registerUser = async (email, password, name, mobile ) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        const token = await registerForPushNotificationsAsync();

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = userCredential.user.uid;
        setCurrentUser(userId);

        await setDoc(doc(db, "customers", userId), {
          id: userId,
          search: "",
          username: name,
          email: email,
          phone_number: mobile,
          isRead: 0,
          credits: 0,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
          expo_token: token,
        });

        const message = {
          to: token,
          sound: "default",
          title: `Welcome ${name}`,
          body: "Explore the home screen to check all the services",
          data: {
            screen: "Main",
            data: {},
          },
        };

        sendPushNotification(message);

        resolve(userId);
      } catch (err) {
        reject(err);
        setLoading(false);
      }
      setLoading(false);
    });
  };

  const sendVerificationLink = async (Toast) => {
    try {
      await sendEmailVerification(auth.currentUser);
      Toast.show({
        type: "success",
        text1: "Verification Link Sent",
        text2:
          "We have successfully sent verification link to your email address",
        position: "top",
        topOffset: 32,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = await userCredentials.user.uid;
        setCurrentUser(userId);
        resolve(userId);
      } catch (err) {
        reject(err.message);
        setLoading(false);
      }
      setLoading(false);
    });
  };

  const logoutUser = async (navigation) => {
    setLoading(true);
    try {
      await signOut(auth);
      navigation.replace("Loading");
    } catch (err) {
      console.log({
        code: err.code,
        message: err.message,
      });
    }
    setLoading(false);
  };

  const sendResetLink = async (email, Toast) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        text1: `Reset Link Sent`,
        text2: `Password reset link is sent to your registered email address`,
        position: "top",
        topOffset: 32,
      });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  //mobile number login
  const loginUserMobile = (credential, data, navigation) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        const userCredentials = await signInWithCredential(auth, credential);
        const userId = await userCredentials.user.uid;
        setCurrentUser(userId);
        const uQuery = query(
          collection(db, "customers"),
          where("phone_number", "==", data.phoneNumber)
        );
        const snaps = await getDocs(uQuery);
        if (snaps.size > 0) {
          //user is already registered
          resolve(userId);
        } else {
          await registerUser(userId, data.phoneNumber);
        }
        navigation.replace("Main");
      } catch (err) {
        reject(err.message);
        setLoading(false);
      }
      setLoading(false);
    });
  };

  return {
    authState,
    currentUser,
    loginUser,
    loginUserMobile,
    loading,
    logoutUser,
    registerUser,
    sendResetLink,
    emailVerified,
    sendVerificationLink,
  };
};

export default Auth;
