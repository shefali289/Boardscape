import { gql } from '@apollo/client';

const CREATE_EVENT = gql`
    mutation CreateEvent($title: String!, $description: String, $startDateTime: String ,$boardGamesToBePlayed: [String]) {
        createEvent(title: $title, description: $description, startDateTime: $startDateTime, boardGamesToBePlayed: $boardGamesToBePlayed) {
          id
          title
          createdAt
          userId
          description
          location
          startDateTime
          endDateTime
          attendees {
            id
          }
          boardGamesToBePlayed {
            id
          }
        }
}`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent($eventId: ID!, $boardGamesToBePlayed: [String], $title: String, $description: String, $location: String, $startDateTime: String) {
    updateEvent(eventId: $eventId, boardGamesToBePlayed: $boardGamesToBePlayed, title: $title, description: $description, location: $location, startDateTime: $startDateTime) {
      boardGamesToBePlayed {
        id
        title
      }
      title
      description
      id
      startDateTime
      location
      userId
    }
  }`;

const GOOGLE_LOGIN = gql`
    mutation GoogleLogin($idToken: String!) {
        googleLogin(idToken: $idToken) {
            id 
            email
            token
        }
    }
`;

const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    token
    firstName
  }
}`;

const REGISTER_USER = gql`
  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: { 
        firstName: $firstName, 
        lastName: $lastName, 
        email: $email,
        password: $password, 
        confirmPassword: $confirmPassword
      }
    ) {
        id
        email
        token
      }
  }`;

const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
      title
      createdAt
      userId
      description
      location
      startDateTime
      endDateTime
      attendees {
        id
      }
      boardGamesToBePlayed {
        id
      }
    }
}`;

export {
  CREATE_EVENT, UPDATE_EVENT, GOOGLE_LOGIN, LOGIN_USER, REGISTER_USER, JOIN_EVENT,
};
