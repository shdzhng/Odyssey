import { styled, useTheme } from '@mui/material/styles';
import { Popper } from '@mui/material';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export { DrawerHeader };
