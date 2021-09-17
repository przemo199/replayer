import React, {MouseEvent} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getReadableDate} from "../utils";
import {MediaResource} from "../interfaces";
import "./MediaCard.css";

function MediaCard(props: MediaResource): JSX.Element {

  const playVideo = (e: MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };

  const pauseVideo = (e: MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };

  return (
    <Card className="media-card">
      {props.type.includes("video") &&
        <video className="card-preview" src={props.privateUrl} onMouseEnter={playVideo} onMouseLeave={pauseVideo} />}
      {props.type.includes("image") && <img className="card-preview" alt={props.name} src={props.privateUrl} />}
      <Link to={`/watch/${props.resourceId}`} className="card-body">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className="text">Uploaded on: {getReadableDate(props)}</Card.Text>
      </Link>
    </Card>
  );
}

export default MediaCard;
