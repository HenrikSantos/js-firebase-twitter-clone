import { IPostCard } from "@/components/PostCard/PostCard";
import db, { auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default async function addComment(id: string, commentText: string) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    const user = auth.currentUser;

    if (docSnap.exists() && user) {
        const postData = docSnap.data() as IPostCard;
        const data = [...postData.comments];

        data.push({
            commentText: commentText,
            date: Date.now(),
            userImage: user.photoURL!,
            userName: user.displayName!
        });
        
        try {
            await updateDoc(docRef, { comments: data });
        } catch (error) {
            window.alert(error);
        }
    }
}
