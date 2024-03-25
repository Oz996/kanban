"use client";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import BoardModal from "./BoardModal";
import DeleteModal from "./DeleteModal";

export default function BoardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="cursor-pointer hover:opacity-60 duration-200"
          width={5}
          height={5}
          src={dots}
          alt="Three dots lined vertically"
        />
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
