import { Column } from "@/types";
import classnames from "classnames";
import TaskCard from "./TaskCard";

interface props {
  columns: Column[];
}

export default function Columns({ columns }: props) {
  return (
    <>
      {columns?.map((column, index) => {
        const columnTasksCount = column.tasks.length;

        return (
          <div
            key={column.id}
            className="w-[17.5rem] rounded flex flex-col gap-4"
          >
            <div className="flex gap-3 items-center mb-3">
              <div
                className={classnames({
                  "size-4 rounded-full": true,
                  "bg-cyan-500": index === 0,
                  "bg-purple-700": index === 1,
                  "bg-green-300": index === 2,
                  "bg-orange-400": index === 3,
                  "bg-fuchsia-600": index === 4,
                })}
              />
              <h2 className="heading-sm text-grey-medium uppercase tracking-[2.5px]">
                {column.title} ({columnTasksCount})
              </h2>
            </div>
            <TaskCard tasks={column.tasks} column={column} columns={columns} />
          </div>
        );
      })}
    </>
  );
}
