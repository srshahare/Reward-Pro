import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import sendPushNotification from "../utils/sendNotification";

const GiftController = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  const fetchCards = async () => {
    try {
      const methodsRef = query(collection(db, "giftCards"));
      const documentSnapshots = await getDocs(methodsRef);
      const items = [];
      documentSnapshots.forEach((document) => {
        items.push(document.data());
      });
      setCards(items);
    } catch (err) {
      console.log(err);
    }
  };

  const submitCard = async (
    type,
    card,
    frontImg,
    backImg,
    value,
    currency,
    coupon,
    pin,
    isCvv,
    cvv,
    expiry,
    paymentData,
    profile,
    Sheet,
    Toast
  ) => {
    setLoading(true);
    try {
      const cardRef = doc(collection(db, "rewards"));
      let frontUrl = "";
      let backUrl = "";
      if (type === "Physical") {
        frontUrl = await uploadImage(frontImg.uri, frontImg.uri);
        backUrl = await uploadImage(backImg.uri, backImg.uri);
      }

      await setDoc(cardRef, {
        id: cardRef.id,
        card,
        value,
        currency,
        frontUrl,
        backUrl,
        coupon,
        pin,
        isCvv,
        cvv,
        expiry,
        paymentData,
        profile,
        type: "Gift",
        status: "Processing",
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      Sheet.current.close();
      Toast.show({
        type: "success",
        text1: `Request Submitted`,
        text2: `Request to convert gift card  is submitted and will be rewarded within few days`,
        position: "top",
        topOffset: 32,
      });

      const message = {
        to: profile.expo_token,
        sound: "default",
        title: `Request submitted`,
        body: `Request to convert gift card  is submitted and will be rewarded within few days`,
        data: {
          screen: "Main",
          data: {},
        },
      };

      sendPushNotification(message);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: `Error`,
        text2: err.message,
        position: "top",
        topOffset: 32,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const uploadImage = async (fileString, name) => {
    const storage = getStorage();
    return new Promise(async (resolve, reject) => {
      try {
        const spaceRef = ref(storage, `cards/${name}.png`);

        const response = await fetch(fileString);
        const blob = await response.blob();

        const snapshot = await uploadBytes(spaceRef, blob);

        const downloadUrl = await getDownloadURL(snapshot.ref);

        resolve(downloadUrl);
      } catch (err) {
        reject(err);
      }
    });
  };

  return { fetchCards, cards, loading, submitCard };
};

export default GiftController;
