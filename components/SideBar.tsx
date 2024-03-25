"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import eyeOpen from "@/assets/icon-show-sidebar.svg";
import eyeClosed from "@/assets/icon-hide-sidebar.svg";
import boardIcon from "@/assets/icon-board.svg";
import boardIconWhite from "@/assets/icon-board-white.svg";
import React, { SetStateAction, useEffect, useState } from "react";
import { Board } from "@/types";
import { useParams } from "next/navigation";
import BoardModal from "./BoardModal/BoardModal";
import Link from "next/link";
import classNames from "classnames";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import { useSidebar } from "@/hooks/useSidebar";
import { Dialog, DialogContent } from "./ui/dialog";
import { useBoard } from "@/hooks/useBoard";
import { Lock, LockIcon } from "lucide-react";

interface props {
  mobileBoard?: boolean;
  openedByClick?: boolean;
  closedByClick?: boolean;
  setClosedByClick?: React.Dispatch<SetStateAction<boolean>>;
  setMobileBoard?: React.Dispatch<SetStateAction<boolean>>;
  setOpenedByClick?: React.Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  mobileBoard,
  setMobileBoard,
  openedByClick,
  setOpenedByClick,
  closedByClick,
  setClosedByClick,
}: props) {
  // States and variables ---------------------------------
  const { data: session } = useSession();
  const { data: boards } = useFetchBoards();

  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  console.log("boards?", boards);

  const { showSidebar, setShowSidebar } = useSidebar();
  const { id } = useParams();
  // -----------------------------------------------------

  useEffect(() => {
    if (isMobile && !mobileBoard) setShowSidebar(false);
  }, [isMobile, mobileBoard, setShowSidebar]);

  const handleSameBoardClick = (board: Board) => {
    if (board.id === id) setMobileBoard!(false);
  };

  const handleIconToDisplay = (board: Board) => {
    if (board.id === id) return boardIconWhite;
    return boardIcon;
  };

  // setting states for sidebar and animations
  const handleShowSidebar = () => {
    setShowSidebar(true);
    setOpenedByClick!(true);
    setClosedByClick!(false);
  };

  const handleCloseSidebar = () => {
    setClosedByClick!(true);
    setOpenedByClick!(false);
    setTimeout(() => {
      setShowSidebar(false);
    }, 250);
  };

  // button that displays sidebar on click (desktop only)
  if (!showSidebar)
    return (
      <button
        aria-label="Open sidebar"
        onClick={handleShowSidebar}
        className="w-14 h-12 rounded-r-full bg-mainPurple md:flex justify-center items-center cursor-pointer absolute left-0 bottom-10 hover:bg-secondaryPurple duration-200 z-10 hidden"
      >
        <Image src={eyeOpen} width={18} height={18} alt="" aria-hidden="true" />
      </button>
    );

  //sidebar mobile modal
  if (mobileBoard)
    return (
      <Dialog open={mobileBoard} onOpenChange={setMobileBoard}>
        <DialogContent className="top-[16rem] max-w-[20rem] bg-darkGrey text-mediumGrey font-semibold px-0">
          <div>
            <h1 className="uppercase heading-sm px-8 tracking-[2.5px] pb-3">
              all boards ({boards?.length})
            </h1>
            <nav>
              <ul role="navigation" className="flex flex-col">
                {boards?.map((board: Board) => (
                  <li
                    key={board.id}
                    className={classNames({
                      "w-[90%] h-[3rem] hover:bg-secondaryPurple hover:text-white duration-200 cursor-pointer rounded-r-full px-8":
                        true,
                      "bg-mainPurple text-white": id === board.id,
                    })}
                  >
                    <Link
                      className="h-full flex gap-3 items-center"
                      href={`/board/${board.id}`}
                      onClick={() => {
                        handleSameBoardClick(board);
                        setMobileBoard!(false);
                      }}
                    >
                      <Image
                        src={handleIconToDisplay(board)}
                        width={15}
                        height={15}
                        alt=""
                        aria-hidden
                      ></Image>
                      <h2 className="heading-md truncate">{board.title}</h2>
                    </Link>
                  </li>
                ))}
                <div className="text-mainPurple cursor-pointer flex gap-3 items-center px-8 mt-3 hover:opacity-80 duration-200">
                  <Image
                    src={boardIcon}
                    width={15}
                    height={15}
                    alt="Board icon"
                  ></Image>
                  <BoardModal
                    type="add"
                    trigger={
                      <h2 className="heading-md text-mainPurple capitalize">
                        + create new board
                      </h2>
                    }
                  ></BoardModal>
                </div>
              </ul>
            </nav>
          </div>
        </DialogContent>
      </Dialog>
    );

  // sidebar desktop
  if (!isMobile)
    return (
      <aside
        className={classNames({
          "w-[19rem] h-[calc(100%-6rem)] absolute bg-darkGrey border-r border-linesDark  text-mediumGrey font-semibold py-5":
            true,
          "animate-sidebar-open": showSidebar && openedByClick,
          "animate-sidebar-closed": closedByClick,
        })}
      >
        <h1 className="uppercase px-8 heading-sm tracking-[2.5px] pb-3">
          all boards ({boards?.length})
        </h1>
        <div className="flex flex-col justify-between h-[calc(100%-3rem)]">
          <div>
            <nav>
              <ul role="navigation" className="flex flex-col">
                {boards?.map((board: Board) => (
                  <li
                    key={board.id}
                    className={classNames({
                      "w-[90%] h-[3rem] hover:bg-secondaryPurple hover:text-white duration-200 cursor-pointer rounded-r-full px-8":
                        true,
                      "bg-mainPurple text-white": id === board.id,
                    })}
                  >
                    <Link
                      className="h-full flex gap-3 items-center"
                      href={`/board/${board.id}`}
                    >
                      <Image
                        src={handleIconToDisplay(board)}
                        width={15}
                        height={15}
                        alt=""
                        aria-hidden
                      ></Image>
                      {board.isLocked ? (
                        <div className="flex gap-2 items-center">
                          <h2 className="heading-md truncate">{board.title}</h2>
                          <LockIcon size={18} />
                        </div>
                      ) : (
                        <h2 className="heading-md truncate">{board.title}</h2>
                      )}
                    </Link>
                  </li>
                ))}
                <div className="text-mainPurple cursor-pointer flex gap-3 items-center px-8 mt-3 hover:opacity-80 duration-200">
                  <Image
                    src={boardIcon}
                    width={15}
                    height={15}
                    alt="Board icon"
                  ></Image>
                  <BoardModal
                    type="add"
                    trigger={
                      <h2 className="heading-md text-mainPurple capitalize">
                        + create new board
                      </h2>
                    }
                  ></BoardModal>
                </div>
              </ul>
            </nav>
          </div>
          <button
            aria-label="Close sidebar"
            className="flex gap-3 items-center cursor-pointer mt-20 px-8 hover:opacity-80 duration-200"
            onClick={handleCloseSidebar}
          >
            <Image src={eyeClosed} width={15} height={15} alt="" />
            <p className="capitalize">hide sidebar</p>
          </button>
        </div>
      </aside>
    );
}
