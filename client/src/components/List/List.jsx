import React, { Fragment } from "react";
import Tree from "react-animated-tree";

//styles
import "./List.css";

const List = ({ data }) => {
  console.log(data);
  return (
    <Fragment>
      <Tree content={data.name}></Tree>
    </Fragment>
  );
};

export default List;
