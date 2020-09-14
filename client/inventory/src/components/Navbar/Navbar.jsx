import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//material ui
import {
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import App from "../../App";

//styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navbar = (
    <Fragment>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
      <Button component={Link} to="/" color="inherit">
        Home
      </Button>
    </Fragment>
  );

  return (
    <AppBar>
      <Toolbar className={styles.container}>{navbar}</Toolbar>
    </AppBar>
  );
};

export default Navbar;
