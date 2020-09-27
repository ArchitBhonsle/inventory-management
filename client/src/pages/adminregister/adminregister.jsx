import React, { useState, useEffect } from "react";

//material ui
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//graphql
import { gql, useLazyQuery, useMutation } from "@apollo/client";

//styles
import styles from "./adminregister.module.css";

const REGISTER_MUTATION = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $image: String!
    $bio: String!
    $designation: String!
    $department: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      image: $image
      bio: $bio
      designation: $designation
      department: $department
      email: $email
      username: $username
      password: $password
    )
  }
`;

const Adminregister = () => {
  const [form, setForm] = useState({
    isAdmin: "",
    firstname: "",
    lastname: "",
    image: "",
    bio: "",
    designation: "",
    department: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const [runRegisterMutation, { data }] = useMutation(REGISTER_MUTATION);

  const onSubmit = (e) => {
    e.preventDefault();
    runRegisterMutation({
      variables: form,
    });

    window.location = "/";
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  let newimage = "";
  const convertImageToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newimage = reader.result;
        console.log(newimage);
        setForm({
          ...form,
          image: newimage,
        });
      };
    }
  };

  return (
    <div>
      <Grid container className={styles.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={styles.pageTitle}>
            Register
          </Typography>

          <form noValidate>
            <FormControl
              className={styles.formControl}
              onChange={(e) =>
                setForm({
                  ...form,
                  isAdmin: e.target.value,
                })
              }
            >
              <InputLabel>Is Admin</InputLabel>
              <Select label="Boolean">
                <MenuItem value={false}>False</MenuItem>
                <MenuItem value={true}>True</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username / Email"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />
            <TextField
              id="email"
              name="email"
              type="text"
              label="Email"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
            <TextField
              id="firstname"
              name="firstname"
              type="text"
              label="Firstname"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.firstname}
              onChange={(e) =>
                setForm({
                  ...form,
                  firstname: e.target.value,
                })
              }
            />
            <TextField
              id="lastname"
              name="lastname"
              type="text"
              label="Lastname"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.lastname}
              onChange={(e) =>
                setForm({
                  ...form,
                  lastname: e.target.value,
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
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
            <TextField
              id="department"
              name="department"
              type="text"
              label="Department"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value,
                })
              }
            />
            <TextField
              id="designation"
              name="designation"
              type="text"
              label="Designation"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.designation}
              onChange={(e) =>
                setForm({
                  ...form,
                  designation: e.target.value,
                })
              }
            />
            <TextField
              id="bio"
              name="bio"
              type="text"
              label="Bio"
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.bio}
              onChange={(e) =>
                setForm({
                  ...form,
                  bio: e.target.value,
                })
              }
            />
            <div>
              <input
                id="image"
                accept="image/*"
                className={styles.input}
                multiple
                type="file"
                onChange={(e) => convertImageToBase64(e)}
              />
              <label htmlFor="image">
                <Button variant="outlined" color="secondary" component="span">
                  Upload Image
                </Button>
              </label>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={onSubmit}
            >
              Register
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </div>
  );
};

export default Adminregister;
