"use client";

import { FC, useState } from "react";
import CustomButton from "./CustomButton";
import { UserIcon } from "lucide-react";
import { signIn } from "next-auth/react";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      throw new Error("Error Logging in with google");
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomButton
      loading={loading}
      onClick={signInWithGoogle}
      icon={<UserIcon />}
    >
      Sign In
    </CustomButton>
  );
};

export default SignInButton;
