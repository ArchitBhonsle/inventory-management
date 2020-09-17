import React from "react";

//material ui
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";

//styles
import styles from "./AdminAddItem";

const AdminAddItem = () => {
  return (
    <Fab
      size="medium"
      color="secondary"
      aria-label="add"
      className={styles.margin}
    >
      <AddIcon />
    </Fab>
  );
};

export default AdminAddItem;
