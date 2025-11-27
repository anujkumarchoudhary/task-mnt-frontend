import React, { useEffect, useState } from "react";
import TaskCard from "@/components/ui/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "@/redux/slices/taskSlice";
import Button from "@/components/ui/Button";
import TaskForm from "@/components/ui/form/TaskForm";
import { getAllUsers } from "@/redux/slices/userSlice";
import FilterForm from "@/components/ui/form/Filter";

const index = () => {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [queryVal, setQueryVal] = useState();
  const [refresh, setRefresh] = useState(false);
  const { token } = useSelector((state) => state?.global);
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const getAllTask = async () => {
    try {
      const res = await dispatch(getAllTasks({ query: queryVal, token }));
      setTasks(res?.payload?.data);
      setOpenFilter(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await dispatch(getAllUsers({ token }));
      const users = res?.payload?.data;
      const findUser = users?.filter((item) => item?.role === "user");
      setUsers(findUser);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTask();
    getAllUser();
  }, [token, refresh, queryVal]);

  console.log(users, "usersJSFJZKF");
  return (
    <div className="px-[5%] py-[2rem]">
      {token ? (
        <>
          {" "}
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Button
                isBorder={true}
                name={"Filter"}
                handleClick={() => setOpenFilter(!openFilter)}
              />
              <Button
                isBorder={true}
                name={"Reset"}
                handleClick={() => setQueryVal("")}
              />
            </div>
            <div>
              <Button
                isBorder={true}
                name={"Add Task"}
                handleClick={() => setOpen(!open)}
              />
            </div>
          </div>
          {tasks?.map((item) => {
            return (
              <div>
                <TaskCard
                  users={users}
                  refresh={() => setRefresh(!refresh)}
                  task={item}
                />
              </div>
            );
          })}
          {open && (
            <TaskForm
              refresh={() => setRefresh(!refresh)}
              users={users}
              handleClose={() => setOpen(false)}
            />
          )}
          {openFilter && (
            <FilterForm
              users={users}
              query={(data) => setQueryVal(data)}
              handleClose={() => setOpenFilter(false)}
            />
          )}
        </>
      ) : (
        "Please Login"
      )}
    </div>
  );
};

export default index;
