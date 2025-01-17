import React from 'react';
import { Link } from 'react-router-dom';

//material ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//styles
import styles from './AdminItem.module.css';

const AdminItem = ({
  data : { name, location, image, history, id, department }
}) => {
  return (
    <Card className={styles.root}>
      <CardActionArea component={Link} to={`totalview/${id}`}>
        <CardMedia className={styles.media} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {department}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AdminItem;
