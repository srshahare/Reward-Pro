import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  limit
} from "firebase/firestore";
import { useState } from "react";

const RewardController = () => {
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const db = getFirestore();

  const submitReward = async (
    payMethod,
    credits,
    profile,
    mobile,
    address,
    sheetRef,
    Toast
  ) => {
    setLoading(true);
    try {
      const profileRef = doc(db, "customers", profile.id);
      const profileDoc = await getDoc(profileRef);
      const currentProfile = profileDoc.data();

      const profileCredits = parseInt(currentProfile.credits);
      const rewardCredits = parseInt(credits);

      if (profileCredits >= rewardCredits) {
        const rewardRef = doc(collection(db, "rewards"));
        await setDoc(rewardRef, {
          id: rewardRef.id,
          payMethod,
          credits,
          profile,
          mobile,
          address,
          status: "Processing",
          type: "Reward",
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
        const newCredits = profileCredits - rewardCredits;
        await updateDoc(profileRef, {
          credits: newCredits,
        });
        Toast.show({
          type: "success",
          text1: `Request Submitted`,
          text2: `Request to convert ${rewardCredits} Credits  is submitted and will be rewarded within 15 days`,
          position: "top",
          topOffset: 32,
        });
      } else {
        Toast.show({
          type: "error",
          text1: `Not Enough Credits`,
          text2:
            "Please purchase credits from the store to convert to get reward amount",
          position: "top",
          topOffset: 32,
        });
      }

      sheetRef.current.close();
    } catch (err) {
      console.log(err);
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

  const fetchHistory = async (currentUser, isLimit) => {
    setLoading(true)
    try {
      let historyRef;
      if (isLimit) {
        historyRef = query(
          collection(db, "rewards"),
          orderBy("created_at", "desc"),
          where("profile.id", "==", currentUser),
          limit(5),
        );
      } else {
        historyRef = query(
          collection(db, "rewards"),
          orderBy("created_at", "desc"),
          where("profile.id", "==", currentUser)
        );
      }
      const documentSnapshots = await getDocs(historyRef);
      const items = [];
      documentSnapshots.forEach((document) => {
        items.push(document.data());
      });
      setHistoryList(items);
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
    setLoading(false)
  };

  return { loading, submitReward, historyList, fetchHistory };
};

export default RewardController;
