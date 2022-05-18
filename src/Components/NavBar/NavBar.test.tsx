import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  test("Renders Content", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );
  });
  test("Link to ToDo List", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );
    expect(screen.getAllByText("ToDo List")).toHaveLength(2);
  });
  test("Link to ABM Users", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );
    expect(screen.getAllByText("ABM Users")).toHaveLength(2);
  });
});
