"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function GoogleAuthButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      className="bg-black text-white hover:bg-black hover:opacity-80 duration-300"
    >
      Sign in with Google
    </Button>
  );
}
