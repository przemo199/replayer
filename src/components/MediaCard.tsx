import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MediaResource} from "../interfaces";
import "./MediaCard.css";

function MediaCard(props: MediaResource): JSX.Element {
  const getReadableDate = (resource: MediaResource): string => {
    const date = (new Date(parseInt(resource._id.toString().substring(0,8), 16) * 1000)).toISOString();
    return date.substring(0, 19).replace(/[A-Z]/, " ").replaceAll("-", "/");
  };

  return (
    <Card className="media-card" style={{display: "flex"}}>
      {props.type.includes("video") && <video className="card-preview" src={props.privateUrl} />}
      {props.type.includes("image") && <img className="card-preview" alt={props.name} src={props.privateUrl} />}
      <Link to={`/watch/${props.resourceId}`} className="card-body">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className="text">Uploaded on: {getReadableDate(props)}</Card.Text>
      </Link>
    </Card>
  );
}

export default MediaCard;
