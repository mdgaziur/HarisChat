import firebase from "firebase";

type propsType = {
    auth: firebase.auth.Auth
}

export function SignOut(props: propsType) {
    const signout = () => {
        props.auth.signOut();
    }
    return <button onClick={signout}>Sign out</button>
}