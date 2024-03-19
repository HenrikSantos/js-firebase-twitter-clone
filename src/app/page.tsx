import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import React from "react";

export default function Home() {
    return (
        <main className="mx-auto md:w-6/12 lg:w-4/12 ">
            <PostForm />
            <Feed />
        </main>
    );
}
