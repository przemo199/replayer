import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";


describe("welcome screen tests", () => {
  beforeAll(() => {
    render(<App />);
  });

  test("renders replayer link correct", () => {
    const logoElement = screen.getByText("replayer");
    expect(logoElement).toBeInTheDocument();
  });

  test("renders Welcome screen correct", () => {
    render(<App />);
    const navElement = screen.getByText("Welcome!");
    expect(navElement).toBeInTheDocument();
  });

  test("renders link to source of this project correct", () => {
    render(<App />);
    const navElement = screen.getByText("here");
    expect(navElement).toBeInTheDocument();
  });
});
