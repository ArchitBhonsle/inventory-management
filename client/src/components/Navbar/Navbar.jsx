import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//material ui
import { AppBar, Toolbar, Button, Tooltip } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

//graphql
import { gql, useLazyQuery, useQuery } from "@apollo/client";

//styles
import styles from "./Navbar.module.css";

const ME_QUERY = gql`
  query {
    me {
      isAdmin
    }
  }
`;

const Navbar = () => {
  const { data } = useQuery(ME_QUERY);

  console.log(data);

  let navbar = null;

  if (data != undefined && data.me != null && data.me.isAdmin === true) {
    navbar = (
      <Fragment>
        <Button component={Link} to="/" color="inherit">
          Login
        </Button>
        <Button component={Link} to="/admin" color="inherit">
          Admin
        </Button>
        <Button component={Link} to="/adminregister" color="inherit">
          <Tooltip title="Add User" placement="right">
            <AddCircleOutlineIcon />
          </Tooltip>
        </Button>
      </Fragment>
    );
  } else {
    navbar = (
      <Fragment>
        <Button component={Link} to="/" color="inherit">
          Login
        </Button>
        <Button component={Link} to="/home" color="inherit">
          Home
        </Button>
      </Fragment>
    );
  }

  return (
    <AppBar>
      <Toolbar className={styles.container}>{navbar}</Toolbar>
    </AppBar>
  );
};

export default Navbar;
