import React from "react";
import {render, screen} from "@testing-library/react";
import Clock from "../../components/Clock";

beforeEach(() => {
  render(<Clock />);
});

it("displays the time correctly", () => {
  const clockText = screen.getByText((new Date()).toLocaleTimeString());
  expect(clockText).toBeInTheDocument();
});
