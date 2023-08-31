import { gql } from '@apollo/client';

const GET_BOARDGAMES = gql`
    query getBoardGames {
  getBoardGames {
    id
    title
    createdAt
    publishYear
    publisher
    isBaseGame
    descriptionShort
    descriptionLong
    imageUrl
    playersMax
    playersMin
    playtimeMax
    playtimeMin
    genre
    rating
  }
}`;
const GET_BOARDGAME = gql`
  query getBoardGame($boardGameId: ID!) {
    getBoardGame(boardGameId: $boardGameId) {
      id
      title
      createdAt
      publishYear
      publisher
      isBaseGame
      descriptionShort
      descriptionLong
      imageUrl
      hiresImageUrl
      playersMax
      playersMin
      playtimeMax
      playtimeMin
      genre
      rating
      relatedEvents {
        id
        title
        startDateTime
      }
    }
  }`;

const GET_EVENTS = gql`
  query getEvents {
    getEvents {
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
const GET_EVENT = gql`
  query GetEvent($eventId: ID!) {
    getEvent(eventId: $eventId) {
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
        firstName
        lastName
        email
      }
      comments {
        id
      }
      boardGamesToBePlayed {
        id
        imageUrl
        title
      }
    }
}`;

export {
  GET_EVENTS, GET_EVENT, GET_BOARDGAMES, GET_BOARDGAME,
};
