import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialSate } from "../Features/usersSlice";
import { RootState } from "../app/store";

export const GetInitialUsers = () => {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get("https://gorest.co.in/public/v2/users");
        dispatch(setInitialSate(result.data));
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    if (users.users.length === 0) {
      fetchData();
    }
  }, []);
  return { loading, error };
};
