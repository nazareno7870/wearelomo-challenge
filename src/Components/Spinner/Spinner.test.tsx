import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Spinner from './Spinner';

describe("Spinner Component", () => {
  test("Renders Content", () => {
    render(<Spinner/>);
  });
});
