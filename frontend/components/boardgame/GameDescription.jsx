import { Grid } from '@mui/material';
import React from 'react';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../cards/SubCard';

const GameDescription = ({
  description, image, publisher, developer,
}) => (
  <SubCard title="Game Information">
    <img src={image} alt="a" />
    <Grid>
      <MuiTypography variant="body2" gutterBottom>
        {description}
      </MuiTypography>

    </Grid>
    <Grid driection="row">
      <MuiTypography variant="overline" display="inline" style={{ fontWeight: 600 }} gutterBottom>
        Publisher:
        {' '}
      </MuiTypography>
      <MuiTypography variant="subtitle2" display="inline" gutterBottom>
        {publisher}
      </MuiTypography>
    </Grid>
    <Grid>
      <MuiTypography variant="overline" display="inline" style={{ fontWeight: 600 }} gutterBottom>
        Developer:
        {' '}
      </MuiTypography>
      <MuiTypography variant="subtitle2" display="inline" gutterBottom>
        {developer}
      </MuiTypography>
    </Grid>

  </SubCard>
);

export default GameDescription;
