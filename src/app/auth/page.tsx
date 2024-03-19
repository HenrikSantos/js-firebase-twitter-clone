"use client";

import React from "react";
import { auth , googleProvider } from "../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {
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
        <div>
            <button onClick={signInWithGoogle}> Signin with google</button>
            <button onClick={logOut}> logOut</button>
        </div>
    );
}
