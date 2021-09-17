import React from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Clock from "./Clock";
import "./NavBar.css";

function NavBar(): JSX.Element {
  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/">replayer</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/search">Search</Link>
      <div>
        <Clock />
      </div>
    </Navbar>
  );
}

export default NavBar;
