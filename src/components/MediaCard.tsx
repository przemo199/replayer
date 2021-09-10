import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MediaResource} from "../interfaces";

function MediaCard(props: MediaResource): JSX.Element {
  return (
    <Card className="media-card">
      {props.type.includes("video") && <video src={props.privateUrl} />}
      {props.type.includes("image") && <img alt={props.name} src={props.privateUrl} />}
      <Link to={`/watch/${props.resourceId}`}>
        <Card.Title>{props.name}</Card.Title>
      </Link>
    </Card>
  );
}

export default MediaCard;
