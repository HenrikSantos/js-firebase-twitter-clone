import { IPostCard } from "@/interface/IPostCard";
import db from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export default async function addHeart(id: string, user: User) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && user) {
        const postData = docSnap.data() as IPostCard;
        
        try {
            await updateDoc(docRef, { hearts: 1 + postData.hearts });
        } catch (error) {
            window.alert(error);
        }
    }
}
