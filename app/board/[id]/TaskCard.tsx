import ViewTaskModal from "@/components/ViewTaskModal/ViewTaskModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Column, Task } from "@/types";

interface props {
  tasks: Task[];
  columns: Column[];
  column: Column;
}

export default function TaskCard({ tasks, columns, column }: props) {
  return (
    <>
      {tasks.map((task) => {
        const subtasks = task.subtasks;
        const completed = subtasks.filter((subtask) => subtask.completed);

        const taskCard = (
          <Card
            key={task.id}
            className="bg-darkGrey w-full cursor-pointer hover:opacity-60 duration-200 overflow-hidden shadow"
          >
            <CardHeader>
              <CardTitle className="heading-md text-white line-clamp-3 w-full">
                {task.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="heading-sm text-mediumGrey">
              {completed.length} of {subtasks.length} subtasks
            </CardContent>
          </Card>
        );
        return (
          <ViewTaskModal
            type="update"
            key={task.id}
            task={task}
            column={column}
            columns={columns}
            trigger={taskCard}
          ></ViewTaskModal>
        );
      })}
    </>
  );
}
