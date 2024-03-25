import classNames from "classnames";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import DynamicInput from "./DynamicInput";
import { ColumnInput } from "@/types";
import { SetStateAction } from "react";
import ButtonPrimary from "./ButtonPrimary";
import { initState } from "./BoardForm";

interface props {
  columns: ColumnInput[];
  setColumns: React.Dispatch<SetStateAction<ColumnInput[]>>;
}

export default function BoardColumns({ columns, setColumns }: props) {
  const handleAddColumn = () => {
    const columnArray = [...columns];

    columnArray.push(initState);
    setColumns(columnArray);
  };

  const handleRemoveColumn = (index: number) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTitle = e.target.value;
    const updatedColumn = {
      ...columns[index],
      title: newTitle,
      error: "",
    };
    const newColumns = [...columns];
    newColumns[index] = updatedColumn;
    setColumns(newColumns);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Label htmlFor="columns" className="text-left heading-sm capitalize">
          board columns
        </Label>
        {columns?.map((column, index) => (
          <div key={index} className="relative flex gap-3 items-center">
            <Input
              aria-describedby="columnError"
              id="columns"
              className={classNames({
                "col-span-3 bg-darkGrey input": true,
                "border-danger focus-within:border-danger": column.error,
              })}
              value={column.title}
              onChange={(e) => handleChange(e, index)}
            />
            {columns?.length > 1 && (
              <DynamicInput
                handleRemove={handleRemoveColumn}
                index={index}
                error={column.error}
              />
            )}
            {column.error && (
              <p
                id="columnError"
                className={classNames({
                  "body-lg text-red-400 absolute": true,
                  "right-14": columns.length > 1,
                  "right-6": columns.length === 1,
                })}
              >
                {column.error}
              </p>
            )}
          </div>
        ))}
      </div>
      {columns?.length < 5 && (
        <ButtonPrimary
          onClick={handleAddColumn}
          type="button"
          size="sm"
          color="secondary"
          className="mb-1"
        >
          + add new column
        </ButtonPrimary>
      )}
    </>
  );
}
