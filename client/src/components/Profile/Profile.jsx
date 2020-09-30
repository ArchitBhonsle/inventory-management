import React from 'react';

//material ui
import { Paper, Typography } from '@material-ui/core';

//dumb way to get link
import MuiLink from '@material-ui/core/Link';

//icons
import { LocationOn } from '@material-ui/icons';

//styles
import styles from './Profile.module.css';

const Profile = ({ data: { username, bio, department, image } }) => {
  return (
    <Paper className={styles.paper}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img src={image} alt="profilepic" />
        </div>
        <hr className={styles.hruler} />
        <div className={styles.profileDetails}>
          <MuiLink color="primary" variant="h5">
            {username}
          </MuiLink>
          <hr />
          <Typography variant="body2">{bio}</Typography>
          <hr />
          <LocationOn color="primary" /> <span>{department}</span>
          <hr />
        </div>
      </div>
    </Paper>
  );
};

export default Profile;
