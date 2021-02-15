import firebase from "firebase";

type propsType = {
    id: any
    msg: firebase.firestore.DocumentData
    uid: string
}

export function ChatMessage(props: propsType) {
    return <div className={`message ${props.uid === props.msg.uid ? 'sent' : 'received'}`}>
        <p className="message-text">{props.msg.text}</p>
        <div><img className="message-author-pic" src={props.msg.photoURL} alt="Sender's profile pic"/></div>
    </div>
}