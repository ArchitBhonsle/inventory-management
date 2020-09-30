import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

//material ui
import { AppBar, Toolbar, Button } from '@material-ui/core';

//graphql
import { gql, useQuery, useMutation } from '@apollo/client';

//styles
import styles from './Navbar.module.css';

const ME_QUERY = gql`
  query {
    me {
      username
      items
      bio
      department
      image
      isAdmin
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const Navbar = () => {
  const { data } = useQuery(ME_QUERY);
  const [ logout, { data: logoutData, client } ] = useMutation(LOGOUT_MUTATION);

  useEffect(
    () => {
      if (logoutData) {
        if (logoutData.logout === 'logged out') {
          client.clearStore();
          window.location = '/';
        } else if (logoutData.logout === 'unknown error please try again') {
          // handle error
        }
      }
    },
    [ logoutData, client ]
  );

  // console.log(data);

  let navbar = null;

  if (data !== undefined && data.me !== null && data.me.isAdmin === true) {
    navbar = (
      <Fragment>
        <Button component={Link} to="/adminregister" color="inherit">
          Add User
        </Button>
        <Button component={Link} to="/items" color="inherit">
          Items
        </Button>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Fragment>
    );
  } else if (
    data !== undefined &&
    data.me !== null &&
    data.me.isAdmin === false
  ) {
    navbar = (
      <Fragment>
        <Button component={Link} to="/home" color="inherit">
          Home
        </Button>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Fragment>
    );
  } else {
    navbar = (
      <Fragment>
        <Button component={Link} to="/" color="inherit">
          Login
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
