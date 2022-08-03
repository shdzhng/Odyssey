import React, { useState } from 'react';
import { useAuth } from '../../../firebase';
import {
  TextField,
  Stack,
  Autocomplete,
  ListItem,
  Box,
  Popper,
  Paper,
  Button,
  Typography,
} from '@mui/material';

export default function SearchBar({ userRef, usersData }) {
  const { sendFriendReq, removeFriend } = useAuth();
  const [targetUID, setTargetUID] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const uidMap = usersData && usersData.map((user) => user.uid);

  const handleInputChange = ({ target }) => {
    setTargetUID(target.value);
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (uidMap.includes(targetUID)) {
      sendFriendReq(targetUID, userRef);
    } else {
      setError(true);
      setErrorMessage('User Not Found');
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '80%' }}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          id="standard-basic"
          label="Add Friend By ID"
          value={targetUID}
          variant="standard"
          onChange={(e) => handleInputChange(e)}
          error={error}
          helperText={error ? errorMessage : null}
        />
        <Button
          onClick={(e, option) => {
            handleAddFriend(e, option);
          }}
        >
          Add
        </Button>
      </Box>
    </Stack>
  );
}

//  {
//    !usersData ? null : (
//      <Autocomplete
//        open={open}
//        // freeSolo
//        includeInputInList={true}
//        noOptionsText={'user not found'}
//        clearOnBlur={false}
//        disableCloseOnSelect
//        onInputChange={(e) => handleInputChange(e)}
//        filterSelectedOptions={true}
//        options={usersData}
//        renderInput={(params) => {
//          return <TextField {...params} label="Search Friends By ID/Name" />;
//        }}
//        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
//        renderOption={(props, option) => {
//          return (
//            <ListItem
//              {...props}
//              sx={{ display: 'flex', flexDirection: 'column' }}
//            >
//              <Typography>{`${option.firstName} ${option.lastName}`}</Typography>

//              <Button
//                onClick={(e, option) => {
//                  handleAddFriend(e, option);
//                }}
//              >
//                Add Friend
//              </Button>
//            </ListItem>
//          );
//        }}
//      />
//    );
//  }
