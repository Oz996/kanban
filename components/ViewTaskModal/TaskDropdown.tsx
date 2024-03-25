import Image from "next/image";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TaskModal from "../TaskModal/TaskModal";
import DeleteModal from "../DeleteModal";
import { Column, Task } from "@/types";
import { useBoard } from "@/hooks/useBoard";
import { errorToast } from "@/utils/errorToast";
import { SetStateAction } from "react";

interface props {
  task: Task;
  columns: Column[];
  column: Column;
}
export default function TaskDropdown({ task, column, columns }: props) {
  const { board } = useBoard();
  const isLocked = board?.isLocked;

  const handleDisabledClick = () => {
    errorToast("delete");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative">
        <div
          aria-haspopup="true"
          className="flex items-center justify-center self-start min-w-6 h-9 rounded-full group bg-transparent hover:bg-veryDarkGrey duration-200 cursor-pointer"
        >
          <Image
            className="group-hover:opacity-60 duration-200"
            width={5}
            height={5}
            src={dots}
            alt="Three dots lined vertically"
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
            <TaskModal
              type="update"
              task={task}
              columns={columns}
              column={column}
              trigger={
                <span className="pl-3 text-md capitalize text-mediumGrey hover:opacity-60 duration-200 cursor-pointer">
                  edit task
                </span>
              }
            ></TaskModal>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {isLocked ? (
              <span
                onClick={handleDisabledClick}
                className="pl-3 text-md capitalize text-danger opacity-40"
              >
                delete task
              </span>
            ) : (
              <DeleteModal
                type="task"
                task={task}
                trigger={
                  <span className="pl-3 text-md capitalize text-danger hover:opacity-60 duration-200 cursor-pointer">
                    delete task
                  </span>
                }
              ></DeleteModal>
            )}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
