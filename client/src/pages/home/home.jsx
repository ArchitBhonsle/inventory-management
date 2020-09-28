import React from "react";
import { Link } from "react-router-dom";

//material ui
import { Button, Grid, Paper } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import List from "../../components/List/List";

//graphql
import { gql, useQuery } from "@apollo/client";

//styles
import styles from "./home.module.css";

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

const MEITEMS_QUERY = gql`
  query getUsersItems($uoe: String!) {
    getUsersItems(usernameOrEmail: $uoe) {
      id
      name
      category
    }
  }
`;

const Home = () => {
  const { data: medata } = useQuery(ME_QUERY);
  const uoe = medata?.me?.username;
  const { data: itemdata } = useQuery(MEITEMS_QUERY, {
    skip: !uoe,
    variables: { uoe },
  });

  let list = null;

  if (
    itemdata &&
    itemdata.getUsersItems &&
    medata !== undefined &&
    medata.me !== null
  ) {
    list = itemdata.getUsersItems.map((obj) => {
      // console.log(obj);
      return <List data={obj} username={medata.me.username} />;
    });
  }

  let render = null;

  if (medata !== undefined && medata.me !== null) {
    render = medata ? (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          <h1>Current Items</h1>
          <Paper>{list}</Paper>
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
