"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import GoogleAuthButton from "./GoogleAuthButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: boards } = useFetchBoards();
  console.log("boards", boards);
  console.log("sesh", session);

  // we route the user to the first board in the fetched list if authenticated
  const firstBoardId = boards && boards.length > 0 ? boards[0]?.id : null;

  useEffect(() => {
    if (session && firstBoardId) router.push(`/board/${firstBoardId}`);
  }, [session, router, firstBoardId]);

  const handleGuestSignIn = async () => {
    await signIn("credentials", {
      username: "Guest",
      password: "kanban123",
    });
  };
  return (
    <section className="h-screen pt-24">
      <div className="text-white font-semibold flex flex-col justify-center items-center gap-5">
        <hgroup className="text-center">
          <h1 className="text-3xl">Welcome to Kanban Task Manager</h1>
          <p className="text-2xl mt-3">Sign in</p>
        </hgroup>
        <GoogleAuthButton />
        <Button onClick={handleGuestSignIn}>Enter as guest</Button>
      </div>
    </section>
  );
}
