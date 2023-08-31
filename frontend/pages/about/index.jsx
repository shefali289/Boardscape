import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import SubCard from '@/components/cards/SubCard';

const AboutPage = () => {
  const theme = useTheme();
  return (
    <Container>
      <Typography align="center" color={theme.palette.dark} variant="h1" component="h2" padding="5px">
        About Boardscape
      </Typography>
      <IntroBox>
        <p>
          Boardscape was founded by five friends at the University of Auckland to
          solve the problem of making friends and sharing the hobby of in-real-life
          gaming. It provides a streamlined approach to social networking without
          clutter or commercial interests of mainstream social media websites.
        </p>
        <p>
          The joy of board gaming is the social experience of telling a story
          together, and whether it be cooperative or combative, the best way to help
          beginner boardgamers or hardcore enthusiasts alike is to minimise the time
          needed in front of a screen to get into a gaming session. This is the
          mission of Boardscape.
        </p>
        <SubCard darkTitle title="What are Board Games?" contentSX={{ padding: 3 }}>
          <p>
            Board games are tabletop games that typically use pieces - moved or placed
            on a pre-marked board (playing surface) and often include elements of
            table, card, role-playing, and miniatures games as well.
          </p>
          <p>
            Most feature a competition between two or more players. To show a few
            examples: in draughts, a player wins by
            capturing all opposing pieces, while Eurogames often end with a
            calculation of final scores. Pandemic is a cooperative game where players
            all win or lose as a team, and peg solitaire is a puzzle for one person.
          </p>
          <p>
            There are many varieties of board games. Their representation of real-life
            situations can range from having no inherent theme, such as checkers, to
            having a specific theme and narrative, such as Cluedo. Rules can range
            from the very simple, such as in Snakes and Ladders; to deeply complex, as
            in Advanced Squad Leader. Play components now often include custom figures
            or shaped counters, and distinctively shaped player pieces commonly known
            as meeples as well as traditional cards and dice.
          </p>
          <p>
            The time required to learn or master game play varies greatly from game to
            game, but is not necessarily related to the number or complexity of rules,
            and games like chess or Go possess relatively simple rulesets, but have
            great strategic depth
          </p>
        </SubCard>
        <br />
      </IntroBox>
      <SubCard darkTitle title="Where to get started?" contentSX={{ padding: 0 }}>
        <p>New to the hobby? Check out these videos to help you better understand the hobby.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ivL9dAk5OhY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </SubCard>
      <SubCard darkTitle title="What's it like to play?" contentSX={{ padding: 0 }}>
        <p>
          Check out these &quot;let&apos;s play&quot; videos to see what a gaming session is like
        </p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/WzyuRWpAT9g" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </SubCard>
    </Container>
  );
};

export default AboutPage;

const IntroBox = styled.div`
    width: 100%;
    text-align: left;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
`;
