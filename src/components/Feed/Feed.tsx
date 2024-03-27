"use client";

import React, { useEffect } from "react";
import PostCard from "../PostCard/PostCard";
import { useStore } from "zustand";
import { store } from "@/zustand/store";

export default function Feed() {
    const { posts, fetchPosts } = useStore(store);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <section data-testid="feed" className="mb-5">
            {posts?.map(el => <PostCard key={el.id} post={el} />)}
        </section>
    );
}
