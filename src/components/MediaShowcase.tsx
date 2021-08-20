import React, {useEffect, useState} from "react";

const imageSizeLimit = 10 * 1000 * 1000;
const videoSizeLimit = 100 * 1000 * 1000;

function MediaShowcase(props: { file: File }): JSX.Element {
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    getFileContent();
  }, [props.file]);

  const getFileContent = () => {
    if ((props.file.type.includes("image") && props.file.size <= imageSizeLimit) ||
      (props.file.type.includes("video") && props.file.size <= videoSizeLimit)) {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target?.result) {
          setFileContent(event.target.result.toString());
        }
      };
      reader.readAsDataURL(props.file);
    }
  };

  if (props.file.type.includes("image")) {
    if (props.file.size < imageSizeLimit) {
      return (
        <React.Fragment>
          {fileContent && <img className="selected-media" src={fileContent} alt="selected media"/>}
          {!fileContent && <h1>Loading...</h1>}
        </React.Fragment>
      );
    } else {
      return <h1>File too large</h1>;
    }
  } else if (props.file.type.includes("video")) {
    if (props.file.size < videoSizeLimit) {
      return (
        <React.Fragment>
          {props.file.type.includes("video") && fileContent &&
            <video className="selected-media" src={fileContent} autoPlay muted loop/>}
          {!fileContent && <h1>Loading...</h1>}
        </React.Fragment>
      );
    } else {
      return <h1>File too large</h1>;
    }
  }
  return <h1>Loading...</h1>;
}

export default MediaShowcase;
