import React from "react";

//material ui
import { Grid } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import AdminAddItem from "../../components/AdminAddItem/AdminAddItem";

//graphql
import { gql, useQuery } from "@apollo/client";

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

const DEPTITEM_QUERY = gql`
  query getItemsByDepartment($department: String!) {
    getItemsByDepartment(department: $department) {
      id
      name
      location
      image
      history {
        name
        timeOfTransfer
      }
    }
  }
`;

const Admin = () => {
  const { data: medata } = useQuery(ME_QUERY);
  // console.log(medata);

  let render = null;

  if (medata && medata.me.isAdmin === true) {
    render =
      medata && medata.me !== null ? (
        <Grid container spacing={4}>
          <Grid item sm={8} xs={12}>
            <h1>Add Items</h1>
            <AdminAddItem />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile data={medata.me} />
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
