import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)

    const signUserOut = async () => {
        await signOut(auth);
        navigate('/login')
    };

    return (
        <div className="navbar">
            <div>
                <Link to={"/"} className="links">Home</Link>
                {!user ? (
                    <Link to={"/login"} className="links">Login/Log out</Link>
                ) : (
                    <Link to={"/createpost"} className="links">Create Post</Link>
                )}
                {user ? (
                    <Link to={"/profile"} className="links">Profile</Link>
                ) : (
                    ""
                )}
                
            </div>
            <div className="user">
                {user && (
                <>
                <p className="user">{user?.displayName}</p>
                <button onClick={signUserOut} className="logout-button">Log Out</button>
                <img className="nav-avatar" src={ user?.photoURL || ""} alt="avatar"/>
                </>
                )}
            </div>
        </div>
    )
}