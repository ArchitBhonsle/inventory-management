import React, { Fragment, useEffect } from "react";

//component
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import AdminItem from "../../components/AdminItem/AdminItem";

import { gql, useQuery } from "@apollo/client";

const HISTORYITEM_QUERY = gql`
  query itemById($id: String!) {
    getItemById(id: $id) {
      name
      id
      location
      history {
        name
        isDepartment
        timeOfTransfer
      }
      image
    }
  }
`;

const ITEM_QUERY = gql`
  query itemById($id: String!) {
    getItemById(id: $id) {
      name
      id
      location
      history {
        name
        isDepartment
        timeOfTransfer
      }
      image
    }
  }
`;

const Totalview = (props) => {
  let id = null;

  id = props.match.params.id;

  const { data: histi } = useQuery(HISTORYITEM_QUERY, { variables: { id } });

  let hisitems = null;
  if (histi && histi.getItemById !== null) {
    // console.log(histi.getItemById);
    hisitems = histi.getItemById.history.map((obj) => {
      return <HistoryItem data={obj} additiondata={histi.getItemById} />;
    });
  }

  const { data: item } = useQuery(ITEM_QUERY, { variables: { id } });

  let itemtot = null;

  if (item && item.getItemById !== null) {
    itemtot = <AdminItem data={item.getItemById} />;
  }

  return (
    <Fragment>
      <h1>Item</h1>
      {itemtot}
      <h1>Item History</h1>
      {hisitems}
    </Fragment>
  );
};

export default Totalview;
