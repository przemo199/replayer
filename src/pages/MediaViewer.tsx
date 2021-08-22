import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {ObjectId} from "mongodb";

interface Resource {
  _id: ObjectId;
  privateUrl: string;
  name: string;
  type: string;
  size: number;
}

function MediaViewer(): JSX.Element {
  const path = useLocation().pathname;
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPrivateUrl() {
      setIsLoading(true);
      const resourceId = getResourceId();
      if (resourceId) {

        const request = await fetch("/api/find", {
          method: "POST",
          body: JSON.stringify({"resourceId": resourceId})
        });

        const response = await request.json();
        const document = response.result;

        if (document) {
          setResource(document);
          setIsLoading(false);
        }
      }
    }

    loadPrivateUrl();
  }, [path]);

  const getResourceId = (): string => {
    const elems = path.split("/");
    if (elems.length === 3) {
      return elems[elems.length - 1];
    }
    return "";
  };

  const getISODate = (r: Resource) => {
    return (new Date(parseInt(r._id.toString().substring(0,8), 16) * 1000)).toISOString();
  };

  return (
    <React.Fragment>
      {resource?.type.includes("image") &&
        <img className="media" src={resource.privateUrl} alt="requested image"/>}
      {resource?.type.includes("video") &&
        <video className="media" src={resource.privateUrl} autoPlay controls/>}
      {resource &&
        <div>
          <p style={{display: "inline-block"}}>name: {resource.name} </p>
          <p style={{display: "inline-block"}}>type: {resource.type} </p><br />
          <p style={{display: "inline-block"}}>size: {(Math.round(resource.size / (1024 * 1024) * 100)) / 100 + "MB"} </p>
          <p style={{display: "inline-block"}}>timestamp: {getISODate(resource)} </p>
        </div>
      }
      {!resource && !isLoading && <h1>It looks like the resource you are looking for does not exist</h1>}
      {!resource && isLoading && <h1>Loading..</h1>}
    </React.Fragment>
  );
}

export default MediaViewer;
