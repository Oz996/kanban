"use client";
import Image from "next/image";
import logoLight from "@/assets/logo-light.svg";
import logoMobile from "@/assets/logo-mobile.svg";
import chevronDown from "@/assets/icon-chevron-down.svg";
import chevronUp from "@/assets/icon-chevron-up.svg";
import { Button } from "./ui/button";
import BoardDropdown from "./BoardDropdown";
import TaskModal from "./TaskModal/TaskModal";
import { useBoard } from "@/hooks/useBoard";
import { useMediaQuery } from "@uidotdev/usehooks";
import ButtonPrimary from "./ButtonPrimary";
import { useEffect, useState } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
  const [mobileBoard, setMobileBoard] = useState(false);
  const { board } = useBoard();
  const { showSidebar, setShowSidebar } = useSidebar();

  const path = usePathname();
  const columns = board?.columns;

  const isHomePage = path === "/";
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const isLocked = board?.isLocked;

  const handleDisplayMobileBoard = () => {
    if (isMobile) {
      setMobileBoard((prev) => !prev);
      setShowSidebar((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isMobile) setMobileBoard(false);
  }, [isMobile]);

  const modalTrigger = (
    <ButtonPrimary disabled={isLocked} type="button" color="primary" size="sm">
      + add new task
    </ButtonPrimary>
  );

  const modalTriggerMobile = (
    <Button
      disabled={isLocked}
      className="rounded-full w-[3.5rem] text-3xl pb-4 text-center bg-purple-medium hover:bg-purple-light"
    >
      +
    </Button>
  );
  console.log("mobileBoard", mobileBoard);
  return (
    <header
      role="banner"
      className={classNames({
        "absolute left-0 right-0 h-[6rem] bg-grey-dark items-center flex border-b border-lines-dark":
          true,
        hidden: isHomePage,
      })}
    >
      <div className="flex justify-between text-white px-4 md:px-6 w-full">
        <div className="flex gap-5 md:gap-32 items-center">
          {isMobile ? (
            <Image width={25} height={25} src={logoMobile} alt="logo" />
          ) : (
            <Image
              width={160}
              height={160}
              src={logoLight}
              alt="logo"
              priority
            />
          )}
          <div
            onClick={handleDisplayMobileBoard}
            className="flex gap-3 items-center"
          >
            {board?.title ? (
              <h1 className="heading-lg md:heading-xl max-w-[40vw] md:max-w-[18rem] truncate">
                {board?.title}
              </h1>
            ) : (
              <Skeleton className="w-[15rem] h-[2rem]" />
            )}

            {isMobile &&
              (mobileBoard ? (
                <Image width={15} height={15} src={chevronUp} alt="" />
              ) : (
                <Image width={15} height={15} src={chevronDown} alt="" />
              ))}
          </div>
        </div>
        <div className="flex gap-1 md:gap-4 items-center">
          <TaskModal
            type="add"
            columns={columns}
            trigger={isMobile ? modalTriggerMobile : modalTrigger}
          ></TaskModal>
          <BoardDropdown isLocked={isLocked} />
        </div>
      </div>
      {/* sidebar */}
      {isMobile && showSidebar && (
        <Sidebar mobileBoard={mobileBoard} setMobileBoard={setMobileBoard} />
      )}
    </header>
  );
}
