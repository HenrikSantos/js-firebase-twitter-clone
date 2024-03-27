import React from "react";
import Image from "next/image";
import CommentForm from "../CommentForm/CommentForm";
import heartImage from "../../../public/heart.svg";
import addHeart from "@/api/addHeart";
import { IPostCard } from "@/interface/IPostCard";
import { useStore } from "zustand";
import { store } from "@/zustand/store";

export default function PostCard({ post: { id, postText, photoURL, displayName, comments, hearts } }: { post: IPostCard }) {
    const { user } = useStore(store);

    function handleHeart() {
        if (user) addHeart(id, user);
    }

    return (
        <section className="my-3 space-y-3 rounded-md border border-white/30 p-3" data-testid={id} id={id}>
            <section className="flex flex-wrap gap-3 ">
                <section>
                    <Image data-testid={"personImage"} className="w-10 self-start" src={photoURL} alt="profile image of this post" width={40} height={40} />
                    <section className="flex items-center gap-1">
                        <p data-testid={"hearts"}>{hearts}</p>
                        <button type="button" onClick={handleHeart} data-testid={"handleHeartButton"}>
                            <Image data-testid={"heartImage"} src={heartImage} alt="profile image of this post" width={15} height={15} />
                        </button>
                    </section>
                </section>
                <section className="w-10/12">
                    <p data-testid={"displayName"} className="font-bold hover:cursor-pointer hover:underline">{displayName}</p>
                    <p data-testid={"postText"} className="break-words">{postText}</p>
                </section>
            </section>
            {comments.length > 0 &&
                <hr data-testid={"hrShowing"} className="border-white/30" />
            }
            {comments.map(comment =>
                <section className="flex gap-3 pl-3" key={comment.createdAt}>
                    <Image data-testid={`commentphotoURL${comment.createdAt}`} className="w-10 self-start" src={comment.photoURL} alt="profile image of this post" width={40} height={40} />
                    <section className="w-11/12">
                        <p data-testid={`comment${comment.displayName}`} className="font-bold hover:cursor-pointer hover:underline">{comment.displayName}</p>
                        <p data-testid={`commentTextPost${comment.createdAt}`} className="break-words">{comment.commentText}</p>
                    </section>
                </section>
            )}
            <CommentForm id={id} />
        </section>
    );
}
