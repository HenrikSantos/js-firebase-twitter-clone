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
                    userImage: doc.data().user?.photoURL,
                    userName: doc.data().user?.displayName,
                    date: doc.data().createdAt
                });
            });

            itemsArr.sort((a, b) => a.date && b.date ? b.date.seconds - a.date.seconds : 0);

            setPosts(itemsArr);
        });

        return unsubscribe;
    }, []);

    return (
        <section>
            {posts?.map(el => 
                <PostCard key={el.id} id={el.id} postText={el.postText} userImage={el.userImage} userName={el.userName}/>
            )}
        </section>
    );
}
