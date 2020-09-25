import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//material ui
import { Paper, Typography, Tooltip, IconButton } from "@material-ui/core";

//dumb way to get link
import MuiLink from "@material-ui/core/Link";

//icons
import { LocationOn, ExitToApp } from "@material-ui/icons";

//styles
import styles from "./Profile.module.css";

const Profile = ({ data: { username, bio, department, image } }) => {
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
          <IconButton>
            <ExitToApp color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
};

export default Profile;
