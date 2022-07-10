import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ProfileController = () => {
  const db = getFirestore();

  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [validLoc, setValidLoc] = useState(false);
  const [validating, setValidating] = useState(true);
  const [reviewed, setReviewed] = useState(true);
  const [feedback, setFeedback] = useState({
    review: "",
    rating: 4,
  });
  const [nextQuery, setNextQuery] = useState(null);
  const [querying, setQuerying] = useState(false);
  const [mySubscription, setMySubscription] = useState(null);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [subsExpired, setSubsExpired] = useState(false);

  const fetchMyOrdersList = async (currentId, page) => {
    setLoading(true);
    setQuerying(true);
    try {
      let documentSnapshots, first, next, lastVisible;
      if (page === 1) {
        first = query(
          collection(db, "orders"),
          orderBy("created_at", "desc"),
          where("customerId", "==", currentId),
          limit(10)
        );
        documentSnapshots = await getDocs(first);

        //get the last visible document
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        next = query(
          collection(db, "orders"),
          orderBy("created_at", "desc"),
          where("customerId", "==", currentId),
          startAfter(lastVisible),
          limit(10)
        );

        setNextQuery(next);
      } else if (page > 1) {
        documentSnapshots = await getDocs(nextQuery);

        //get the last visible document
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        if (lastVisible) {
          next = query(
            collection(db, "orders"),
            orderBy("created_at", "desc"),
            where("customerId", "==", currentId),
            startAfter(lastVisible),
            limit(10)
          );
          setNextQuery(next);
        }
      }
      const docs = [];
      documentSnapshots.forEach((doc) => {
        docs.push(doc.data());
      });
      setMyOrders([...myOrders, ...docs]);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
    setQuerying(false);
  };


  const fetchMySubscriptions = async (currentId) => {
    setLoading(true);
    try {
      // Query the first page of docs
      const first = query(
        collection(db, "customers", currentId, "subscriptions")
      );
      const documentSnapshots = await getDocs(first);
      if (documentSnapshots.size > 0) {
        let list = [];
        documentSnapshots.forEach((snap) => {
          list.push(snap.data().service_id);
        });
        const serviceQuery = query(
          collection(db, "services"),
          where("id", "in", list)
        );
        const serviceSnaps = await getDocs(serviceQuery)
        let services = []
        serviceSnaps.forEach(service => {
          services.push(service.data())
        })
        setMySubscriptions(services);
      } else {
        setMySubscription(null);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const getProfileById = async (currentId) => {
    setLoading(true);
    try {
      // Query the first page of docs
      const profileRef = doc(db, "customers", currentId);
      const unsub = onSnapshot(profileRef, (item) => {
        if (item.exists) {
          setProfile(item.data());
        }
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const updateProfile = async (currentId, image, navigation) => {
    setLoading(true);
    try {
      let profile_url = profile.profile_url;
      if (image) {
        profile_url = await uploadImage(image.uri, currentId);
      }
      const profileRef = doc(db, "customers", currentId);
      if(profile?.full_name !== '' && profile?.address !== '' && profile?.pin_code !== '' && profile?.phone_number !== '') {
        profile.profile_complete = true;
      }
      await updateDoc(profileRef, { ...profile, profile_url });
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const uploadImage = async (fileString, name) => {
    const storage = getStorage();
    return new Promise(async (resolve, reject) => {
      try {
        const spaceRef = ref(storage, `customers/${name}.png`);

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

  const validateLocation = async (currentId) => {
    setValidating(true);
    try {
      const settingRef = doc(db, "settings", "Setting");
      const sSnap = await getDoc(settingRef);
      const setting = sSnap.data();

      //get partner info
      const customerRef = doc(db, "customers", currentId);
      const cSnap = await getDoc(customerRef);
      const customer = cSnap.data();

      const arr = setting.pin_codes.filter(
        (item) => item === customer.pin_code
      );
      if (arr.length > 0) {
        setValidLoc(true);
      } else {
        setValidLoc(false);
      }
    } catch (err) {
      console.log(err.message);
    }
    setValidating(false);
  };

  const submitReview = async (review, rating, order) => {
    setLoading(true);
    try {
      //get customer details
      const customerRef = doc(db, "customers", order.customerId);
      const customerSnap = await getDoc(customerRef);
      const customer = customerSnap.data();

      const orderId = order.id;
      const orderRef = doc(db, "orders", orderId);

      order.items.map(async (item) => {
        //storing feedback to each service
        const serviceId = item.id;
        const ratingRef = doc(db, "services", serviceId, "feedbacks", orderId);
        await setDoc(ratingRef, {
          id: orderId,
          review,
          rating,
          name: customer.full_name,
          imageUrl: customer.profile_url,
          order_id: orderId,
          store_id: item.store,
          service_id: serviceId,
          partner_id: order.partner.id,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });

        //get current service info
        const serviceRef = doc(db, "services", serviceId);
        const serviceSnap = await getDoc(serviceRef);
        const service = serviceSnap.data();

        //update ratings and reviews in service
        const service_total_reviews = parseFloat(service.total_reviews) + 1;
        const service_total_rating = parseFloat(service.total_rating) + rating;
        await updateDoc(serviceRef, {
          total_reviews: parseFloat(service_total_reviews),
          total_rating: parseFloat(service_total_rating),
        });

        //storing feedback to store
        const storeRateRef = doc(
          db,
          "stores",
          item.store,
          "feedbacks",
          orderId
        );
        await setDoc(storeRateRef, {
          id: orderId,
          review,
          rating,
          name: customer.full_name,
          imageUrl: customer.profile_url,
          order_id: orderId,
          store_id: item.store,
          service: serviceId,
          partner_id: order.partner.id,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });

        //get current store info
        const storeRef = doc(db, "stores", item.store);
        const storeSnap = await getDoc(storeRef);
        const store = storeSnap.data();

        //update ratings and reviews in store
        const total_reviews = parseFloat(store.total_reviews) + 1;
        const total_rating = parseFloat(store.total_rating) + rating;
        await updateDoc(storeRef, {
          total_reviews: parseFloat(total_reviews),
          total_rating: parseFloat(total_rating),
        });
      });

      await updateDoc(orderRef, {
        status: "reviewed",
        feedback: {
          review: review,
          rating: rating,
        },
      });
      setReviewed(true);
      setFeedback({
        review: review,
        rating: rating,
      });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const getReviewState = async (orderId) => {
    setValidating(true);
    try {
      const orderRef = doc(db, "orders", orderId);
      const snap = await getDoc(orderRef);
      const order = snap.data();

      if (order.status === "reviewed") {
        setReviewed(true);
        setFeedback(order.feedback);
      } else {
        setReviewed(false);
      }
    } catch (err) {
      console.log(err.message);
    }
    setValidating(false);
  };

  return {
    fetchMyOrdersList,
    myOrders,
    loading,
    profile,
    getProfileById,
    updateProfile,
    setProfile,
    validateLocation,
    validLoc,
    validating,
    submitReview,
    reviewed,
    getReviewState,
    feedback,
    setFeedback,
    querying,
    mySubscription,
    subsExpired,
    fetchMySubscriptions,
    mySubscriptions,
  };
};

export default ProfileController;
