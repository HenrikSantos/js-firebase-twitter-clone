"use client";

import React, { useEffect, useRef, useState } from "react";
import addComment from "@/api/addComment";
import { store } from "@/zustand/store";
import { useStore } from "zustand";

export default function CommentForm({ id }: { id: string }) {
    const [textArea, setTextArea] = useState("");
    const { user } = useStore(store);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "5px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [textArea]);

    function handleAddComment() {
        if (user) {
            addComment(id, textArea, user);
            setTextArea("");
        } else window.alert("You must be logged in to comment");
    }

    return (
        <>
            <hr className="border-white/30" />
            <section className="flex items-center justify-between gap-3">
                <textarea
                    id="postText"
                    data-testid={"CommentTextArea"}
                    className="h-5 w-full resize-none overflow-auto border-none pl-3 text-white outline-none"
                    name="postText"
                    maxLength={280}
                    placeholder="Postar sua resposta"
                    value={textArea}
                    ref={textAreaRef}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        if (event.target.value.length > 280) return;
                        setTextArea(event.target.value);
                    }}
                />
                <p
                    className={`self-end font-light ${textArea.length === 280 ? "text-red-600" : ""}`}
                    data-testid={"textLegthCounter"}
                >
                    {textArea.length}/280
                </p>
                <button
                    data-testid={"addCommentBtn"}
                    className="self-end rounded-full bg-blue-500/95 px-3 py-1 font-semibold text-white hover:bg-blue-600/95"
                    type="button"
                    onClick={handleAddComment}
                >
                    Comentar
                </button>
            </section>
        </>
    );
}
