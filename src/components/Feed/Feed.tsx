"use client";

import React, { useEffect, useState } from "react";
import "./Feed.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "@/firebase";
import PostCard from "../PostCard/PostCard";

interface IPosts {
    id: string,
    postText: string,
    userImage: string,
    userName: string
}

export default function Feed() {
    const [posts, setPosts] = useState<IPosts[]>();

    useEffect(() => {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsArr: IPosts[] = [];

            querySnapshot.forEach((doc) => {
                itemsArr.push({ 
                    id: doc.id,
                    postText: doc.data().postText,
                    userImage: doc.data().user?.photoURL,
                    userName: doc.data().user?.displayName
                });
            });

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
