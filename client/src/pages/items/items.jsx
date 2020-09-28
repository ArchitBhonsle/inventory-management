import React, { Fragment } from "react";

//material ui
import { Grid, Typography } from "@material-ui/core";

//components
import AdminItem from "../../components/AdminItem/AdminItem";
import AdminSelector from "../../components/AdminSelector/AdminSelector";

//graphql
import { gql, useQuery } from "@apollo/client";

//styles
import styles from "./items.module.css";

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

const Items = () => {
  const { data: medata } = useQuery(ME_QUERY);
  // console.log(medata);
  const department = medata?.me?.department;
  const { data: depti } = useQuery(DEPTITEM_QUERY, {
    skip: !department,
    variables: { department },
  });

  let item = null;

  if (depti && depti.getItemsByDepartment) {
    item = depti.getItemsByDepartment.map((obj, i) => {
      return <AdminItem data={depti.getItemsByDepartment[i]} />;
    });
  }

  return (
    <Fragment>
      <Typography variant="h3" color="textSecondary" className={styles.header}>
        <AdminSelector />
      </Typography>

      <Grid container spacing={4}>
        {item}
      </Grid>
    </Fragment>
  );
};

export default Items;
