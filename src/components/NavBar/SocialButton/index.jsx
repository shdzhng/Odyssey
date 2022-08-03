import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Badge,
  CssBaseline,
  List,
  Typography,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader } from './socialButton.styles';
import { useAuth } from '../../../firebase';
import SearchBar from './SearchBar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const drawerWidth = 300;

export default function SocialButton() {
  const {
    currentUser,
    logout,
    userRef,
    friendsOnline,
    friendsOffline,
    incomingFriends,
    outgoingFriends,
    removeFriend,
  } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [targetUID, setTargetUID] = useState('');

  const handleSignOut = () => logout();
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleRemoveFriend = (targetUID, userRef, reqType) => {
    removeFriend(targetUID, userRef, reqType);
    setError(false);
    setTargetUID('');
    setErrorMessage('');
  };

  const renderFriends = (list) =>
    list.map((friend) => {
      return (
        <ListItem key={friend.uid} sx={{ display: 'flex' }} disablePadding>
          <Typography>{`${friend.firstName} ${friend.lastName}`}</Typography>
          <Button
            onClick={() => {
              handleRemoveFriend(friend.uid, userRef, friend.reqType);
            }}
          >
            x
          </Button>
        </ListItem>
      );
    });

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: 'none' }) }}
      >
        <Badge badgeContent={0} color="error">
          <PeopleAltIcon />
        </Badge>
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Typography variant="caption">{`My ID: ${currentUser.uid}`}</Typography>

        <SearchBar
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          targetUID={targetUID}
          setTargetUID={setTargetUID}
        />
        <Divider />
        <Typography>Incoming Friend Request</Typography>
        <List>{renderFriends(incomingFriends)}</List>
        <Divider />
        <Typography>Friends Online</Typography>
        <List>{renderFriends(friendsOnline)}</List>
        <Divider />
        <Typography>Friends Offline</Typography>
        <List>{renderFriends(friendsOffline)}</List>
        <Divider />
        <Typography>Friend Requests Sent</Typography>
        <List disablePadding>
          <List>{renderFriends(outgoingFriends)}</List>
        </List>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Drawer>
    </Box>
  );
}
