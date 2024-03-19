import React from "react";
import "./PostCard.css";
import Image from "next/image";
import profileImage from "../../../public/profile-default.svg";

interface IPostCard {
  id: string,
  postText: string,
  userImage?: string
  userName?: string
}

export default function PostCard({ id, postText, userImage, userName }: IPostCard) {
    return (
        <section className="flex gap-3 border border-white/10 p-3" id={id}>
            <img className="w-10 self-start" src={userImage || profileImage} alt="profile image of this post" width={40} height={40}/>
            <section className="w-10/12">
                <p className="font-bold hover:cursor-pointer hover:underline">{userName || "unknown"}</p>
                <p>{postText}</p>
            </section>
        </section>
    );
}
