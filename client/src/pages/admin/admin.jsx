import React, { useState, useEffect } from "react";

//material ui
import { Grid, Paper } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import AdminItem from "../../components/AdminItem/AdminItem";
import AdminSelector from "../../components/AdminSelector/AdminSelector";
import AdminAddItem from "../../components/AdminAddItem/AdminAddItem";

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

const Admin = () => {
  const { data } = useQuery(ME_QUERY);

  let render = null;

  render =
    data && data.me != null ? (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          <h1>Add Items</h1>
          <AdminAddItem />
          <h1>Department items</h1>
          <AdminSelector />
          <AdminItem />
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

export default Admin;
