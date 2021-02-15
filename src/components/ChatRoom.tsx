import firebase from "firebase";
import { SignOut } from "./SignOut";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef, useState } from "react";

type propsType = {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
};

export function ChatRoom(props: propsType) {
  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  let messagesViewerRef = useRef<HTMLDivElement>(null);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formInputData, setFormInputData] = useState<string>("");

  useEffect(() => {
    if(messagesViewerRef.current) {
      let el = messagesViewerRef.current;
      el.scrollTo({
        top: el.scrollHeight
      })
    }
  }, [messages]);

  const sendMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uid, photoURL } = props.auth.currentUser || {
      uid: "",
      photoURL: "",
    };

    await messagesRef.add({
      text: formInputData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormInputData("");
  };

  const [username, userProfilePic] = [
    props.auth.currentUser?.displayName
      ? props.auth.currentUser.displayName
      : "",
    props.auth.currentUser?.photoURL ? props.auth.currentUser.photoURL : "",
  ];

  return (
    <>
      {props.auth.currentUser && (
        <>
          <div className="chatroom-header">
            <div className="user-info">
              <img
                src={userProfilePic}
                alt={`${username}'s Profile Pic`}
              />
              <div>
                <h2>{props.auth.currentUser?.displayName}</h2>
                <h3>{props.auth.currentUser?.email}</h3>
              </div>
            </div>
            <SignOut auth={props.auth} />
          </div>
          <div className="chat-messages" ref={messagesViewerRef}>
            {messages &&
              messages.map((msg: any) => {
                return (
                  <ChatMessage
                    id={msg.id}
                    msg={msg}
                    uid={props.auth.currentUser?.uid ? props.auth.currentUser.uid : ""}
                  />
                );
              })}
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={formInputData}
              onChange={(e) => setFormInputData(e.target.value)}
            />
            <button>Send</button>
          </form>
        </>
      )}
    </>
  );
}
