"use client";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import BoardModal from "./BoardModal";
import DeleteModal from "../DeleteModal";
import { signOut } from "next-auth/react";

export default function BoardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center w-6 h-9 rounded-full group bg-transparent hover:bg-veryDarkGrey duration-200 cursor-pointer">
          <Image
            className="group-hover:opacity-60 duration-200"
            width={5}
            height={5}
            src={dots}
            alt=""
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[12rem] bg-veryDarkGrey text-white border-none mr-8 mt-5 py-3">
        <div className="flex flex-col gap-3 pl-3">
          {/* temporary solution */}
          <DropdownMenuItem
            asChild
            className="text-md capitalize text-mediumGrey hover:opacity-60 duration-200 cursor-pointer"
          >
            <BoardModal
              type="update"
              trigger={
                <span className="pl-3 text-md capitalize text-mediumGrey hover:opacity-60 duration-200 cursor-pointer">
                  edit board
                </span>
              }
            ></BoardModal>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DeleteModal
              type="board"
              trigger={
                <span className="pl-3 text-md capitalize text-danger hover:opacity-60 duration-200 cursor-pointer">
                  delete board
                </span>
              }
            ></DeleteModal>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <span
              onClick={() => signOut()}
              className="pl-3 text-md capitalize text-yellow-200 hover:opacity-60 duration-200 cursor-pointer"
            >
              sign out
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
