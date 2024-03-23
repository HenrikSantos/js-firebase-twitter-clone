import { create } from "zustand";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { IPostCard } from "@/interface/IPostCard";
import db from "@/firebase";
import { auth } from "@/firebase";

interface IStore {
    posts: IPostCard[],
    fetchPosts: () => void,
    user: User | null,
    fetchUsers: () => void,
}

export const store = create<IStore>((set) => ({
    posts: [],
    user: null,
    fetchUsers: () => {
        onAuthStateChanged(auth, (currentUser) => {
            set({ user: currentUser });
        });
    },
    fetchPosts: () => {
        onSnapshot(query(collection(db, "posts"), orderBy("createdAt", "desc")), (querySnapshot) => {
            const itemsArr: IPostCard[] = [];

            querySnapshot.forEach((doc) => {
                const { postText, user: { photoURL, displayName }, createdAt, comments, hearts } = doc.data();

                itemsArr.push({ id: doc.id, postText, photoURL, displayName, createdAt, comments, hearts });
            });

            set({ posts: itemsArr });
        });
    }
}));
