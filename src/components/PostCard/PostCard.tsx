import React from "react";
import "./PostCard.css";
import Image from "next/image";
import profileImage from "../../../public/profile-default.svg";
import CommentForm from "../CommentForm/CommentForm";

export interface IComment {
    commentText: string,
    date: number,
    userImage: string,
    userName: string
}

export interface IPostCard {
    id: string,
    postText: string,
    userImage: string,
    userName: string,
    date: number,
    comments: IComment[]
}

export default function PostCard({ post }: {post: IPostCard}) {

    return (
        <section className="my-3 space-y-3 rounded-md border border-white/30 p-3" id={post.id}>
            <section className="flex flex-wrap gap-3 ">
                <Image className="w-10 self-start" src={post.userImage || profileImage} alt="profile image of this post" width={40} height={40}/>
                <section className="w-10/12">
                    <p className="font-bold hover:cursor-pointer hover:underline">{post.userName}</p>
                    <p className="break-words">{post.postText}</p>
                </section>
            </section>
            {post.comments.length > 0 && 
                <hr className="border-white/30" />
            }
            {post.comments.map(comment =>
                <section className="flex gap-3 pl-3" key={comment.date}>
                    <Image className="w-10 self-start" src={comment.userImage || profileImage} alt="profile image of this post" width={40} height={40}/>
                    <section className="w-11/12">
                        <p className="font-bold hover:cursor-pointer hover:underline">{comment.userName || "unknow"}</p>
                        <p className="break-words">{comment.commentText}</p>
                    </section>
                </section>
            )}
            <CommentForm id={post.id} />
        </section>
    );
}
