import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//material ui
import { AppBar, Toolbar, Button } from "@material-ui/core";

//styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navbar = (
    <Fragment>
      <Button component={Link} to="/" color="inherit">
        Login
      </Button>
      <Button component={Link} to="/home" color="inherit">
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
