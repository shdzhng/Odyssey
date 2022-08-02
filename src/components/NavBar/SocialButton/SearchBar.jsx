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

export default function SearchBar() {
  const { usersData } = useAuth();
  const [open, setOpen] = useState(false);
  console.log(usersData);
  const handleInputChange = ({ target }) => {
    if (target?.value?.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleAddFriend = (info) => {
    console.log(info);
  };

  return (
    <Stack spacing={2} sx={{ width: '80%' }}>
      {!usersData ? null : (
        <Autocomplete
          open={open}
          freeSolo
          onInputChange={(e) => handleInputChange(e)}
          filterSelectedOptions={true}
          options={usersData}
          renderInput={(params) => {
            return <TextField {...params} label="Search Friends By ID/Name" />;
          }}
          getOptionLabel={(option) =>
            `${option.firstName} ${option.lastName} ${option.uid}`
          }
          renderOption={(props, option) => {
            return (
              <ListItem
                {...props}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography>
                  {`${option.firstName} ${option.lastName}`}
                </Typography>

                <Button
                  onClick={(option) => {
                    handleAddFriend(option);
                  }}
                >
                  Add Friend
                </Button>
              </ListItem>
            );
          }}
        />
      )}
    </Stack>
  );
}
