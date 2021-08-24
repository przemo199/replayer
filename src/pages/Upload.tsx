import React, {useRef, useState} from "react";
import MediaShowcase from "../components/MediaShowcase";
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

const cloudName = "replayer-store";
const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
const acceptedFormats = ".jpg, .png, .gif, .bmp, .mp4, .mkv, .webp";
const uploadPreset = "replayer_preset";
const apiSaveEndpoint = "/api/save";

function Upload(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileSelector = useRef<HTMLInputElement>(null);

  const getFile = () => {
    if (fileSelector.current) {
      fileSelector.current.click();
    }
  };

  const retrieveFile = () => {
    if (fileSelector.current?.files && fileSelector.current.files.length > 0) {
      setFile(fileSelector.current.files[0]);
    }
  };

  const sendFile = async () => {
    if (file) {
      const start = (new Date()).getTime();
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const request = await fetch(cloudinaryEndpoint, {
        method: "POST",
        body: formData
      });

      const response = await request.json();

      if (response.asset_id) {
        const req = await fetch(apiSaveEndpoint, {
          method: "POST",
          body: JSON.stringify({
            "privateUrl": response.secure_url,
            "name": file.name,
            "type": file.type,
            "size": file.size
          })
        });

        const res = await req.json();

        setFileUrl("/watch/" + res.resourceId);
        setFile(null);
        const end = (new Date()).getTime();
        console.log("Uploaded in " + (end - start) + "ms");
      }
      setIsUploading(false);
    }
  };

  return (
    <React.Fragment>
      {fileUrl &&
      <div>
        <p>You can access your media here:</p>
        <Link to={fileUrl}>{" " + window.location.origin +  fileUrl}</Link>
      </div>
      }
      <div className="selector-container" onClick={getFile}>
        <input type="file" className="file-selector" accept={acceptedFormats} ref={fileSelector}
          onChange={retrieveFile} />
        {!file && <h1>+</h1>}
        {file && <MediaShowcase file={file} />}
        {isUploading &&
        <div className="loading-screen">
          <h1>
            Uploading...
          </h1>
        </div>
        }
      </div>

      {file &&
      <Button className="btn-primary" onClick={sendFile}>
        Send file
      </Button>
      }
    </React.Fragment>
  );
}

export default Upload;
