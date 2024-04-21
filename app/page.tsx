"use client";
import { useTheme } from "next-themes";
import GoogleAuthButton from "./GoogleAuthButton";
import GuestSignInButton from "./GuestSignInButton";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import Image from "next/image";

export default function Page() {
  const { theme } = useTheme();
  console.log("theme?", theme);
  return (
    <section className="h-screen w-screen bg-grey-light dark:bg-gradient-to-b dark:from-grey-darker dark:to-grey-dark text-white ">
      <div className="flex flex-col justify-center items-center h-full">
        {theme === "light" ? (
          <Image src={logoDark} width={200} height={200} alt="Company logo" />
        ) : (
          <Image src={logoLight} width={200} height={200} alt="Company logo" />
        )}

        <div className="rounded-lg py-10 mt-8 px-5 bg-white dark:bg-grey-darker w-[90%] sm:w-[22rem] mx-auto text-black dark:text-white">
          <h2 className="text-center text-xl md:text-2xl font-semibold">
            Sign in
          </h2>
          <div className="flex flex-col justify-center gap-2 pt-5 mx-auto sm:px-3">
            <GoogleAuthButton />
            <GuestSignInButton />
          </div>
        </div>
      </div>
    </section>
  );
}
