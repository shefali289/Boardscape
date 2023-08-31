import React from 'react';
// import EventItem from './EventItem';
import { useTheme } from '@mui/material/styles';
import {
  Box, Grid, Typography,
} from '@mui/material';

import { AuthContext } from 'context/auth.js';
import EventItem from './EventItem';
import SubCard from '../cards/SubCard';
import CreateEventModal from './CreateEventModal';

const EventLayout = ({ data }) => {
  const { user } = React.useContext(AuthContext);
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.grey[100]}>
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
      {data.length === 0 && <h3>No events to show</h3>}
      <Box sx={{
        flexGrow: 1, marginLeft: '16%', marginRight: '16%', padding: 10,
      }}
      >
        <Grid container spacing={2}>
          <Grid container item xs={8} rowSpacing={3} columnSpacing={3}>
            {data.map((evt, i) => (
              // <EventItem key={evt.id} evt={evt} />
              <Grid item key={evt.id} xs={6}>
                <EventItem key={evt.id} data={evt} index={i} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column" rowSpacing={3}>

              <Grid item xs={4}>
                <SubCard
                  darkTitle
                  title="Create Event"
                >
                  {/* if user is logged in, show create event button */}
                  { user
                    ? <CreateEventModal /> : <Typography> Log in to Create Events!</Typography>}
                </SubCard>
              </Grid>
              <Grid item xs={4} />

              <Grid item xs={4} />
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EventLayout;
