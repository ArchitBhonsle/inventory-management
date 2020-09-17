import React from "react";

//material ui
import { Grid, Paper } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import AdminItem from "../../components/AdminItem/AdminItem";

const admin = () => {
  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        <h1>Add Items</h1>
        <h1>Department items</h1>
        <AdminItem />
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default admin;
