import React, {useRef, useState} from "react";
import "./App.css";
import MediaShowcase from "./components/MediaShowcase";
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const cloudName = "replayer-store";
const apiEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
const acceptedFormats = ".jpg, .png, .gif, .bmp, .mp4, .mkv, .webp";
const uploadPreset = "replayer_preset";

function App(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileSelector = useRef<HTMLInputElement>(null);

  const getFile = () => {
    if (fileSelector.current) {
      fileSelector.current.click();
    } else {
      alert("no file selector found");
    }
  };

  const retrieveFile = () => {
    if (fileSelector.current?.files && fileSelector.current.files.length > 0) {
      setFile(fileSelector.current.files[0]);
    }
  };

  const sendFile = async () => {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const request = await fetch(apiEndpoint, {
        method: "POST",
        body: formData
      });
      const response = await request.json();
      if (response.asset_id) {
        const req = await fetch("/api/save",{
          method: "POST",
          body: JSON.stringify({"privateUrl": response.secure_url})
        });

        const res = await req.json();

        setFileUrl(window.location.href + "/" + res.resourceId);
        setFile(null);
      }
      setIsUploading(false);
      console.log(response);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {fileUrl &&
          <div>
            You can access your media here:<br />
            <a className="App-link" href={fileUrl}>{" " + fileUrl}</a>
          </div>
        }
        <div className="selector-container" onClick={getFile}>
          <input type="file" className="file-selector" accept={acceptedFormats} ref={fileSelector} onChange={retrieveFile}/>
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
      </header>
    </div>
  );
}

export default App;
