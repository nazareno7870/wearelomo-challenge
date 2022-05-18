import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Alerts from "./Alerts";

describe("Alerts Component", () => {
  test("Renders Content", () => {
    const message = "Hello World";
    const component = render(<Alerts message={message} />);
    component.getByText(message);
  });
});
