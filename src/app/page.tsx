import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import Login from "@/components/Login/Login";
import React from "react";

export default function Home() {
    return (
        <main className="mx-auto md:w-6/12 lg:w-4/12">
            <Login />
            <PostForm />
            <Feed />
        </main>
    );
}
