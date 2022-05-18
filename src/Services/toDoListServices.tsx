import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialSate } from "../Features/tasksSlice";
import { Task } from "../Interfaces";
import { RootState } from "../app/store";

export const GetInitialTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get("https://gorest.co.in/public/v2/todos");
        const tasksFiltered = result.data.map((task: Task) => ({
          id: task.id,
          title: task.title,
          status: task.status,
        }));
        dispatch(setInitialSate(tasksFiltered));
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    if (tasks.length === 0) {
      fetchData();
    }
  }, []);
  return { loading, error };
};
