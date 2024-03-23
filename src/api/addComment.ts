import { IPostCard } from "@/interface/IPostCard";
import db from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export default async function addComment(id: string, commentText: string, user: User) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && user) {
        const postData = docSnap.data() as IPostCard;
        const data = [...postData.comments];

        data.push({
            commentText: commentText,
            createdAt: Date.now(),
            photoURL: user.photoURL!,
            displayName: user.displayName!
        });
        
        try {
            await updateDoc(docRef, { comments: data });
        } catch (error) {
            window.alert(error);
        }
    }
}
