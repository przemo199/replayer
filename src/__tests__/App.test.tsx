import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";


describe("welcome screen tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders replayer link correct", () => {
    const logoElement = screen.getByText("replayer");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders Welcome screen correct", () => {
    const welcomeElement = screen.getByText("Welcome!");
    expect(welcomeElement).toBeInTheDocument();
  });

  test("renders link to source of this project correct", () => {
    const linkElement = screen.getByText("here");
    expect(linkElement).toBeInTheDocument();
  });
});
