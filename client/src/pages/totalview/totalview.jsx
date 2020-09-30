import React, { Fragment, useState } from 'react';

//component
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import TotalViewItem from '../../components/TotalViewItem/TotalViewItem';

//material ui
import TextField from '@material-ui/core/TextField';

import { gql, useQuery, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

//styles
import styles from './totalview.module.css';

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
      description
      department
      history {
        name
        isDepartment
        timeOfTransfer
      }
      image
    }
  }
`;

const TRANSFER_QUERY = gql`
  mutation transferItem($itemId: String!, $username: String!) {
    transferItem(id: $itemId, username: $username)
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
    itemtot = <TotalViewItem data={item.getItemById} />;
  }

  const [ form, setForm ] = useState({
    itemId   : id,
    username : ''
  });

  const [ runTransferQuery ] = useMutation(TRANSFER_QUERY);

  const onSubmit = (e) => {
    runTransferQuery({
      variables : form
    });

    // console.log(form);
    window.location = `/totalview/${id}`;
  };

  return (
    <Fragment>
      <h1>Item</h1>
      <div className={styles.transfer}>
        <TextField
          id="transferuser"
          name="transferuser"
          type="text"
          label="Transer to user"
          variant="outlined"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username : e.target.value
            })}
        />
        <Button variant="contained" color="secondary" onClick={onSubmit}>
          Transfer
        </Button>
      </div>
      <div class={styles.content}>
        {itemtot}
        <div>
          <h1>History</h1>
          {hisitems}
        </div>
      </div>
    </Fragment>
  );
};

export default Totalview;
