import { Post as IPost } from "./Main";
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost
}

interface Like {
    userId: string
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const [likes, setLikes] = useState<Like[] | null>(null);

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId})));
    }

    const addLike = async () => {
        try{
        await addDoc(likesRef, { userId: user?.uid, postId: post.id });
        if (user) {
            setLikes((prev) => 
                prev ? [...prev, {userId: user?.uid}] : [{userId: user?.uid}]
                );
        }
        } catch (err) {
            console.log(err)
        }
    };

    const removeLike = async () => {

        try{
            if (user) {
                const likeToDeleteQuery = query(
                    likesRef, 
                    where("postId", "==", post.id),
                    where("userId", "==", user?.uid)
                );

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeToDeleteId = likeToDeleteData.docs[0].id;

            await deleteDoc(doc(db, "likes", likeToDeleteId));

            // await addDoc(likesRef, { userId: user?.uid, postId: post.id });

            setLikes((prev) => {
                if (prev) {
                return prev.filter((like) => like.userId !== user.uid);
            } else {
                return [];
            }
            });
            }
        } catch (err) {
            console.log(err);
        }
        };
        
        
        //     if (user) {
        //         setLikes((prev) => 
        //             prev ? [...prev, {userId: user?.uid}] : [{userId: user?.uid}]
        //         );
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
    // };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, []);


    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike }> { hasUserLiked ? <>&#128078;</> : <>&#128077;</> } </button>
                {likes && <p>Likes: {likes?.length}</p>}
            </div>
        </div>
    )
}