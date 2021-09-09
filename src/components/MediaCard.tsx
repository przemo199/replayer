import React from "react";
import {Resource} from "../interfaces";
import {Card} from "react-bootstrap";

function MediaCard(props: Resource): JSX.Element {
  return (
    <Card className="media-card">
      {props.type.includes("video") && <video src={props.privateUrl} />}
      {props.type.includes("image") && <img alt={props.name} src={props.privateUrl} />}
      <Card.Title>{props.name}</Card.Title>
    </Card>
  );
}

export default MediaCard;
