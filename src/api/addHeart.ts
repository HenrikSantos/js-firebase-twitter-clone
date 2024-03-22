import { IPostCard } from "@/components/PostCard/PostCard";
import db, { auth } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default async function addHeart(id: string) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    const user = auth.currentUser;

    if (docSnap.exists() && user) {
        const postData = docSnap.data() as IPostCard;
        
        try {
            await updateDoc(docRef, { hearts: 1 + postData.hearts });
        } catch (error) {
            window.alert(error);
        }
    }
}
