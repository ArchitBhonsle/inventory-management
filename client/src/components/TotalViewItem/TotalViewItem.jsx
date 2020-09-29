import React from "react";

//material ui
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

//styles
import styles from "./TotalViewItem.module.css";

const TotalViewItem = ({ data: { name, location, image, id, department } }) => {
  return (
    <Card className={styles.root}>
      <CardMedia className={styles.media} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {location}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {department}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalViewItem;
