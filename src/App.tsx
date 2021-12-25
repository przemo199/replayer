import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import UploadPage from "./pages/UploadPage";
import MediaViewer from "./pages/MediaViewer";
import WelcomePage from "./pages/WelcomePage";
import SearchPage from "./pages/SearchPage";

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes>
            <Route path="/watch/:id" element={<MediaViewer />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
