import React, { Fragment } from "react";
import Tree from "react-animated-tree";

//styles
import "./List.css";

const List = () => {
  return (
    <Fragment>
      <Tree content="Inspector pinto" open>
        <Tree content="gun"></Tree>
        <Tree content="vehicle">
          <Tree content="fuel 15lt"></Tree>
        </Tree>
      </Tree>
    </Fragment>
  );
};

export default List;
