import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, editUser } from "../../Features/usersSlice";
import { RootState } from "../../app/store";
import { User, UserFormProps } from "../../Interfaces";
import "./UserForm.css";


export default function UsersForm({
  user,
  setShowUpdateUser,
  setShowNewUser,
  setAlertMessage,
  setShowAlert,
}: UserFormProps) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const [nextId, setNextId] = useState<number>(0);
  const [name, setName] = useState<string>(user?.name ?? "");
  const [gender, setGender] = useState<string>(user?.gender ?? "male");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [status, steStatus] = useState<string>(user?.status ?? "");
  const [errors, seterrors] = useState<any>({});

  useEffect(() => {
    setNextId(Math.max(...users.users.map((user: User) => user.id)) + 1);
  }, [users]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) seterrors({ ...errors, name: null });
    setName(e.target.value);
  };

  const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    steStatus(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()))
      seterrors({ ...errors, email: null });
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let error: any = {};
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name.length < 3) {
      seterrors((prev: any) => ({
        ...prev,
        name: "The name must contain at least 3 characters",
      }));
      error.name = "The name must contain at least 3 characters";
    }
    if (!re.test(String(email).toLowerCase())) {
      seterrors((prev: any) => ({
        ...prev,
        email: "The email must be valid",
      }));
      error.email = "The email must be valid";
    }
    if (error.name || error.gender || error.email) return;
    if (user) {
      const changeUser: User = {
        id: user.id,
        name,
        gender,
        email,
        status,
      };
      dispatch(editUser(changeUser));
      setShowUpdateUser(false);
      setShowAlert(true);
      setAlertMessage("User edited successfully!");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      const newUser: User = {
        id: nextId,
        name,
        gender,
        email,
        status: "active",
      };
      dispatch(addUser(newUser));
      setShowNewUser(false);
      setShowAlert(true);
      setAlertMessage("User created successfully!");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    seterrors({});
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />
      </div>
      {errors.name && <p className="error">{errors.name}</p>}
      <div className="field">
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={handleGender}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />
      </div>
      {errors.email && <p className="error">{errors.email}</p>}

      {user && (
        <div className="field">
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={handleStatus}
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
