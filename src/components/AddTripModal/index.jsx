import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuth } from '../../firebase';
import { TextField, Autocomplete } from '@mui/material';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddTripModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [invitation, setInvitation] = useState([]);
  const [error, setError] = useState({});
  const { userData, createTrip, friendsData } = useAuth();

  const getDate = (prop) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    if (prop === 'min') return `${yyyy}-${mm}-${dd}`;
    if (prop === 'max') return `${yyyy + 10}-${mm}-${dd}`;
  };

  const resetInput = () => {
    setName('');
    setDate('');
    setDescription('');
    setOpen(false);
    setError({});
  };

  const handleInputError = () => {
    setError({});
    if (name === '') {
      setError((prev) => {
        return { ...prev, name: 'trip name cannot be empty' };
      });
    }

    if (description === '') {
      setError((prev) => {
        return { ...prev, description: 'trip description cannot be empty' };
      });
    }

    if (date === '') {
      setError((prev) => {
        return { ...prev, description: 'trip date cannot be empty' };
      });
    }
  };

  const handleInviteChange = (value) => {
    if (value[0]?.uid && !invitation.includes(value[0].uid))
      setInvitation((prev) => {
        return [...prev, value[0].uid];
      });
  };

  useEffect(() => {
    console.log(invitation);
  }, [invitation]);

  const handleSubmit = () => {
    if (name === '' || date === '' || description === '') {
      handleInputError();
      return;
    }

    const tripInfo = {
      name,
      date: new Date(date).getTime(),
      description,
      invitation,
      createdOn: new Date().getTime(),
      createdBy: {
        uid: userData.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    };

    createTrip(tripInfo);
    resetInput();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create A Trip</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            error={Object.keys(error).includes('name') ? true : false}
            helperText={error['name'] ? error['name'] : null}
            variant="standard"
            placeholder="trip name"
            type="string"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            variant="standard"
            error={Object.keys(error).includes('description') ? true : false}
            helperText={error['description'] ? error['description'] : null}
            placeholder="trip description"
            multiline
            type="string"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            variant="standard"
            type="date"
            InputProps={{
              inputProps: {
                min: getDate('min'),
                max: getDate('max'),
              },
            }}
            error={Object.keys(error).includes('date') ? true : false}
            helperText={error['date'] ? error['date'] : null}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            options={friendsData}
            onChange={(e, newValue) => handleInviteChange(newValue)}
            getOptionLabel={({ firstName, lastName }) =>
              `${firstName} ${lastName}`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Invite Friends"
              />
            )}
          />
          <Button onClick={handleSubmit}> Create </Button>
          <Button
            onClick={() => {
              setOpen(false);
              resetInput();
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddTripModal;
