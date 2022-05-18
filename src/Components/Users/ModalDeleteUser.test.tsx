import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ModalDeleteUser from "./ModalDeleteUser";
const user = {
  id: 1,
  name: "test",
  email: "correo@correo.com",
  gender: "male",
  status: "active",
};

describe("Modal Delete User Component", () => {
  test("Renders Content", () => {
    const component = render(
      <ModalDeleteUser
        deleteUser={user}
        setDeleteUser={jest.fn()}
        handleDeleteUser={jest.fn()}
      />
    );
    expect(component.container).toHaveTextContent(
      "Are you sure you want to delete this user?"
    );
  });
});
