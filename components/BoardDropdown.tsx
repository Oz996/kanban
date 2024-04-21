"use client";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import BoardModal from "./BoardModal/BoardModal";
import DeleteModal from "./DeleteModal";
import { signOut } from "next-auth/react";
import { errorToast } from "@/utils/errorToast";

interface props {
  isLocked: boolean | undefined;
}

export default function BoardDropdown({ isLocked }: props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center w-6 h-9 rounded-full group bg-transparent hover:bg-grey-light dark:hover:bg-grey-darker duration-200 cursor-pointer">
          <Image
            className="group-hover:opacity-60 duration-200"
            width={5}
            height={5}
            src={dots}
            alt=""
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[12rem] bg-white dark:bg-grey-darker dark:text-white border-none mr-8 mt-5 py-3">
        <div className="flex flex-col gap-3 pl-3">
          {/* temporary solution */}
          <DropdownMenuItem
            asChild
            className="text-md capitalize text-grey-medium hover:opacity-60 duration-200"
          >
            {isLocked ? (
              <span
                onClick={() => errorToast("edit")}
                className="pl-3 py-0 text-md capitalize text-grey-medium opacity-60"
              >
                edit board
              </span>
            ) : (
              <BoardModal
                type="update"
                trigger={
                  <span className="pl-3 text-md capitalize text-grey-medium hover:opacity-60 duration-200 cursor-pointer">
                    edit board
                  </span>
                }
              ></BoardModal>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {isLocked ? (
              <span
                onClick={() => errorToast("delete")}
                className="pl-3 py-0 text-md  capitalize text-danger-medium opacity-40"
              >
                delete board
              </span>
            ) : (
              <DeleteModal
                type="board"
                trigger={
                  <span className="pl-3 text-md capitalize text-danger-medium hover:opacity-60 duration-200 cursor-pointer">
                    delete board
                  </span>
                }
              ></DeleteModal>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <span
              onClick={() => signOut()}
              className="pl-3 pt-0 text-md capitalize hover:opacity-60 duration-200 cursor-pointer text-black dark:text-white"
            >
              sign out
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
