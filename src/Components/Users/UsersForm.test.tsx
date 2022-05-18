import "@testing-library/jest-dom/extend-expect";
import UsersForm from "./UsersForm";
import { render, screen, fireEvent } from "../../../jest/test-utils";

describe("Users Form Component", () => {
  const setShowNewUser = jest.fn();
  const setShowUpdateUser = jest.fn();
  const setAlertMessage = jest.fn();
  const setShowAlert = jest.fn();
  test("Renders Content", () => {
    render(
      <UsersForm
        setShowNewUser={setShowNewUser}
        setShowUpdateUser={setShowUpdateUser}
        setAlertMessage={setAlertMessage}
        setShowAlert={setShowAlert}
      />
    );
  });
  test("Submit Form", () => {
    const setShowNewUser = jest.fn();
    const setShowUpdateUser = jest.fn();
    const setAlertMessage = jest.fn();
    const setShowAlert = jest.fn();
    render(
      <UsersForm
        setShowNewUser={setShowNewUser}
        setShowUpdateUser={setShowUpdateUser}
        setAlertMessage={setAlertMessage}
        setShowAlert={setShowAlert}
      />
    );
    const name = screen.getByRole("textbox", {
      name: /name:/i,
    });
    const email = screen.getByRole("textbox", {
      name: /email:/i,
    });
    const submit = screen.getByRole("button", {
      name: /submit/i,
    });
    fireEvent.change(name, { target: { value: "John" } });
    fireEvent.change(email, { target: { value: "correo@correo.com" } });
    fireEvent.click(submit);

    expect(setShowNewUser).toHaveBeenCalledTimes(1);
    expect(setShowUpdateUser).toHaveBeenCalledTimes(0);
    expect(setAlertMessage).toHaveBeenCalledTimes(1);
    expect(setShowAlert).toHaveBeenCalledTimes(1);
  });
});
