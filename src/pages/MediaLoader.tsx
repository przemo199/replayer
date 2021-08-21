import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function MediaLoader(): JSX.Element {
  const path = useLocation().pathname;
  const [privateUrl, setPrivateUrl] = useState("");
  const [resourceType, setResourceType] = useState("");

  useEffect(() => {
    async function loadPrivateUrl() {
      const resourceId = getResourceId();
      if (resourceId) {
        const request = await fetch("/api/find", {
          method: "POST",
          body: JSON.stringify({"resourceId": resourceId})
        });
        const response = await request.json();

        const document = response.document;
        console.log(response);
        console.log(document);
        console.log(document.type);
        if (document) {
          if (document.type.includes("image")) {
            setResourceType("image");
          }

          if (document.type.includes("video")) {
            setResourceType("video");
          }

          setPrivateUrl(document.privateUrl);
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

  return (
    <React.Fragment>
      {(privateUrl && resourceType === "image") && <img className="media" src={privateUrl} alt="requested image"/>}
      {(privateUrl && resourceType === "video") && <video className="media" src={privateUrl} />}
      {!privateUrl && <h1>It looks like what you are looking for does not exist</h1>}
    </React.Fragment>
  );
}

export default MediaLoader;
