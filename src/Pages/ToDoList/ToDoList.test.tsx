import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "../../../jest/test-utils";
import ToDoList from "./ToDoList";

describe("ToDo List Page", () => {
  test("Renders Content", () => {
    render(<ToDoList />);
  });
  test("Add ToDo", () => {
    render(<ToDoList />);
    const addTask = screen.getByRole("textbox");
    const addButton = screen.getByRole("img", {
      name: /plusicon/i,
    });
    fireEvent.change(addTask, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
  });
});
