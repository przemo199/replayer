import React from "react";
import {Resource} from "../interfaces";
import {Card} from "react-bootstrap";

function MediaCard(props: Resource): JSX.Element {
  return (
    <Card style={{ width: "10rem" }}>
      {props.type.includes("video") && <video src={props.privateUrl} />}
      {props.type.includes("image") && <img alt={props.name} src={props.privateUrl} />}
      <Card.Title style={{backgroundColor: "rgb(35, 35, 35)"}}>{props.name}</Card.Title>
    </Card>
  );
}

export default MediaCard;
