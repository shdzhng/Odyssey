import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import * as React from 'react';
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

const drawerWidth = 240;

export default function SocialButton() {
  const { currentUser, usersData, logout } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleSignOut = () => {
    logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

        <SearchBar />

        <Divider />
        <Typography>Friends Online</Typography>
        <List>
          <ListItem disablePadding></ListItem>
        </List>

        <Typography>Friends Offline</Typography>
        <List>
          <ListItem disablePadding></ListItem>
        </List>
        <Divider />

        <Button onClick={handleSignOut}>Sign Out</Button>
      </Drawer>
    </Box>
  );
}
