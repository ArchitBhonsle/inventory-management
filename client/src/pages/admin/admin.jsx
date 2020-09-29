import React from 'react';
import { Link } from 'react-router-dom';

//material ui
import { Button, Grid } from '@material-ui/core';

//components
import Profile from '../../components/Profile/Profile';

//graphql
import { gql, useQuery } from '@apollo/client';

const ME_QUERY = gql`
  query {
    me {
      username
      items
      bio
      isAdmin
      department
      image
    }
  }
`;

const Admin = () => {
  const { data: meData } = useQuery(ME_QUERY);
  // console.log(medata);

  let render = null;

  if (meData && meData.me.isAdmin === true) {
    render =
      meData && meData.me !== null ? (
        <Grid container spacing={4}>
          <Grid item sm={8} xs={12}>
            <h1>Deparment Items</h1>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to={`/items`}
            >
              Items
            </Button>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile data={meData.me} />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading</h1>
      );
  } else {
    render = <h1>Not Admin</h1>;
  }

  return render;
};

export default Admin;
