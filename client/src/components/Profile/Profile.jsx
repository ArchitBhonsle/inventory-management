import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//material ui
import {
  Paper,
  Typography,
  Tooltip,
  IconButton,
  requirePropFactory,
} from "@material-ui/core";

//dumb way to get link
import MuiLink from "@material-ui/core/Link";

//icons
import { LocationOn, ExitToApp } from "@material-ui/icons";

//styles
import styles from "./Profile.module.css";

const Profile = () => {
  const dummyimg =
    "data:image/png;base64,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";
  return (
    <Paper className={styles.paper}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <img src={dummyimg} alt="profilepic" />
        </div>
        <hr className={styles.hruler} />
        <div className={styles.profileDetails}>
          <MuiLink component={Link} color="primary" variant="h5">
            dion
          </MuiLink>
          <hr />

          <Fragment>
            <Typography variant="body2">Bio</Typography>
            <hr />
          </Fragment>

          <Fragment>
            <LocationOn color="primary" /> <span>Department</span>
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
