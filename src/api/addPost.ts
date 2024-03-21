import db, { auth } from "@/firebase";
import { addDoc, collection, serverTimestamp  } from "firebase/firestore";

export default async function addPost(textArea: string) {
    try {
        const user = auth.currentUser;

        if (user) {
            await addDoc(collection(db, "posts"), {
                postText: textArea,
                createdAt: serverTimestamp(),
                user: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                },
                comments: []
            });
        }
    } catch (error) {
        window.alert(error);
    }
}
