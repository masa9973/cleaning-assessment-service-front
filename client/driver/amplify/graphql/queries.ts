/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllRecordsByHotelID = /* GraphQL */ `
  query FetchAllRecordsByHotelID($recordHotelID: ID!) {
    fetchAllRecordsByHotelID(recordHotelID: $recordHotelID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const fetchAllUserByHotelID = /* GraphQL */ `
  query FetchAllUserByHotelID($userHotelID: ID!) {
    fetchAllUserByHotelID(userHotelID: $userHotelID) {
      createdAt
      email
      name
      role
      updatedAt
      userHotelID
      userIcon {
        bucket
        key
        region
        url
      }
      userID
    }
  }
`;
export const fetchHotelByHotelID = /* GraphQL */ `
  query FetchHotelByHotelID($hotelID: ID!) {
    fetchHotelByHotelID(hotelID: $hotelID) {
      hotelID
      hotelName
    }
  }
`;
export const fetchMyUserMast = /* GraphQL */ `
  query FetchMyUserMast {
    fetchMyUserMast {
      createdAt
      email
      name
      role
      updatedAt
      userHotelID
      userIcon {
        bucket
        key
        region
        url
      }
      userID
    }
  }
`;
export const fetchRecordsByCleanerID = /* GraphQL */ `
  query FetchRecordsByCleanerID($cleanerID: ID!) {
    fetchRecordsByCleanerID(cleanerID: $cleanerID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const fetchRecordsByRoomID = /* GraphQL */ `
  query FetchRecordsByRoomID($cleaningRoomID: ID!) {
    fetchRecordsByRoomID(cleaningRoomID: $cleaningRoomID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const fetchRoomsByHotelID = /* GraphQL */ `
  query FetchRoomsByHotelID($roomHotelID: ID!) {
    fetchRoomsByHotelID(roomHotelID: $roomHotelID) {
      createdAt
      roomHotelID
      roomIcon {
        bucket
        key
        region
        url
      }
      roomID
      roomName
    }
  }
`;
export const fetchScoresByRecordID = /* GraphQL */ `
  query FetchScoresByRecordID($recordID: ID!) {
    fetchScoresByRecordID(recordID: $recordID) {
      createdAt
      recordID
      score
      scoreID
      scorerUserID
    }
  }
`;
export const fetchUserMastByUserID = /* GraphQL */ `
  query FetchUserMastByUserID($userID: ID!) {
    fetchUserMastByUserID(userID: $userID) {
      createdAt
      email
      name
      role
      updatedAt
      userHotelID
      userIcon {
        bucket
        key
        region
        url
      }
      userID
    }
  }
`;
