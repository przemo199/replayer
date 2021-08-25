import React from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar(): JSX.Element {
  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/">replayer</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/browse">Browse</Link>
    </Navbar>
  );
}

export default NavBar;
