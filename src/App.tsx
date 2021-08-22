import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Upload from "./pages/Upload";
import MediaViewer from "./pages/MediaViewer";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Switch>
            <Route path="/watch">
              <MediaViewer />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
