import React, { Fragment, useEffect } from "react";

//material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import styles from "./HistoryItem.module.css";
const HistoryItem = ({
  data: { name, timeOfTransfer },
  additiondata: { id, image, location },
}) => {
  return (
    <div className={styles.main}>
      <Card className={styles.root}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {id}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {location}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {timeOfTransfer}
            </Typography>
          </CardContent>
        </div>

        <CardMedia
          className={styles.cover}
          image={image}
          title="Live from space album cover"
        />
      </Card>
    </div>
  );
};

export default HistoryItem;
