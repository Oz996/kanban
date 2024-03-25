"use client";

import { useSession } from "next-auth/react";
import GoogleAuthButton from "./GoogleAuthButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchBoards } from "@/hooks/useFetchBoards";

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

  return (
    <section className="h-screen pt-24">
      <div className="text-white font-semibold flex flex-col justify-center items-center">
        <h1 className="text-3xl">Sign in</h1>
        <GoogleAuthButton />
      </div>
    </section>
  );
}
