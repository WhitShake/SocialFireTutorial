import { auth } from "../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'


export const Profile = () => {
    const [user] = useAuthState(auth)
    return (
        <div>
            <div>{user?.displayName}'s Profile</div>
            <img className="avatar" src={ auth.currentUser?.photoURL || "https://cdn10.bigcommerce.com/s-muq4v/products/19706/images/11410/B202__71705.1607187258.1280.1280.jpg?c=2"} alt="avatar"/>
        </div>
    )
}