import React, { useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { SignIn } from "./components/SignIn";
import { ChatRoom } from "./components/ChatRoom";

const firebaseConfig = {
  apiKey: "AIzaSyDZ9wCT4ELqLUhj2cP3NgQTihlWnDnJFFU",
  authDomain: "harischat-3558e.firebaseapp.com",
  projectId: "harischat-3558e",
  storageBucket: "harischat-3558e.appspot.com",
  messagingSenderId: "1085964558858",
  appId: "1:1085964558858:web:cda08f0045d55e7d4b75f3",
  measurementId: "G-49E494MYK6",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {}
const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  let [user, setUser] = useState<firebase.User | null>();
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <div className="App">
      <section>
        {user ? (
          <ChatRoom auth={auth} firestore={firestore} />
        ) : (
          <SignIn auth={auth} />
        )}
      </section>
    </div>
  );
}

export default App;
