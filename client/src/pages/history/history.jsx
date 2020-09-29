import React, { Fragment } from 'react';

//component
import HistoryItem from '../../components/HistoryItem/HistoryItem';

import { gql, useQuery } from '@apollo/client';

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

const History = (props) => {
  let id = null;

  id = props.match.params.id;

  // console.log(id);

  const { data: histi } = useQuery(HISTORYITEM_QUERY, { variables: { id } });

  let hisitems = null;
  if (histi && histi.getItemById !== null) {
    // console.log(histi.getItemById);
    hisitems = histi.getItemById.history.map((obj) => {
      return <HistoryItem data={obj} additiondata={histi.getItemById} />;
    });
  }

  return (
    <Fragment>
      <h1>Item History</h1>
      {hisitems}
    </Fragment>
  );
};

export default History;
