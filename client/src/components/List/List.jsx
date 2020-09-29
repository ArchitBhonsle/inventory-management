import React, { Fragment } from "react";
import Tree from "react-animated-tree";

//styles
import "./List.css";

const List = ({ data: { name } }) => {
  return (
    <Fragment>
      <Tree content={name}></Tree>
    </Fragment>
  );
};

export default List;
