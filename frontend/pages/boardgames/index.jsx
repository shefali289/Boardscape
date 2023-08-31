import React from 'react';
// import EventItem from './EventItem';
import { useTheme } from '@mui/material/styles';
import {
  Box, Grid, Typography, ImageList, ImageListItem,
} from '@mui/material';

import { GET_BOARDGAMES } from 'graphql/query';

import Link from 'next/link';
import { makeClient } from '../../apollo-client';

const index = ({ loading, data }) => {
  const theme = useTheme();
  const style = {
    '&:hover': {
      opacity: 0.5,
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box bgcolor={theme.palette.grey[100]}>
          <Box
            display="flex"
            height={400}
            bgcolor={theme.palette.dark.main}
            alignItems="center"
            justifyContent="center"
          >
            <Typography align="center" color={theme.palette.dark.light} variant="h1" component="h2">
              Explore Boardgames
            </Typography>
          </Box>
          {data.length === 0 && <h3>No events to show</h3>}
          <Box sx={{
            flexGrow: 1, marginLeft: '16%', marginRight: '16%', padding: 10,
          }}
          >
            <Grid container spacing={2}>
              <ImageList variant="masonry" cols={5} gap={8}>
                {data.map((bg) => (
                  <Link key={bg.id} href={`/boardgames/${bg.id.toString()}`}>
                    <ImageListItem sx={style}>
                      <img
                        src={bg.imageUrl}
                        srcSet={bg.imageUrl}
                        sx={style}
                        height="150%"
                        width="150%"
                        alt={bg.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  </Link>
                ))}
              </ImageList>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const client = makeClient();
  const { loading, data } = await client.query({ query: GET_BOARDGAMES });
  return {
    props: { loading, data: data.getBoardGames },
    revalidate: 1,
  };
}

export default index;
