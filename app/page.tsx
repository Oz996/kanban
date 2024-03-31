"use client";
import { useSession } from "next-auth/react";
import GoogleAuthButton from "./GoogleAuthButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import GuestSignInButton from "./GuestSignInButton";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: boards } = useFetchBoards();
  console.log("boards", boards);
  console.log("sesh", session);

  // we route the user to the first board in the fetched list of boards if authenticated
  const firstBoardId = boards && boards.length > 0 ? boards[0]?.id : null;

  useEffect(() => {
    if (session && firstBoardId) router.push(`/board/${firstBoardId}`);
  }, [session, router, firstBoardId]);

  return (
    <section className="h-screen w-screen grid grid-cols-1 md:grid-cols-[60%,40%]">
      <div className="bg-gradient-to-b from-grey-darker to-grey-dark text-white pt-10 md:pt-44">
        <h1 className="text-4xl text-center mb-4 font-semibold">
          Welcome to Kanban Task Manager
        </h1>
        <p className="text-lg w-[90%] md:w-[35rem] mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae optio
          itaque incidunt nemo officiis, sapiente repudiandae odio accusamus
          consequatur saepe!
        </p>
      </div>
      <div className="bg-white flex flex-col gap-3 pt-10 md:pt-44">
        <h2 className="text-center text-grey-darker text-3xl font-bold">
          Sign in
        </h2>
        <div className="w-[90%] sm:w-[20rem] flex flex-col justify-center gap-2 pt-5 mx-auto">
          <GoogleAuthButton />
          <GuestSignInButton />
        </div>
      </div>
    </section>
  );
}
