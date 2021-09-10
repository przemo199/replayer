import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
          <Switch>
            <Route path="/watch/:id">
              <MediaViewer />
            </Route>
            <Route path="/upload">
              <UploadPage />
            </Route>
            <Route path="/browse">
              <SearchPage />
            </Route>
            <Route path="/">
              <WelcomePage />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
