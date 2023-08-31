import {
  Typography,
  List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider,
} from '@mui/material';
import Link from 'next/link';

const GameItem = ({ games }) => (
  <List sx={{
    width: '100%', margin: 0, padding: 0, bgcolor: 'background.paper',
  }}
  >
    {games.map(({ id, imageUrl, title }) => (
      <div key={id}>
        <Link href={`/boardgames/${id}`}>
          <ListItem button key={id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={title}
                src={
                imageUrl || '/images/game-default.png'
                }
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
                  {title}
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

export default GameItem;
