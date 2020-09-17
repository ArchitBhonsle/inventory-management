import React, { useState, useEffect } from "react";

//material ui
import { Grid, Typography, TextField, Button } from "@material-ui/core";

//styles
import styles from "./login.module.css";

//graphql
import { gql, useLazyQuery } from "@apollo/client";

const LOGIN_QUERY = gql`
  query login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password)
  }
`;

const Login = () => {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [runLoginQuery, { data }] = useLazyQuery(LOGIN_QUERY);

  const onSubmit = (e) => {
    e.preventDefault();
    runLoginQuery({
      variables: form,
    });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <Grid container className={styles.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={styles.pageTitle}>
            Login
          </Typography>
          <form noValidate>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username / Email"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.usernameOrEmail}
              onChange={(e) =>
                setForm({
                  ...form,
                  usernameOrEmail: e.target.value,
                })
              }
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={onSubmit}
            >
              Login
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
};

export default Login;
