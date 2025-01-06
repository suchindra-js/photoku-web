"use client";
import { FC } from "react";
import Button from "../_components/button";
import { useRouter } from "next/navigation";

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
