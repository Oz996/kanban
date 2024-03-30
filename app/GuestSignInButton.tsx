"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function GuestSignInButton() {
  const handleGuestSignIn = async () => {
    await signIn("credentials", {
      username: "Guest",
      password: "kanban123",
    });
  };
  return <Button onClick={handleGuestSignIn}>Enter as guest</Button>;
}
