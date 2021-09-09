import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {MediaResource} from "../interfaces";

const apiGetEndpoint = "/api/get";

function MediaViewer(): JSX.Element {
  const path = useLocation().pathname;
  // @ts-ignore
  const {id} = useParams<string>();
  const [resource, setResource] = useState<MediaResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPrivateUrl() {
      setIsLoading(true);
      const resourceId = getResourceId();
      if (resourceId) {
        const request = await fetch(apiGetEndpoint, {
          method: "POST",
          body: JSON.stringify({"resourceId": id})
        });

        const response = await request.json();
        const document = response.result;

        if (document) {
          setResource(document);
          setIsLoading(false);
        }
      }
    }

    fetchPrivateUrl();
  }, [path]);

  const getResourceId = (): string => {
    const elems = path.split("/");
    if (elems.length === 3) {
      return elems[elems.length - 1];
    }
    return "";
  };

  const calculateISODate = (r: MediaResource): string => {
    return (new Date(parseInt(r._id.toString().substring(0,8), 16) * 1000)).toISOString();
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
          <p className="inline">File name: {resource.name} </p>
          &nbsp;
          &nbsp;
          <p className="inline">File type: {resource.type} </p><br />
          <p className="inline">File size: {calculateFileSize(resource)} </p>
          &nbsp;
          &nbsp;
          <p className="inline">Upload timestamp: {calculateISODate(resource)} </p>
        </div>
      }
      {!resource && !isLoading && <h1>It looks like the resource you are looking for does not exist</h1>}
      {!resource && isLoading && <h1>Loading..</h1>}
    </React.Fragment>
  );
}

export default MediaViewer;
