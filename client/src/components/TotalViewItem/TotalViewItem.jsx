import React from "react";

//material ui
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//styles
import styles from "./TotalViewItem.module.css";

const TotalViewItem = ({
  data: { name, location, image, history, id, department },
}) => {
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
          ID #{id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalViewItem;
