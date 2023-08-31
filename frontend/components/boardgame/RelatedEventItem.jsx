import {
  Typography,
  List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider,
} from '@mui/material';
import Link from 'next/link';
import defaultImages from 'data/defaultImages';

const RelatedEventItem = ({ events }) => (
  <List sx={{
    width: '100%', margin: 0, padding: 0, bgcolor: 'background.paper',
  }}
  >

    {events && events.map(({ id, title, startDateTime }, i) => (
      <div key={id}>
        <Link href={{ pathname: `/events/${id}`, query: { index: i } }}>
          <ListItem button key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={title}
                src={defaultImages[i % defaultImages.length]}
              />
            </ListItemAvatar>
            <ListItemText
              primary={title}
              secondary={(
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {startDateTime}
                </Typography>
                      )}
            />
          </ListItem>
        </Link>
        <Divider />
      </div>
    ))}

  </List>
);

export default RelatedEventItem;
