import {
  Typography,
  List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider,
} from '@mui/material';

const PeopleItem = ({ ppl }) => (
  <List sx={{
    width: '100%', margin: 0, padding: 0, bgcolor: 'background.paper',
  }}
  >

    {ppl.map(({
      id, firstName, lastName, email,
    }) => (
      <>
        <ListItem key={id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={firstName} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={`${firstName} ${lastName}`}
            secondary={(
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {email}
              </Typography>
                        )}
          />
        </ListItem>
        <Divider />
      </>
    ))}

  </List>
  // </div>
);

export default PeopleItem;
