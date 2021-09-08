import React from "react";
import {Resource} from "../interfaces";
import {Card} from "react-bootstrap";

function MediaCard(props: Resource): JSX.Element {
  return (
    <Card style={{ width: "10rem" }}>
      <video src={props.privateUrl} />
      <p>{props.name}</p>
    </Card>
  );
}

export default MediaCard;
