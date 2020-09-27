import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

//material ui
import { Paper, Typography, Tooltip, IconButton } from '@material-ui/core';

//dumb way to get link
import MuiLink from '@material-ui/core/Link';

//icons
import { LocationOn, ExitToApp } from '@material-ui/icons';

//graphql
import { gql, useMutation } from '@apollo/client';

//styles
import styles from './Profile.module.css';

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const Profile = ({ data: { username, bio, department, image } }) => {
  const [ logout, { data, client } ] = useMutation(LOGOUT_MUTATION);
  const history = useHistory();

  useEffect(
    () => {
      if (data) {
        if (data.logout === 'logged out') {
          client.clearStore();
          history.push('/');
        } else if (data.logout === 'unknown error please try again') {
          // handle error
        }
      }
    },
    [ data, client ]
  );

  return (
    <Paper className={styles.paper}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img src={image} alt="profilepic" />
        </div>
        <hr className={styles.hruler} />
        <div className={styles.profileDetails}>
          <MuiLink component={Link} color="primary" variant="h5">
            {username}
          </MuiLink>
          <hr />

          <Fragment>
            <Typography variant="body2">{bio}</Typography>
            <hr />
          </Fragment>

          <Fragment>
            <LocationOn color="primary" /> <span>{department}</span>
            <hr />
          </Fragment>
        </div>
        <Tooltip title="Logout" placement="right">
          <IconButton onClick={logout}>
            <ExitToApp color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
};

export default Profile;
