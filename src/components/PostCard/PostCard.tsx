import React from "react";
import Image from "next/image";
import profileImage from "../../../public/profile-default.svg";
import CommentForm from "../CommentForm/CommentForm";
import heartsImage from "@../../../public/heart.svg";
import addHeart from "@/api/addHeart";
import { IPostCard } from "@/interface/IPostCard";
import { useStore } from "zustand";
import { store } from "@/zustand/store";

export default function PostCard({ post: { id, postText, photoURL, displayName, comments, hearts } }: {post: IPostCard}) {
    const { user } = useStore(store);

    function handleHeart() {
        if (user) addHeart(id, user);
    }

    return (
        <section className="my-3 space-y-3 rounded-md border border-white/30 p-3" id={id}>
            <section className="flex flex-wrap gap-3 ">
                <section>
                    <Image className="w-10 self-start" src={photoURL || profileImage} alt="profile image of this post" width={40} height={40}/>
                    <section className="flex items-center gap-1">
                        {hearts}
                        <button type="button" onClick={handleHeart}>
                            <Image className="" src={heartsImage} alt="profile image of this post" width={15} height={15}/>
                        </button>
                    </section>
                </section>
                <section className="w-10/12">
                    <p className="font-bold hover:cursor-pointer hover:underline">{displayName}</p>
                    <p className="break-words">{postText}</p>
                </section>
            </section>
            {comments.length > 0 && 
                <hr className="border-white/30" />
            }
            {comments.map(comment =>
                <section className="flex gap-3 pl-3" key={comment.createdAt}>
                    <Image className="w-10 self-start" src={comment.photoURL || profileImage} alt="profile image of this post" width={40} height={40}/>
                    <section className="w-11/12">
                        <p className="font-bold hover:cursor-pointer hover:underline">{comment.displayName || "unknow"}</p>
                        <p className="break-words">{comment.commentText}</p>
                    </section>
                </section>
            )}
            <CommentForm id={id} />
        </section>
    );
}
