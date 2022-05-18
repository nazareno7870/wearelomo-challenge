import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ModalTaskDelete from "./ModalDelete";
const task = {
  id: 1,
  title: "test",
  status: "pending",
};
describe("Modal Task Delete Component", () => {
  test("Renders Content", () => {
    const component = render(
      <ModalTaskDelete
        deleteTask={task}
        setDeleteTask={jest.fn()}
        handleDeleteTask={jest.fn()}
      />
    );
    expect(component.container).toHaveTextContent(
      "Are you sure you want to delete this task?"
    );
  });
});
