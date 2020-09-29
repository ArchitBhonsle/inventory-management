import React, { useState, useEffect, Fragment } from 'react';

//material ui
import { Grid, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//components
import AdminItem from '../../components/AdminItem/AdminItem';

//graphql
import { gql, useQuery, useLazyQuery } from '@apollo/client';

//styles
import styles from './items.module.css';

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
    }
  }
`;

const Items = () => {
  const { data: meData } = useQuery(ME_QUERY);
  let department = undefined;
  if (meData && meData.me) department = meData.me.department;

  const [ category, setCategory ] = useState('');
  const [ runItemsQuery, { data } ] = useLazyQuery(ITEMS_QUERY);
  const [ items, setItems ] = useState(null);

  useEffect(
    () => {
      if (department) {
        runItemsQuery({
          variables : { department, category }
        });
      }
    },
    [ category, department, runItemsQuery ]
  );

  useEffect(
    () => {
      if (data && data.getItemsByDepartmentAndCategory) {
        setItems(
          data.getItemsByDepartmentAndCategory.map((item, ind) => {
            return <AdminItem data={item} key={ind} />;
          })
        );
      }
    },
    [ data ]
  );

  return (
    <Fragment>
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
