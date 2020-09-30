import React, { useState, useEffect } from 'react';

//material ui
import { Grid, TextField, Button } from '@material-ui/core';

//styles
import styles from './login.module.css';

//graphql
import { gql, useMutation } from '@apollo/client';

const LOGIN_QUERY = gql`
  mutation login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password)
  }
`;

const Login = () => {
  const [ form, setForm ] = useState({
    usernameOrEmail : '',
    password        : ''
  });

  const [ error, setError ] = useState({
    errors : null
  });

  const [ runLoginQuery, { data } ] = useMutation(LOGIN_QUERY);

  const onSubmit = (e) => {
    e.preventDefault();

    runLoginQuery({
      variables : form
    });

    // console.log(data);
  };
  useEffect(
    () => {
      if (
        data &&
        (data.login === 'wrong passoword' ||
          data.login === 'neither a username or an email' ||
          data.login === 'user not found')
      ) {
        // console.log(data.Login);
        setError({ errors: 'Invalid' });
      }

      if (data && data.login === 'successfully logged in') {
        window.location = '/home';
      }
    },
    [ data ]
  );

  return (
    <div>
      <Grid container className={styles.form}>
        <Grid item sm />
        <Grid item sm>
          <form noValidate>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username / Email"
              variant="outlined"
              fullWidth
              value={form.usernameOrEmail}
              helperText={error.errors}
              error={error.errors ? true : false}
              onChange={(e) =>
                setForm({
                  ...form,
                  usernameOrEmail : e.target.value
                })}
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={form.password}
              helperText={error.errors}
              error={error.errors ? true : false}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={onSubmit}
              margin="1rem"
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
