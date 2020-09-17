import React, { Fragment } from "react";

//material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import styles from "./history.module.css";

const history = () => {
  return (
    <Fragment>
      <h1>Item History</h1>
      <div className={styles.main}>
        <Card className={styles.root}>
          <div className={styles.details}>
            <CardContent className={styles.content}>
              <Typography component="h5" variant="h5">
                Gunsdnaosdao
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                id
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                department
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                date
              </Typography>
            </CardContent>
          </div>

          <CardMedia
            className={styles.cover}
            image="https://www.techbooky.com/wp-content/uploads/2020/06/1200px-Google_Photos_icon_2020.svg.png"
            title="Live from space album cover"
          />
        </Card>
      </div>
      <div className={styles.main}>
        <Card className={styles.root}>
          <div className={styles.details}>
            <CardContent className={styles.content}>
              <Typography component="h5" variant="h5">
                Heavy motor vehicle
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                id
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                department
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                date
              </Typography>
            </CardContent>
          </div>

          <CardMedia
            className={styles.cover}
            image="https://www.techbooky.com/wp-content/uploads/2020/06/1200px-Google_Photos_icon_2020.svg.png"
            title="Live from space album cover"
          />
        </Card>
      </div>
    </Fragment>
  );
};

export default history;
