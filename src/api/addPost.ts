import db from "@/firebase";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp  } from "firebase/firestore";

export default async function addPost(textArea: string, user: User) {
    try {
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
                hearts: 0,
                comments: []
            });
        }
    } catch (error) {
        window.alert(error);
    }
}
