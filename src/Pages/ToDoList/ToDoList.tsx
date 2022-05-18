import { GetInitialTasks } from "../../Services/toDoListServices";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { add, change, remove } from "../../Features/tasksSlice";
import { Task } from "../../Interfaces";
import Check from "../../assets/check.svg";
import Plus from "../../assets/plus.svg";
import Trash from "../../assets/trash.svg";
import "./ToDoList.css";
import ModalTaskDelete from "../../Components/Tasks/ModalDelete";
import Alerts from "../../Components/Alerts/Alerts";
import Spinner from './../../Components/Spinner/Spinner';

export default function ToDoList() {
  const { loading } = GetInitialTasks();
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<"pending" | "completed">("pending");
  const [addTask, setAddTask] = useState<string>("");
  const [pending, setPending] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const [nextId, setNextId] = useState<number>(0);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    const filterPending = tasks.filter(
      (task: Task) => task.status === "pending"
    );
    setPending(filterPending);
    const filterCompleted = tasks.filter(
      (task: Task) => task.status === "completed"
    );
    setCompleted(filterCompleted);
    setNextId(Math.max(...tasks.map((task: Task) => task.id)) + 1);
  }, [tasks]);

  const handleAddTask = () => {
    if (addTask.length === 0) return;
    const newTask: Task = {
      title: addTask,
      status: "pending",
      id: nextId,
    };
    setNextId((currentId) => currentId + 1);
    dispatch(add(newTask));
    setAddTask("");
    setShowAlert(true);
    setAlertMessage("Task created successfully!");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleChangeStatus = (task: Task) => {
    const newTask = {
      ...task,
      status: task.status === "pending" ? "completed" : "pending",
    };
    dispatch(change(newTask));
  };

  const handleDeleteTask = (task: Task) => {
    dispatch(remove(task));
    setDeleteTask(null);
    setShowAlert(true);
    setAlertMessage("Task deleted successfully!");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const showModalDelete = (task: Task) => {
    setDeleteTask(task);
  };

  return (
    <div className="toDoList">
      <h2>To Do List</h2>

      <div className="addTasks">
        <input
          type="text"
          placeholder="Add Task"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
        <div className="add__btn" onClick={handleAddTask}>
          <img src={Plus} alt="plusIcon" />
        </div>
      </div>
      <div className="toDoList__content">
        <div className="buttonsFilter">
          <p
            className={`filterTasks ${filter === "pending" && "select"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </p>
          <p
            className={`filterTasks ${filter === "completed" && "select"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </p>
        </div>
        {
          loading && <Spinner />
        }
        <div className="toDoList__content__tasks">
          {filter === "pending" && (
            <>
              {pending?.map((task) => {
                return (
                  <div className="task" key={task.id}>
                    <div
                      className="checkBox"
                      onClick={() => handleChangeStatus(task)}
                    ></div>
                    <p>{task.title}</p>
                    <div
                      className="delete__btn"
                      onClick={() => showModalDelete(task)}
                    >
                      <img src={Trash} alt="trashIcon" />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {filter === "completed" && (
            <>
              {completed?.map((task) => {
                return (
                  <div className="task" key={task.id}>
                    <div
                      className="checkBox checked"
                      onClick={() => handleChangeStatus(task)}
                    >
                      <img src={Check} alt="check-icon" />
                    </div>
                    <p>{task.title}</p>
                    <div
                      className="delete__btn"
                      onClick={() => showModalDelete(task)}
                    >
                      <img src={Trash} alt="trashIcon" />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {deleteTask && (
        <ModalTaskDelete
          deleteTask={deleteTask}
          setDeleteTask={setDeleteTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}

      {showAlert && <Alerts message={alertMessage} />}
    </div>
  );
}
