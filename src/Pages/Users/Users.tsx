import { useEffect, useState } from "react";
import { GetInitialUsers } from "./../../Services/usersServices";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import UsersForm from "../../Components/Users/UsersForm";
import { editUser, removeUser } from "../../Features/usersSlice";
import { User } from "../../Interfaces";
import Arrow from "../../assets/arrow.svg";
import ModalDeleteUser from "../../Components/Users/ModalDeleteUser";
import ModalForm from "../../Components/Users/ModalForm";
import Alerts from "../../Components/Alerts/Alerts";
import Spinner from "./../../Components/Spinner/Spinner";
import "./Users.css";

export default function Users() {
  const users = useSelector((state: RootState) => state.users);
  const [filter, setFilter] = useState<"active" | "inactive">("active");
  const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [showNewUser, setShowNewUser] = useState<boolean>(false);
  const [filteredUsers, setfilteredUsers] = useState<User[]>([]);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [fieldSorted, setFieldSorted] = useState("id");
  const [orderSorted, setOrderSorted] = useState("asc");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const dispatch = useDispatch();
  const { loading } = GetInitialUsers();

  useEffect(() => {
    const filterActives = users.users.filter((user: User) => {
      return user.status === filter;
    });
    if (orderSorted === "asc") {
      filterActives.sort(function (a: any, b: any) {
        if (a[fieldSorted] > b[fieldSorted]) return 1;
        if (a[fieldSorted] < b[fieldSorted]) return -1;
        return 0;
      });
    } else {
      filterActives.sort(function (a: any, b: any) {
        if (a[fieldSorted] < b[fieldSorted]) return 1;
        if (a[fieldSorted] > b[fieldSorted]) return -1;
        return 0;
      });
    }
    setfilteredUsers(filterActives);
  }, [users, fieldSorted, orderSorted, filter]);

  const handleDeleteUser = (user: User) => {
    const inactiveUser = {
      ...user,
      status: "inactive",
    };
    dispatch(removeUser(inactiveUser));
    setDeleteUser(null);
    setShowAlert(true);
    setAlertMessage("User deleted successfully!");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const showModalDelete = (user: User) => {
    setDeleteUser(user);
  };

  const handleSort = (field: string) => {
    if (fieldSorted === field) {
      setOrderSorted(orderSorted === "asc" ? "desc" : "asc");
    } else {
      setFieldSorted(field);
      setOrderSorted("asc");
    }
  };

  const handleUpdateUser = (user: User) => {
    setUserToUpdate(user);
    setShowUpdateUser(true);
  };

  const handleNewUser = () => {
    setShowNewUser(true);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "active" || e.target.value === "inactive") {
      setFilter(e.target.value);
    }
  };

  const handleReactivatedUser = (user: User) => {
    const reactivatedUser = {
      ...user,
      status: "active",
    };
    dispatch(editUser(reactivatedUser));
    setDeleteUser(null);
    setShowAlert(true);
    setAlertMessage("User reactivated successfully!");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="users">
      <h2>Users</h2>
      <div className="users__top">
        <button onClick={handleNewUser}>New User</button>
        <div className="field">
          <select
            name="status"
            id="status"
            value={filter}
            onChange={handleFilter}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      {loading && <Spinner />}
      <div className="hscroll">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                Id{" "}
                {fieldSorted === "id" && (
                  <img
                    className={`arrow ${orderSorted === "desc" && "desc"}`}
                    src={Arrow}
                    alt="arrowIcon"
                  />
                )}{" "}
              </th>
              <th onClick={() => handleSort("name")}>
                Name{" "}
                {fieldSorted === "name" && (
                  <img
                    className={`arrow ${orderSorted === "desc" && "desc"}`}
                    src={Arrow}
                    alt="arrowIcon"
                  />
                )}{" "}
              </th>
              <th onClick={() => handleSort("gender")}>
                Gender{" "}
                {fieldSorted === "gender" && (
                  <img
                    className={`arrow ${orderSorted === "desc" && "desc"}`}
                    src={Arrow}
                    alt="arrowIcon"
                  />
                )}{" "}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{" "}
                {fieldSorted === "email" && (
                  <img
                    className={`arrow ${orderSorted === "desc" && "desc"}`}
                    src={Arrow}
                    alt="arrowIcon"
                  />
                )}{" "}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="actionsBtn">
                      <button onClick={() => handleUpdateUser(user)}>
                        Edit
                      </button>
                      {user.status === "active" ? (
                        <button
                          className="btnDelte"
                          onClick={() => showModalDelete(user)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="btnReactivate"
                          onClick={() => handleReactivatedUser(user)}
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showUpdateUser && userToUpdate && (
        <ModalForm
          setShowUpdateUser={setShowUpdateUser}
          setShowNewUser={setShowNewUser}
        >
          <UsersForm
            user={userToUpdate}
            setShowUpdateUser={setShowUpdateUser}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setShowNewUser={setShowNewUser}
          />
        </ModalForm>
      )}

      {showNewUser && (
        <ModalForm
          setShowUpdateUser={setShowUpdateUser}
          setShowNewUser={setShowNewUser}
        >
          <UsersForm
            setShowUpdateUser={setShowUpdateUser}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setShowNewUser={setShowNewUser}
          />
        </ModalForm>
      )}

      {deleteUser && (
        <ModalDeleteUser
          deleteUser={deleteUser}
          handleDeleteUser={handleDeleteUser}
          setDeleteUser={setDeleteUser}
        />
      )}
      {showAlert && <Alerts message={alertMessage} />}
    </div>
  );
}
