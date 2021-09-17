import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {getReadableDate} from "../../utils";
import MediaCard from "../../components/MediaCard";
import {ObjectId} from "mongodb";

const props = {
  _id: new ObjectId("6143d700509e99204f7766a2"),
  name: "A426EE5E-688A-4B4B-8616-9A8C564B66E9.jpeg",
  privateUrl: "https://res.cloudinary.com/replayer-store/image/upload/v1631835901/replayer_resources/A426EE5E-688A-4B4B-8616-9A8C564B66E9_e5rpro.jpg",
  resourceId: "5j066qnmokg",
  size: 2478794,
  type: "image/jpeg"
};

beforeEach(() => {
  render(
    <Router>
      <MediaCard {...props}/>
    </Router>
  );
});

it("renders the name correctly", () => {
  const titleElement = screen.getByText(props.name);
  expect(titleElement).toBeInTheDocument();
});

it("renders the timestamp correctly", () => {
  const timestampElement = screen.getByText("Uploaded on: " + getReadableDate(props));
  expect(timestampElement).toBeInTheDocument();
});

it("assigns correct href", () => {
  const aElement = screen.getByText(props.name).closest("a");
  expect(aElement).toHaveAttribute("href", "/watch/" + props.resourceId);
});

it("assigns correct src", () => {
  const imgElement = screen.getByRole("img");
  expect(imgElement).toHaveAttribute("src", props.privateUrl);
});
