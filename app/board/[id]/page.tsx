"use client";
import { Column } from "@/types";
import Columns from "./Columns";
import BoardModal from "@/components/BoardModal/BoardModal";
import { useEffect, useState } from "react";
import { useBoard } from "@/hooks/useBoard";
import classNames from "classnames";
import { useSidebar } from "@/hooks/useSidebar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useFetchBoard } from "@/hooks/useFetchBoard";
import Sidebar from "@/components/Sidebar";

export default function Page({ params }: { params: { id: any } }) {
  const [openedByClick, setOpenedByClick] = useState(false);
  const [closedByClick, setClosedByClick] = useState(false);

  const { data: board } = useFetchBoard({ params });
  const { setBoard } = useBoard();

  const { showSidebar } = useSidebar();
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  console.log("board", board);

  useEffect(() => {
    if (board) setBoard(board);
  }, [board, setBoard]);

  const columns: Column[] = board?.columns;

  // const modalTrigger = (
  //   <ButtonPrimary size="lg" color="primary">
  //     + add new column
  //   </ButtonPrimary>
  // );

  // if (!columns?.length)
  //   return (
  //     <section className="flex pt-24 h-screen">
  //       <Sidebar />
  //       <div className="flex flex-col gap-6 items-center justify-center h-screen self-center w-full">
  //         <p className="text-grey-medium">
  //           This board is empty. Create a new column to get started
  //         </p>
  //         <BoardModal type="update" trigger={modalTrigger} />
  //       </div>
  //     </section>
  //   );

  return (
    <section className="flex gap-1 pt-24 h-screen overflow-x-scroll">
      <Sidebar
        openedByClick={openedByClick}
        closedByClick={closedByClick}
        setOpenedByClick={setOpenedByClick}
        setClosedByClick={setClosedByClick}
      />
      <div
        className={classNames({
          "flex gap-6 py-5 px-6": true,
          "ml-[19rem]": showSidebar && !isMobile,
          "animate-sidebar-open-page":
            showSidebar && openedByClick && !isMobile,
          "animate-sidebar-closed-page": closedByClick,
        })}
      >
        <Columns columns={columns} />
        {columns?.length < 5 && (
          <BoardModal
            type="update"
            trigger={
              <div className="w-[17.5rem] h-[calc(100vh-11rem)] mt-10 bg-gradient-to-b from-grey-dark to-grey-darker to-95% rounded-lg flex justify-center items-center cursor-pointer text-grey-medium hover:text-purple-medium duration-200">
                <h2 className="capitalize heading-xl">+ new column</h2>
              </div>
            }
          ></BoardModal>
        )}
      </div>
    </section>
  );
}
