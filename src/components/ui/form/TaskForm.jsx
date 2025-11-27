import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import axios from "axios";
import { baseUrl } from "@/baseurl";
import { toast } from "react-toastify";
import Icons from "../Icons";
import { useDispatch } from "react-redux";
import { createTask, getTaskById, updateTask } from "@/redux/slices/taskSlice";

const TaskForm = ({ taskId, users, refresh, handleClose }) => {
  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
    priority: "",
    assignedUsers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getSingleTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await dispatch(getTaskById({ id, token }));
      if (res?.payload?.status === 200) {
        const task = res?.payload?.data?.task;
        setInputVal({
          title: task?.title,
          description: task?.description,
          status: task?.status,
          dueDate: task?.dueDate,
          priority: task?.priority,
          assignedUsers: task?.assignedUsers,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreate = async () => {
    if (!inputVal.title || !inputVal.description || !inputVal.dueDate) {
      return toast.error("Title, Description & Due Date are required!");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await dispatch(createTask({ body: inputVal, token }));
      console.log(res, "ressdofjopskfsf");
      if (res?.payload?.status === 201) {
        toast.success(res?.payload?.data?.message);
        handleClose();
        refresh();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    if (!inputVal.title || !inputVal.description || !inputVal.dueDate) {
      return toast.error("Title, Description & Due Date are required!");
    }

    try {
      const token = localStorage.getItem("token");
      const res = await dispatch(
        updateTask({ id: taskId, body: inputVal, token })
      );

      if (res?.payload?.status === 200) {
        toast.success(res?.payload?.data?.message);
        handleClose();
        refresh();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getSingleTask(taskId);
  }, [taskId]);
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-10">
      <div className="relative bg-white space-y-4 p-10 rounded-lg shadow-lg w-[90%] md:w-1/2 max-w-md text-center">
        <p className="text-2xl font-bold">
          {taskId ? "Update Task" : "Create Task"}
        </p>

        <Icons
          name={"close"}
          handleClick={handleClose}
          color="#D42E1F"
          className="absolute top-4 right-4 cursor-pointer"
        />
        <InputField
          name="title"
          value={inputVal.title}
          handleChange={handleChange}
          placeholder="Task Title"
        />

        <InputField
          name="description"
          value={inputVal.description}
          handleChange={handleChange}
          placeholder="Task Description"
        />

        <SelectField
          name="status"
          data={["pending", "in-progress", "done"]}
          value={inputVal.status}
          handleChange={handleChange}
        />

        <SelectField
          name="priority"
          data={["low", "high"]}
          value={inputVal.priority}
          handleChange={handleChange}
        />

        <InputField
          type="date"
          name="dueDate"
          value={inputVal.dueDate}
          handleChange={handleChange}
          placeholder="Due Date"
        />

        <SelectField
          name="assignedUsers"
          data={users}
          value={inputVal.assignedUsers}
          handleChange={handleChange}
        />

        <Button
          handleClick={taskId ? handleUpdate : handleCreate}
          name="Submit"
          isBorder={true}
          className="mt-3"
        />
      </div>
    </div>
  );
};

export default TaskForm;
