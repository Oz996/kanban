// model types
export interface IObject {
  createdAt: string;
  editedAt: string;
  id: string;
}

export interface Board extends IObject {
  title: string;
  columns: Column[];
  isLocked?: boolean;
}

export interface Column extends IObject {
  title: string;
  tasks: Task[];
}

export interface Task extends IObject {
  title: string;
  description: string;
  status: Column[];
  subtasks: Subtask[];
}

export interface Subtask extends IObject {
  description: string;
  completed: boolean;
  taskId: string;
}
// ------------

// input types
export interface ColumnInput {
  id: string;
  title: string;
  error: string;
}

export interface SubtaskInput {
  id: string;
  description: string;
  error: string;
  completed: boolean;
}
// ------------

// element props
export interface ButtonProps {
  children: string;
  className?: string;
  size: "sm" | "lg";
  color: "primary" | "secondary" | "danger";
  type?: "submit" | "button";
  onClick?: any;
}

export interface ModalProps {
  type: "add" | "update";
  task?: Task;
  column?: Column;
  columns?: Column[];
  trigger: React.ReactNode;
}
// ------------
