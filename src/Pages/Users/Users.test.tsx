import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../jest/test-utils";
import Users from "./Users";

describe("Users Page", () => {
  test("Renders Content", () => {
    render(<Users />);
  });
});
