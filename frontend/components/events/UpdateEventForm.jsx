import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { useMutation, useQuery } from '@apollo/client';

// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  Chip,
} from '@mui/material';

import { Formik } from 'formik';

// assets
import { GET_BOARDGAMES } from 'graphql/query';
import { UPDATE_EVENT } from 'graphql/mutation';
import AnimateButton from '../buttons/AnimateButton';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UpdateEventForm = ({
  handleClose, type, eventId, ...others
}) => {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [date, setDate] = useState(null);
  const [boardgames, setBoardgames] = useState([]);
  const [boardgamesId, setBoardgamesId] = useState([]);

  // query for boardgames using graphql
  const { loading, error, data } = useQuery(GET_BOARDGAMES);
  if (error) throw new Error(error);

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    update() {
    },
  });

  const handleSelectBoardgames = (event) => {
    const {
      target: { value },
    } = event;
    setBoardgames(value);
    setBoardgamesId(data.getBoardGames
      .filter(({ title }) => value.includes(title))
      .map((bg) => bg.id));
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      // validationSchema={Yup.object().shape({
      //   title: Yup.string().required('Title is required'),
      // })}
      onSubmit={async (values, { setErrors, setStatus }) => {
        const variables = { eventId };
        if (values.title) {
          variables.title = values.title;
        }
        if (values.description) {
          variables.description = values.description;
        }
        if (date) {
          variables.startDateTime = date.toISOString();
        }
        if (boardgamesId.length > 0) {
          variables.boardGamesToBePlayed = boardgamesId;
        }
        if (values.location) {
          variables.location = values.location;
        }
        console.log('variables', variables);
        try {
          await updateEvent({
            variables,
          });
          setStatus({ success: true });
          console.log('Event updated');
          handleClose();
        } catch (err) {
          console.log(err);
          setStatus({ success: false });
          setErrors({ title: '', submit: err.graphQLErrors[0].extensions.errors.general });
        }
      }}
    >
      {({
        errors, handleSubmit, isSubmitting, handleBlur, handleChange, touched,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          {type === 'title'
            ? (
              <div>
                <Typography variant="overline" color={theme.palette.text.primary}>
                  Event Title
                </Typography>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.title && (errors.title || errors.submit))}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="title">Title</InputLabel>
                      <OutlinedInput
                        id="title"
                        fullWidth
                        name="title"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue=""
                        sx={{ ...theme.typography.customInput }}
                        inputProps={{}}
                      />
                      {/* Error message handling for email */}
                      {touched.title && errors.title && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.title}
                      </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            ) : null}

          {type === 'description'
            ? (
              <div>
                <Typography variant="overline" color={theme.palette.text.primary}>
                  Description
                </Typography>
                <FormControl
                  fullWidth
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <OutlinedInput
                    id="description"
                    multiline
                    type="text"
                    fullWidth
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Type a description for your event"
                    rows={4}
                    sx={{ ...theme.typography.customInput }}
                    inputProps={{}}
                  />
                </FormControl>
              </div>
            ) : null}

          {type === 'boardgames'
            ? (
              <div>
                <Typography variant="overline" color={theme.palette.text.primary}>
                  Activity
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-chip-label">Board Games</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={boardgames}
                      onChange={handleSelectBoardgames}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {loading ? (<MenuItem value="">Loading...</MenuItem>) : data.getBoardGames.map((boardgame) => (
                        <MenuItem key={boardgame.id} value={boardgame.title}>
                          {boardgame.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            ) : null}

          {type === 'date'
            ? (
              <div>
                <Typography variant="overline" color={theme.palette.text.primary}>
                  Date and Time
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDateTimePicker
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
                {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  {console.log('Errors', errors)}
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
                )}
              </div>
            ) : null}

          {type === 'location'
            ? (
              <div>
                <Typography variant="overline" color={theme.palette.text.primary}>
                  Event Location
                </Typography>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      fullWidth
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="location">location</InputLabel>
                      <OutlinedInput
                        id="location"
                        fullWidth
                        name="location"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultValue=""
                        sx={{ ...theme.typography.customInput }}
                        inputProps={{}}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            ) : null}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default UpdateEventForm;
