import React, { useState, useEffect, Fragment } from "react";

//material ui
import { Grid, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//components
import AdminItem from "../../components/AdminItem/AdminItem";

//graphql
import { gql, useQuery, useLazyQuery } from "@apollo/client";

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
      department
      image
      history {
        name
        timeOfTransfer
      }
    }
  }
`;

const CAT_QUERY = gql`
  query getItemsByDepartmentAndCategory(
    $category: String!
    $department: String!
  ) {
    getItemsByDepartmentAndCategory(
      category: $category
      department: $department
    ) {
      id
      name
      location
      department
    }
  }
`;

const Items = () => {
  const [cat, setCat] = useState({
    category: "",
  });

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

  const [runcatqry, { data: catitems }] = useLazyQuery(CAT_QUERY, {
    skip: !department,
  });

  const [cat1, setcat] = useState("");

  const catqryvars = {
    category: cat1,
    department,
  };

  // console.log(cat1);

  return (
    <Fragment>
      <Typography variant="h3" color="textSecondary" className={styles.header}>
        <FormControl className={styles.formControl}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            onChange={(e) => {
              setcat(e.target.value);
            }}
            value={cat1}
          >
            <MenuItem value="fire arm">firearm</MenuItem>
            <MenuItem value="dummy">dummy</MenuItem>
            <MenuItem value="dion">dion</MenuItem>
          </Select>
        </FormControl>
      </Typography>

      <Grid container spacing={4}>
        {item}
      </Grid>
    </Fragment>
  );
};

export default Items;
