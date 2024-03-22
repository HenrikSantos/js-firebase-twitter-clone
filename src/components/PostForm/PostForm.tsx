"use client";

import React, { useEffect, useRef, useState } from "react";
import profileImage from "../../../public/profile-default.svg";
import Image from "next/image";
import addPost from "@/api/addPost";
import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

export default function PostForm() {
    const [textArea, setTextArea] = useState("");
    const [user, setUser] = useState<User | null>();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "5px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [textArea]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextArea(event.target.value);
    }

    async function handlePost() {
        if (textArea.length >= 281 || textArea.length === 0) return;
        addPost(textArea);
        setTextArea("");
    }
 
    return (
        <form className="my-5 flex w-full gap-3 rounded-md border border-white/40 p-3">
            <Image className="w-10 self-start" src={user?.photoURL || profileImage} alt="profile image of this post" width={40} height={40}/>
            <section className="flex w-full flex-col gap-3">
                <textarea 
                    id="postText"
                    className="h-5 w-full resize-none overflow-auto border-none text-white outline-none" 
                    name="postText"
                    maxLength={280}
                    placeholder="O que está acontecendo?"
                    value={textArea}
                    ref={textAreaRef}
                    onChange={handleChange}
                />

                <hr className="border-white/60" />

                <section className="flex items-center justify-end gap-3">
                    <p className={`font-light ${textArea.length === 280 ? "text-red-600" : "" }`}>{textArea.length}/280</p>
                    <button 
                        className="rounded-full bg-blue-500/95 px-3 py-1 font-semibold text-white hover:bg-blue-600/95"
                        type="button" 
                        onClick={handlePost}
                    >
                        Postar
                    </button>
                </section>
            </section>
        </form>
    );
}