import * as React from 'react';
import Button from '@mui/material/Button';
// import CreateEventModal from '../events/CreateEventModal';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AnimateButton from 'components/buttons/AnimateButton';
import CreateEventForm from './CreateEventForm';

const CreateEventModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleCreateEvent = () => {
  //   console.log('Create Event');
  // };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <CreateEventForm handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
      <AnimateButton>
        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Create Event
        </Button>
      </AnimateButton>
    </>
  );
};

export default CreateEventModal;
