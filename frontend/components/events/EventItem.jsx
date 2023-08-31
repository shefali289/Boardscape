import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import defaultImages from 'data/defaultImages';

const EventItem = ({ data, index }) => {
  const theme = useTheme();
  const date = new Date(data.startDateTime);

  const style = {
    maxWidth: '100%',
    margin: 'auto',
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    boxShadow: 'none',
    borderRadius: 0,
    '& button': {
      marginLeft: 0,
    },
    '&:hover': {
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
  };

  return (
    <Card sx={style}>
      <CardMedia
        component="img"
        image={
          defaultImages[index % defaultImages.length]
      }
        sx={{
          minWidth: '100%',
          minHeight: '20vh',
          maxHeight: '20vh',
        }}
        alt="Event"
      />
      <CardContent className="CardContent">
        <Typography
          className="Overline"
          variant="overline"
          color="textSecondary"
          gutterBottom
        >
          {`${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`}
          {' at '}
          {`${date.getHours()}:${date.getMinutes()}`}

        </Typography>
        <Typography className="Heading" gutterBottom variant="h4">
          {data.title}
        </Typography>
        <Typography className="Subheading" variant="caption" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions className="CardAction">
        <Link href={{ pathname: `/events/${data.id}`, query: { index } }}>
          <Button
            sx={{
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
            variant="outlined"
            endIcon={<AddIcon />}
          >
            More Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventItem;
