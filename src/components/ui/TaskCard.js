import React, { useState } from "react";
import Icons from "./Icons";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/redux/slices/taskSlice";
import { toast } from "react-toastify";
import TaskForm from "./form/TaskForm";

const TaskCard = ({ task, users, refresh }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const transformDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN");
  };

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteTask({ id, token }));
      if (res?.payload?.status === 200) {
        toast.success(res?.payload?.data?.message);
        refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {};

  return (
    <div>
      <div className="flex gap-3 px-2.5 py-2.5 justify-between w-full bg-slate-100 my-2">
        <div>
          <p className="text-lg font-bold ">{task?.title}</p>
          <p className="text-xs">{task?.description}</p>
        </div>
        <div className="flex gap-3">
          <p
            className={`p-2 rounded font-medium ${
              task?.status === "pending"
                ? "bg-yellow-300 text-yellow-900"
                : task?.status === "in-progress"
                ? "bg-blue-300 text-blue-900"
                : "bg-green-300 text-green-900"
            }`}
          >
            {task?.status}
          </p>
          <p
            className={`${
              task?.priority === "low" ? "bg-green-400" : "bg-red-500"
            } p-2 rounded text-white`}
          >
            {task?.priority}
          </p>
          <p className="bg-yellow-200 p-2">{transformDate(task?.dueDate)}</p>
          <Icons
            handleClick={() => {
              setOpen(!open), setTaskId(task?._id);
            }}
            name={"edit"}
            color="#437BDB"
            className="cursor-pointer"
          />
          <Icons
            handleClick={() => handleDelete(task?._id)}
            name={"delete"}
            color="#F54927"
            className="cursor-pointer text-red-500"
          />
        </div>
        {open && (
          <TaskForm
            taskId={taskId}
            refresh={refresh}
            users={users}
            handleClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCard;
