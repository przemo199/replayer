import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MediaResource} from "../interfaces";

function MediaCard(props: MediaResource): JSX.Element {
  const getReadableDate = (resource: MediaResource): string => {
    const date = (new Date(parseInt(resource._id.toString().substring(0,8), 16) * 1000)).toISOString();
    return date.substring(0, 19).replace(/[A-Z]/, " ").replaceAll("-", "/");
  };

  return (
    <Card className="media-card">
      {props.type.includes("video") && <video src={props.privateUrl} />}
      {props.type.includes("image") && <img alt={props.name} src={props.privateUrl} />}
      <Link to={`/watch/${props.resourceId}`} style={{textDecoration: "none", color: "white"}}>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text style={{fontSize: "0.9rem"}}>Uploaded on: {getReadableDate(props)}</Card.Text>
      </Link>
    </Card>
  );
}

export default MediaCard;
