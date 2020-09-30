import React, { useState, useEffect, Fragment } from "react";

//material ui
import { Grid, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//components
import AdminItem from "../../components/AdminItem/AdminItem";
import AdminAddItem from "../../components/AdminAddItem/AdminAddItem";

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

const CAT_QUERY = gql`
  query getItemsByDepartment($department: String!) {
    getItemsByDepartment(department: $department) {
      category
    }
  }
`;

const ITEMS_QUERY = gql`
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
      image
    }
  }
`;

const Items = () => {
  const { data: meData } = useQuery(ME_QUERY);
  let department = undefined;
  if (meData && meData.me) department = meData.me.department;

  const [category, setCategory] = useState("");
  const [runItemsQuery, { data }] = useLazyQuery(ITEMS_QUERY);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (department) {
      runItemsQuery({
        variables: { department, category },
      });
    }
  }, [category, department, runItemsQuery]);

  const [runCatQuery, { data: catlist }] = useLazyQuery(CAT_QUERY);

  useEffect(() => {
    if (department) {
      runCatQuery({
        variables: { department },
      });
    }
  }, [department, runCatQuery]);

  useEffect(() => {
    if (data && data.getItemsByDepartmentAndCategory) {
      setItems(
        data.getItemsByDepartmentAndCategory.map((item, ind) => {
          return <AdminItem data={item} key={ind} />;
        })
      );
    }
  }, [data]);

  var categoryItemSet = new Set();

  let categoryItems = null;

  useEffect(() => {
    if (catlist && catlist.getItemsByDepartment) {
      catlist.getItemsByDepartment.map((item, ind) => {
        categoryItemSet.add(item.category);
      });
    }

    const categoryItemsArray = Array.from(categoryItemSet);

    categoryItems = categoryItemsArray.map((item) => {
      return <MenuItem value={item}>{item}</MenuItem>;
    });
  }, [catlist]);

  return (
    <Fragment>
      <div className={styles.additems}>
        <h1>Add Items</h1>
        <AdminAddItem />
      </div>

      <Typography variant="h3" color="textSecondary" className={styles.header}>
        <FormControl className={styles.formControl}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="item1">u</MenuItem>
            <MenuItem value="v">v</MenuItem>
            <MenuItem value="w">w</MenuItem>
            {categoryItems}
          </Select>
        </FormControl>
      </Typography>

      <Grid container spacing={4}>
        {items}
      </Grid>
    </Fragment>
  );
};

export default Items;
