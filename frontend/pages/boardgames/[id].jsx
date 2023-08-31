import {
  Box, Grid, Typography,
  CardMedia,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GET_BOARDGAME } from 'graphql/query';
import { makeClient } from '../../apollo-client';
import SubCard from '@/components/cards/SubCard';
import RelatedEventItem from '@/components/boardgame/RelatedEventItem';

const Boardgame = ({ boardgame }) => {
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
          Boardgame Details
        </Typography>
      </Box>
      {boardgame ? (
        <Box sx={{
          flexGrow: 1, marginLeft: '10%', marginRight: '10%', padding: 10,
        }}
        >
          <Grid container spacing={2}>
            <Grid container item xs={8} spacing={3}>
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  image={boardgame.hiresImageUrl}
                  sx={{
                    width: '100%',
                    height: 'fit-content',
                    maxHeight: '30vh',
                  }}
                  alt="Event"
                />
              </Grid>
              <Grid item>
                <Typography variant="overline" display="block">
                  Published by:
                  {' '}
                  {boardgame.publisher}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h1">
                  {boardgame.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="Caption">
                  {boardgame.descriptionLong}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="column" spacing={3}>
                <Grid item xs={4}>
                  <SubCard darkTitle title="Game details">
                    <Typography variant="Subheading" display="block">
                      Players:
                      {' '}
                      {boardgame.playersMin}
                      -
                      {boardgame.playersMax}
                    </Typography>
                    <Typography variant="Subheading" display="block">
                      Playtime:
                      {' '}
                      {boardgame.playtimeMin}
                      -
                      {boardgame.playtimeMax}
                    </Typography>
                    <Typography variant="Subheadingxx">
                      Publish Year:
                      {' '}
                      {boardgame.publishYear}
                    </Typography>
                  </SubCard>
                </Grid>
                <Grid item xs={4}>
                  <SubCard darkTitle title="TLDR">
                    {boardgame.descriptionShort}

                  </SubCard>
                </Grid>
                <Grid item xs={4}>
                  <SubCard darkTitle title="Related Events" contentSX={{ padding: 0 }}>
                    <RelatedEventItem events={boardgame.relatedEvents} />
                  </SubCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : <p> no boardgame</p>}
    </Box>
  );
};

// export async function getStaticPaths() {
//   const client = makeClient();
//   const { data } = await client.query({ query: GET_BOARDGAMES });
//   const paths = data.getBoardGames.map((bg) => ({
//     params: { id: bg.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { id } }) {
//   const client = makeClient();
//   const { data } = await client.query({ query: GET_BOARDGAME, variables: { boardGameId: id } });

//   return {
//     props: {
//       boardgame: data.getBoardGame,
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = makeClient();
  const { data } = await client.query({ query: GET_BOARDGAME, variables: { boardGameId: id } });

  console.log(data);
  return {
    props: {
      boardgame: data.getBoardGame,
    },
  };
}

export default Boardgame;
