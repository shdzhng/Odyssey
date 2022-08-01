import { Box, FormControl, TextField } from '@mui/material';
import { styled } from '@mui/material';

const ModalContainer = styled(FormControl)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.main,
  border: '2px solid #000',
  boxShadow: 24,
  padding: '4em',
  display: 'flex',
  flexDirection: 'column',
}));

const ModalTextField = styled(TextField)(({ theme }) => ({
  marginTop: '1em',
}));

export { ModalContainer, ModalTextField };
