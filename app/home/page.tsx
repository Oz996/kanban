"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import eyeOpen from "@/assets/icon-show-sidebar.svg";
import eyeClosed from "@/assets/icon-hide-sidebar.svg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <section className="text-white flex flex-col">
      {showSidebar && (
        <div className="h-screen w-[19rem] bg-darkGrey border-r border-linesDark  text-mediumGrey font-semibold">
          <div className="px-8 pt-24">
            <div className="py-5">
              <h2 className="uppercase">all boards ()</h2>
            </div>
            <div className="flex gap-3 items-center cursor-pointer">
              <Image
                src={eyeClosed}
                width={15}
                height={15}
                alt="Icon to toggle sidebar off"
              />
              <p onClick={() => setShowSidebar(false)} className="capitalize">
                hide sidebar
              </p>
            </div>
          </div>
        </div>
      )}

      {/* <Button onClick={() => signOut()}>Sign out</Button> */}

      {!showSidebar && (
        <div
          onClick={() => setShowSidebar(true)}
          className="w-14 h-12 rounded-r-full bg-mainPurple flex justify-center items-center cursor-pointer absolute left-0 bottom-10 hover:bg-mainPurpleHover duration-200"
        >
          <Image
            src={eyeOpen}
            width={18}
            height={18}
            alt="Icon to toggle sidebar on"
          />
        </div>
      )}
    </section>
  );
}
