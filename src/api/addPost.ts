import db from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export default async function addPost(textArea: string) {
    try {
        await addDoc(collection(db, "posts"), {
            postText: textArea
        });
    } catch (error) {
        window.alert(error);
    }
}
