import {
  Box, Grid, Typography, CardMedia, IconButton, Button,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useTheme } from '@mui/material/styles';
import { GET_EVENT } from 'graphql/query';
import { JOIN_EVENT } from 'graphql/mutation';
import defaultImages from 'data/defaultImages';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useContext, useState } from 'react';
import { AuthContext } from 'context/auth';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UpdateEventForm from 'components/events/UpdateEventForm';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PeopleItem from '@/components/PeopleItem';
import GameItem from '@/components/GameItem';
import SubCard from '@/components/cards/SubCard';

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

const EventPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id: eventId, index } = router.query;

  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [joinEvent] = useMutation(JOIN_EVENT, {
    update() {
    },
    onError(err) {
      console.log(err);
    },
    onCompleted(data2) {
      console.log(data2);
    },
  });
  const theme = useTheme();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId },
  });
  if (error) {
    throw new Error(error);
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  const evt = data.getEvent;

  const date = new Date(evt.startDateTime);
  const isHost = user && user.id === evt.userId;

  const handleUpdateBoardgame = (formType) => {
    console.log('update', formType);
    setType(formType);
    handleOpen();
  };

  return (
    <Box bgcolor={theme.palette.grey[100]}>
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
            <UpdateEventForm handleClose={handleClose} type={type} eventId={evt.id} />
          </Box>
        </Fade>
      </Modal>
      <Box
        display="flex"
        height={400}
        bgcolor={theme.palette.dark.main}
        alignItems="center"
        justifyContent="center"
      >
        <Typography align="center" color={theme.palette.dark.light} variant="h1" component="h2">
          Events
        </Typography>
      </Box>
      {!loading ? (
        <Box sx={{
          flexGrow: 1, marginLeft: '10%', marginRight: '10%', padding: 10,
        }}
        >
          <Grid container spacing={2}>
            <Grid container item xs={8} spacing={3}>
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  image={
                  defaultImages[index % defaultImages.length]
                }
                  sx={{
                    width: '100%',
                    height: 'fit-content',
                    maxHeight: '50vh',
                  }}
                  alt="Event"
                />
              </Grid>
              <Grid display="flex" item xs={12}>
                <Typography variant="overline">
                  {`${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`}
                  {' at '}
                  {`${date.getHours()}:${date.getMinutes()}`}
                </Typography>
                {isHost
                && <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleUpdateBoardgame('date')} tooltip="Description here"><EditRoundedIcon /></IconButton>}
              </Grid>
              <Grid display="flex" item xs={12}>
                <Typography variant="h1">
                  {evt.title}
                </Typography>
                {isHost
                && <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleUpdateBoardgame('title')} tooltip="Description here"><EditRoundedIcon /></IconButton>}
              </Grid>
              <Grid display="flex" item xs={12}>
                <Typography variant="Caption">
                  {evt.description}
                </Typography>
              </Grid>
              {isHost
                && <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleUpdateBoardgame('description')} tooltip="Description here"><EditRoundedIcon /></IconButton>}
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column" spacing={3}>
                <Grid item xs={4}>
                  <SubCard
                    darkTitle
                    title="Who's Going?"
                    contentSX={{ padding: 0 }}
                    secondary={(
                      user && (
                      <Button
                        sx={{
                          color: 'white',
                          borderColor: 'black',
                          backgroundColor: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.dark.main,
                            color: 'white',
                          },
                        }}
                        onClick={async () => {
                          try {
                            await joinEvent({
                              variables: {
                                eventId: evt.id,
                              },
                            });
                            setJoined(!joined);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        {joined ? <Typography>Leave</Typography> : <Typography>Join</Typography>}
                      </Button>
                      )
                      )}
                  >
                    <PeopleItem ppl={evt.attendees} />
                  </SubCard>
                </Grid>
                <Grid item xs={4}>
                  <SubCard
                    darkTitle
                    title="Boardgames"
                    contentSX={{ padding: 0 }}
                    secondary={isHost && <IconButton onClick={() => handleUpdateBoardgame('boardgames')} tooltip="Description here"><EditRoundedIcon /></IconButton>}
                  >
                    <GameItem key={evt.id} games={evt.boardGamesToBePlayed} />
                  </SubCard>
                </Grid>
                <Grid item xs={4}>
                  <SubCard
                    darkTitle
                    title="Venue"
                    secondary={isHost && <IconButton onClick={() => handleUpdateBoardgame('location')} tooltip="Description here"><EditRoundedIcon /></IconButton>}
                  >
                    {evt.location}
                  </SubCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : <p>loading</p>}
    </Box>
  );
};

export default EventPage;
