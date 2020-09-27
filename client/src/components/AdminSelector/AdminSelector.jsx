import React from "react";

//material ui
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//styles
import styles from "./AdminSelector.module.css";

const AdminSelector = () => {
  return (
    <FormControl className={styles.formControl}>
      <InputLabel>Category</InputLabel>
      <Select label="Age">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AdminSelector;
