import React, { useState, useEffect } from "react";

//material ui
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//graphql
import { gql, useLazyQuery, useMutation } from "@apollo/client";

//styles
import styles from "./AdminAddItem";

const ITEMADD_MUTATION = gql`
  mutation createItem(
    $name: String!
    $image: String!
    $desc: String!
    $loc: String!
    $cat: String!
  ) {
    createItem(
      name: $name
      image: $image
      description: $desc
      location: $loc
      category: $cat
    )
  }
`;

const AdminAddItem = () => {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    loc: "",
    cat: "",
    image: "",
  });

  const [runItemAddMutation, { data }] = useMutation(ITEMADD_MUTATION);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    runItemAddMutation({
      variables: form,
    });

    handleClose();
  };

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
    <Fab
      size="medium"
      color="secondary"
      aria-label="add"
      className={styles.margin}
    >
      <AddIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add your post</DialogTitle>
        <DialogContent>
          <form noValidate>
            <TextField
              name="name"
              type="text"
              label="Item-name"
              multiline
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              row="3"
              fullWidth
            />
            <TextField
              name="description"
              type="text"
              label="Description"
              value={form.desc}
              onChange={(e) =>
                setForm({
                  ...form,
                  desc: e.target.value,
                })
              }
              multiline
              row="3"
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              value={form.loc}
              onChange={(e) =>
                setForm({
                  ...form,
                  loc: e.target.value,
                })
              }
              multiline
              row="3"
              fullWidth
            />
            <TextField
              name="category"
              type="text"
              label="category"
              value={form.cat}
              onChange={(e) =>
                setForm({
                  ...form,
                  cat: e.target.value,
                })
              }
              multiline
              row="3"
              fullWidth
            />

            <input
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              multiple
              type="file"
              onChange={(e) => convertImageToBase64(e)}
            />
            <label htmlFor="image">
              <Button
                variant="outlined"
                color="secondary"
                component="span"
                className={styles.input}
              >
                Upload Image
              </Button>
            </label>
          </form>
        </DialogContent>
        <DialogActions onClose={handleClose}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fab>
  );
};

export default AdminAddItem;
