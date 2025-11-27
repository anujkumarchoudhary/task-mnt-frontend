import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import axios from "axios";
import { baseUrl } from "@/baseurl";
import { toast } from "react-toastify";
import Icons from "../Icons";
import { useDispatch } from "react-redux";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "@/redux/slices/taskSlice";

const FilterForm = ({ query, users, refresh, handleClose }) => {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState({
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

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-10">
      <div className="relative bg-white space-y-4 p-10 rounded-lg shadow-lg w-[90%] md:w-1/2 max-w-md text-center">
        <p className="text-2xl font-bold">Filter Task</p>

        <Icons
          name={"close"}
          handleClick={handleClose}
          color="#D42E1F"
          className="absolute top-4 right-4 cursor-pointer"
        />

        <div className="grid grid-cols-2 gap-2">
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
        </div>

        <Button
          handleClick={() => query(inputVal)}
          name="Submit"
          isBorder={true}
          className="mt-3"
        />
      </div>
    </div>
  );
};

export default FilterForm;
