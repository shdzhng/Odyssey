import React, { useState } from 'react';
import { useAuth } from '../../../firebase';
import { TextField, Stack, Box, Button } from '@mui/material';

export default function SearchBar({
  error,
  setError,
  errorMessage,
  setErrorMessage,
  targetUID,
  setTargetUID,
}) {
  const { usersData, userRef, userData, friendsList, sendFriendReq } =
    useAuth();

  const handleInputChange = ({ target }) => {
    setTargetUID(target.value);
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    const allUIDMap = usersData && usersData.map((user) => user.uid);

    if (userData.uid === targetUID) {
      setError(true);
      setErrorMessage('Cannot Add Self');
      return;
    }

    if (friendsList[targetUID]) {
      setError(true);
      setErrorMessage(
        `friend request already ${friendsList[targetUID].reqType}`
      );
      return;
    }

    if (allUIDMap.includes(targetUID)) {
      sendFriendReq(targetUID, userRef);
      setError(false);
      setErrorMessage('');
    } else {
      setError(true);
      setErrorMessage('User Not Found');
    }

    setTargetUID('');
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
