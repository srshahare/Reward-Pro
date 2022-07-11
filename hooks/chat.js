import {
    collection,
    doc,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
  } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
  import { useState } from "react";
  
  const ChatController = () => {
    const db = getFirestore();
  
    const [chats, setChats] = useState([]);
  
    const sendMessage = async (msg, userId, senderId, type, image) => {
      try {
        const chatRef = doc(collection(db, "customers", senderId, "chats"));
        let url = "";
        if(image) {
            url = await uploadImage(image.uri, image.uri);
        }
        const chatDoc = await setDoc(chatRef, {
          id: chatRef.id,
          msg,
          userId,
          senderId,
          type,
          url,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    const uploadImage = async (fileString, name) => {
        const storage = getStorage();
        return new Promise(async (resolve, reject) => {
          try {
            const spaceRef = ref(storage, `chats/${name}.png`);
    
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

    const fetchMessages = async (currentId) => {
      return new Promise(async (resolve, reject) => {
          try {
            // Query the first page of docs
            const first = query(
              collection(db, "customers", currentId, "chats"),
              orderBy("created_at", "desc")
            );
            const unsub = onSnapshot(first, async (querySnapshot) => {
              const _msgs = [];
              if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                  _msgs.push(doc.data());
                });
                setChats(_msgs);
                resolve({
                  chats: _msgs,
                  unsub: unsub,
                });
              } else {
                  setChats([]);
                reject({
                  chats: [],
                });
              }
            });
          } catch (err) {
            reject(err);
          }
        })
    };
  
    return { sendMessage, chats, fetchMessages };
  };
  
  export default ChatController;
  