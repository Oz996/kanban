"use client";
import GoogleAuthButton from "./GoogleAuthButton";
import GuestSignInButton from "./GuestSignInButton";

export default function Page() {
  return (
    <section className="h-screen w-screen bg-gradient-to-b from-grey-darker to-grey-dark text-white ">
      <div className="pt-10 md:pt-44">
        <h1 className="text-2xl sm:text-3xl text-center mb-4 font-semibold">
          Welcome to Kanban Task Manager
        </h1>
        <div className="rounded-lg py-10 mt-8 px-5 bg-grey-darker w-[90%] sm:w-[27rem] mx-auto">
          <h2 className="text-center text-xl md:text-2xl font-semibold">
            Sign in
          </h2>
          <div className="sm:w-[20rem] flex flex-col justify-center gap-2 pt-5 mx-auto">
            <GoogleAuthButton />
            <GuestSignInButton />
          </div>
        </div>
      </div>
    </section>
  );
}
