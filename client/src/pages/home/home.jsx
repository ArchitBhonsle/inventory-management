import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//material ui
import { Button, Grid, Paper } from '@material-ui/core';

//components
import Profile from '../../components/Profile/Profile';

import TotalViewItem from '../../components/TotalViewItem/TotalViewItem';

//graphql
import { gql, useQuery } from '@apollo/client';

//styles
import styles from './home.module.css';

const ME_QUERY = gql`
  query {
    me {
      username
      items
      bio
      department
      image
      isAdmin
    }
  }
`;

const MY_ITEMS_QUERY = gql`
  query {
    myItems {
      id
      name
      department
      image
    }
  }
`;

const Home = () => {
  const { data: medata } = useQuery(ME_QUERY);
  // const uoe = medata?.me?.username;
  const { data: itemData } = useQuery(MY_ITEMS_QUERY);

  let list = null;

  if (itemData && itemData.myItems) {
    list = itemData.myItems.map((obj) => {
      // console.log(obj);
      return <TotalViewItem key={obj.id} data={obj} />;
    });
  }

  useEffect(
    () => {
      if (itemData) {
        console.log(itemData);
      }
    },
    [ itemData ]
  );

  let render = null;

  if (medata !== undefined && medata.me !== null) {
    render = medata ? (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          <h1>Current Items</h1>
          {list}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile data={medata.me} />
        </Grid>
      </Grid>
    ) : (
      <h1>Loading</h1>
    );
  } else {
    render = (
      <div className={styles.main}>
        <Paper>
          <h1>Please Log In</h1>
          <Button component={Link} to="/" color="secondary" variant="outlined">
            Log In
          </Button>
        </Paper>
      </div>
    );
  }

  return render;
};

export default Home;
