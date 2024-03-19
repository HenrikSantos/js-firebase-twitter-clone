"use client";

import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { User, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import "./Login.css";

export default function Login() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);
    
    const signInWithGoogle = async() => {
        try {
            await signInWithPopup(auth,googleProvider);
        } catch (err){
            console.error(err);
        }
    };
    const logOut = async() => {
        try {
            await signOut(auth);
        } catch (err){
            console.error(err);
        }
    };

    return (
        <section>
            {!user && <button type="button" onClick={signInWithGoogle}>Login</button> }
            {user && 
                <>
                    <p>{user.displayName}</p>
                    <button type="button" onClick={logOut}>logout</button>
                </>
            }
        </section>
    );
}
