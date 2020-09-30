import React, { useState } from 'react';

//material ui
import { Grid, TextField, Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//graphql
import { gql, useMutation } from '@apollo/client';

//styles
import styles from './adminregister.module.css';

const REGISTER_MUTATION = gql`
  mutation register(
    $isAdmin: Boolean!
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
      isAdmin: $isAdmin
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
  const formInitState = {
    isAdmin     : false,
    firstname   : '',
    lastname    : '',
    image       : '',
    bio         : '',
    designation : '',
    department  : '',
    email       : '',
    username    : '',
    password    : ''
  };
  const [ form, setForm ] = useState(formInitState);

  const [ runRegisterMutation ] = useMutation(REGISTER_MUTATION);

  const onSubmit = (e) => {
    e.preventDefault();
    runRegisterMutation({
      variables : form
    });
    setForm(formInitState);
  };

  let newimage = '';
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
          image : newimage
        });
      };
    }
  };

  return (
    <div>
      <Grid container className={styles.form}>
        <Grid item sm />
        <Grid item sm>
          <h1>Add User</h1>

          <form noValidate>
            <FormControlLabel
              control={
                <Switch
                  checked={form.isAdmin}
                  onChange={() => setForm({ ...form, isAdmin: !form.isAdmin })}
                  name="isAdmin"
                  color="primary"
                />
              }
              label="Is the user to be created an admin?"
            />
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username "
              variant="outlined"
              fullWidth
              className={styles.textField}
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username : e.target.value
                })}
              margin="normal"
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
                  email : e.target.value
                })}
              margin="normal"
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
                  firstname : e.target.value
                })}
              margin="normal"
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
                  lastname : e.target.value
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
              className={styles.textField}
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password : e.target.value
                })}
              margin="normal"
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
                  department : e.target.value
                })}
              margin="normal"
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
                  designation : e.target.value
                })}
              margin="normal"
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
                  bio : e.target.value
                })}
              margin="normal"
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
                <Button
                  className={styles.button}
                  variant="outlined"
                  color="secondary"
                  component="span"
                >
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
