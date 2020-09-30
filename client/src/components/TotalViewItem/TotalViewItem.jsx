import React from 'react';

//material ui
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

//styles
import styles from './TotalViewItem.module.css';

const TotalViewItem = ({
  data : { name, location, image, id, department, description }
}) => {
  return (
    <Card className={styles.root}>
      <CardMedia className={styles.media} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h4" component="h">
          {name}
        </Typography>
        <Typography variant="h6" color="textPrimary" component="h1">
          ID: {id}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Department: {department}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalViewItem;
