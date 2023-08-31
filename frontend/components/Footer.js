import Link from 'next/link';
import { useTheme } from '@mui/styles';
import {
  Grid, Typography, Box, MenuItem,
} from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const pages = ['Boardgames', 'Events', 'About'];

  const footerStyle = {
    backgroundColor: theme.palette.dark.main,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    padding: '2em 0 ',
  };

  return (
    <Box sx={footerStyle}>
      <Grid container spacing={3} justifyContent="center">
        {pages.map((page) => (
          <Grid item sx={{ padding: 2 }} key={page}>
            <Link key={page} href={`/${page.toLowerCase()}`}>
              <MenuItem>
                <Typography variant="h3" sx={{ color: theme.palette.dark.light }}>
                  {page}
                </Typography>
              </MenuItem>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
      >
        <Typography sx={{ color: theme.palette.dark.light }}>
          <p>Copyright &copy; Boardscape 2022</p>
        </Typography>
      </Grid>
    </Box>
  );
};

export default Footer;
