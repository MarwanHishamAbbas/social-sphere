"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  const signInWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  };
  return (
    <button
      className="bg-dark-50 text-white rounded-md p-4"
      onClick={signInWithGoogle}
    >
      Continue With Google
    </button>
  );
}
