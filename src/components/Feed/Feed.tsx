"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import PostCard, { IPostCard } from "../PostCard/PostCard";
import db from "@/firebase";
import "./Feed.css";

export default function Feed() {
    const [posts, setPosts] = useState<IPostCard[]>([]);

    useEffect(() => {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsArr: IPostCard[] = [];

            querySnapshot.forEach((doc) => {
                itemsArr.push({ 
                    id: doc.id,
                    postText: doc.data().postText,
                    userImage: doc.data().user.photoURL,
                    userName: doc.data().user.displayName,
                    date: doc.data().createdAt,
                    comments: doc.data().comments,
                    hearts: doc.data().hearts
                });
            });

            itemsArr.sort((a, b) => b.date - a.date);

            setPosts(itemsArr);
        });

        return unsubscribe;
    }, []);

    return (
        <section className="mb-5">
            {posts?.map(el => <PostCard key={el.id} post={el} />)}
        </section>
    );
}
