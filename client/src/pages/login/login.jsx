import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//material ui
import { Grid, Typography, TextField, Button } from "@material-ui/core";

//styles
import styles from "./login.module.css";

//graphql
import { gql, useMutation } from "@apollo/client";

const LOGIN_QUERY = gql`
  mutation login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password)
  }
`;

const Login = () => {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: null,
  });

  const [runLoginQuery, { data }] = useMutation(LOGIN_QUERY);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    runLoginQuery({
      variables: form,
    });

    // console.log(data);
  };
  useEffect(() => {
    if (
      data &&
      (data.login === "wrong passoword" ||
        data.login === "neither a username or an email" ||
        data.login === "user not found")
    ) {
      // console.log(data.Login);
      setError({ errors: "Invalid" });
    }

    if (data && data.login === "successfully logged in") {
      window.location = "/home";
    }

    if (data) {
      console.log(data);
    }
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
              helperText={error.errors}
              error={error.errors ? true : false}
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
              helperText={error.errors}
              error={error.errors ? true : false}
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
