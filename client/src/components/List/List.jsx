import React, { Fragment } from "react";
import Tree from "react-animated-tree";

//styles
import "./List.css";

const List = ({ data: { name }, username }) => {
  return (
    <Fragment>
      <Tree content={username} open>
        <Tree content={name}></Tree>
      </Tree>
    </Fragment>
  );
};

export default List;
