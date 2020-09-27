import React from "react";

//material ui
import { Grid } from "@material-ui/core";

//components
import Profile from "../../components/Profile/Profile";
import AdminItem from "../../components/AdminItem/AdminItem";
import AdminSelector from "../../components/AdminSelector/AdminSelector";
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
  console.log(medata);
  const department = medata?.me?.department;
  const { data: depti } = useQuery(DEPTITEM_QUERY, {
    skip: !department,
    variables: { department },
  });

  // console.log(depti);
  let items = null;

  if (depti && depti.getItemsByDepartment) {
    items = depti.getItemsByDepartment.map((obj, i) => {
      return <AdminItem data={depti.getItemsByDepartment[i]} />;
    });
  }

  let render = null;

  if (medata && medata.me.isAdmin === true) {
    render =
      depti && depti.getItemsByDepartment && medata && medata.me !== null ? (
        <Grid container spacing={4}>
          <Grid item sm={8} xs={12}>
            <h1>Add Items</h1>
            <AdminAddItem />
            <h1>Department items</h1>
            <AdminSelector />
            {items}
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
