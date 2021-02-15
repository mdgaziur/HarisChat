import firebase from  'firebase';

type propsType = {
    auth: firebase.auth.Auth
}

export function SignIn(props: propsType) {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider);
    }
    return (
        <button className="signin" onClick={signInWithGoogle}>Sign In With Google</button>
    )
}