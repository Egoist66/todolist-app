import Button from "@material-ui/core/Button";
import {FC, memo, useCallback} from "react";
import {FilterProps, TasksElems} from "../types/Types";

type TaskControlsProps = {
  onDeleteAllTasks: (todoListID: string) => void;
  FilterTask: (status: "All" | "Completed" | "Active" ) => void;
  todoListID: string;
  tasks: TasksElems
  filterStatus: "All" | "Completed" | "Active" ;
};

export const TaskControls: FC<TaskControlsProps> = memo(({
  filterStatus, tasks, FilterTask, todoListID, onDeleteAllTasks,
}) => {


  const filterTask = useCallback((filter: FilterProps) => {
    return () => {
      FilterTask(filter)
    }
  }, [filterStatus])

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button disabled={!tasks[todoListID].length} onClick={() => onDeleteAllTasks(todoListID)}>
          Delete All Tasks
        </Button>
      </div>
      <div>
       
        <Button
          variant={filterStatus === "All" ? "contained" : "text"}
          onClick={filterTask('All')}
        >
          All
        </Button>
        <Button
          variant={filterStatus === "Active" ? "contained" : "text"}
          color={"primary"}
          onClick={filterTask('Active')}
        >
          Active
        </Button>
        <Button
          variant={filterStatus === "Completed" ? "contained" : "text"}
          color={"secondary"}
          onClick={filterTask('Completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
})
