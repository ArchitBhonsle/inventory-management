import React from "react";

//material ui
import { Grid, Paper } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import List from "../../components/List/List";

const home = () => {
  return (
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
        <Profile />
      </Grid>
    </Grid>
  );
};

export default home;
