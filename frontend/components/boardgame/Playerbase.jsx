import { Grid } from '@mui/material';
import React from 'react';
import MuiTypography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import SubCard from '../cards/SubCard';

const Playerbase = ({ users }) => (
  <SubCard title="Playerbase" secondary={<Button variant="contained">Join</Button>}>
    <Grid container direction="row" spacing={1}>
      {
    users.map((index, user) => (
      <Grid spacing={5} padding={5}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>T</Avatar>
        <MuiTypography key={index} variant="overline" display="block" gutterBottom>
          {user.name}
        </MuiTypography>
      </Grid>
    ))
    }
    </Grid>
  </SubCard>
);

export default Playerbase;
