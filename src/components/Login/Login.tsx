"use client";

import React, { useEffect } from "react";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";
import { useStore } from "zustand";
import { store } from "@/zustand/store";

export default function Login() {
    const { user, fetchUsers } = useStore(store);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <section className={`${user ? "" : "border-none"} flex items-center justify-between p-3 md:fixed md:right-5 md:top-5 md:gap-3 md:rounded-md md:border`}>
                {user ?
                    <>
                        <section className="flex items-start gap-3">
                            <Image data-testid={"userImage"} src={user.photoURL || ""} alt="foto do usuário logado" width={40} height={40} />
                            <p data-testid={"userName"}>{user.displayName}</p>
                        </section>
                        <button
                            data-testid={"logout"}
                            className="rounded-md border px-2 hover:bg-white/30 md:self-start"
                            type="button"
                            onClick={logOut}
                        >
                            logout
                        </button>
                    </>
                    :
                    <button
                        data-testid={"loginBtn"}
                        className="rounded-md border px-2 hover:bg-white/30"
                        type="button"
                        onClick={signInWithGoogle}
                    >
                        Login
                    </button>
                }
            </section>
        </>

    );
}
