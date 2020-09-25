import React, { useState, useEffect } from "react";

//material ui
import { Grid, Paper } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import List from "../../components/List/List";

//graphql
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      username
      items
      bio
      department
      image
    }
  }
`;

const Home = () => {
  const { data } = useQuery(ME_QUERY);

  console.log(data);

  const render = data ? (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        <h1>Current Items</h1>
        <Paper>
          <List />
        </Paper>
        <h1>Department Items</h1>
        <Paper>
          <List />
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile data={data.me} />
      </Grid>
    </Grid>
  ) : (
    <h1>Loading</h1>
  );

  return render;
};

export default Home;
