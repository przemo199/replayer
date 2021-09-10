import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {MediaResource} from "../interfaces";

const apiGetEndpoint = "/api/get";

function MediaViewer(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const [resource, setResource] = useState<MediaResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMediaResource() {
      setIsLoading(true);
      const request = await fetch(apiGetEndpoint, {
        method: "POST",
        body: JSON.stringify({"resourceId": id})
      });

      const response = await request.json();
      const document = response.result;

      if (document) {
        setResource(document);
      }
      setIsLoading(false);
    }

    fetchMediaResource();
  }, [id]);

  const getReadableDate = (resource: MediaResource): string => {
    const date = (new Date(parseInt(resource._id.toString().substring(0,8), 16) * 1000)).toISOString();
    return date.substring(0, 19).replace(/[A-Z]/, " ").replaceAll("-", "/");
  };

  const calculateFileSize = (r: MediaResource): string  => {
    return (Math.round(r.size / (1024 * 1024) * 100)) / 100 + "MB";
  };

  return (
    <React.Fragment>
      {resource?.type.includes("image") &&
        <img className="media" src={resource.privateUrl} alt="requested image"/>}
      {resource?.type.includes("video") &&
        <video className="media" src={resource.privateUrl} autoPlay controls/>}
      {resource &&
        <div>
          <p className="inline">File name: {resource.name}</p>
          &nbsp;
          &nbsp;
          <p className="inline">File type: {resource.type}</p>
          <br />
          <p className="inline">File size: {calculateFileSize(resource)}</p>
          &nbsp;
          &nbsp;
          <p className="inline">Uploaded on: {getReadableDate(resource)}</p>
        </div>
      }
      {!resource && !isLoading && <h1>It looks like the resource you are looking for does not exist</h1>}
      {!resource && isLoading && <h1>Loading...</h1>}
    </React.Fragment>
  );
}

export default MediaViewer;
