import React from "react";

//material ui
import { Grid, Typography, TextField, Button } from "@material-ui/core";

//styles
import styles from "./login.module.css";

const login = () => {
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
              name="uaername"
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              className={styles.textField}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              className={styles.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
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

export default login;
