import { Grid } from '@mui/material';
import React from 'react';
import MuiTypography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SubCard from '../cards/SubCard';

const GameDetails = ({
  players, playtime,
}) => {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <SubCard title="Game Details">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Demo>
            <List>
              <ListItem>
                <ListItemText>
                  <MuiTypography variant="overline" display="inline" style={{ fontWeight: 600 }} gutterBottom>
                    Recommended Players:
                    {' '}
                  </MuiTypography>
                  <MuiTypography variant="subtitle2" display="inline" gutterBottom>
                    {players}
                  </MuiTypography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <MuiTypography variant="overline" display="inline" style={{ fontWeight: 600 }} gutterBottom>
                    Average Playtime:
                    {' '}
                  </MuiTypography>
                  <MuiTypography variant="subtitle2" display="inline" gutterBottom>
                    {playtime}
                  </MuiTypography>
                </ListItemText>
              </ListItem>
            </List>
          </Demo>
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default GameDetails;
