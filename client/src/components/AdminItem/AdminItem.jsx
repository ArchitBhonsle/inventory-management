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
import styles from "./AdminItem.module.css";

const AdminItem = () => {
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          image="https://www.techbooky.com/wp-content/uploads/2020/06/1200px-Google_Photos_icon_2020.svg.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Gun
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Discription
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Current Department
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            #id
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          History
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminItem;
