"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/button";

const SignIn: FC = () => {
  const { push } = useRouter();
  return (
    <div>
      <div>SignIn</div>
      <Button onClick={() => push("profile")}>Sign In</Button>
    </div>
  );
};

export default SignIn;
