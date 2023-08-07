
import {auth, provider} from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import { getAuth, signOut } from "firebase/auth";

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate('/profile')
    };

    return (
        <div className="login">
            <p>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            {/* <button onClick={signOutOfGoogle}>Sign Out of Watch Party</button> */}
            </div>
    )
}

    // const signOutOfGoogle = async() => {
    //     const auth = getAuth();
    //     signOut(auth)
    //         .then(() => {
    //             <div>Sign out successful!</div>
    //         }).catch((error) => {
    //             <div>An error has occurred</div>
    //         });
    // }


// const auth = getAuth();
// setPersistence(auth, browserSessionPersistence)
//     .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return signInWithGoogle();
// })
//     .catch((error) => {
//     // Handle Errors here.
//     console.log("an error has occurred")
// });