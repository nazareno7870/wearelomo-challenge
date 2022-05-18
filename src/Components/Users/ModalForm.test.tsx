import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import ModalForm from "./ModalForm";

describe("Modal Form Component", () => {
  test("Renders Content", () => {
    render(
      <ModalForm
        children
        setShowNewUser={jest.fn()}
        setShowUpdateUser={jest.fn()}
      />
    );
  });
});
