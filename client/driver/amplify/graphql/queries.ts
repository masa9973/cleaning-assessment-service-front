/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllRecordsByHotelID = /* GraphQL */ `
  query FetchAllRecordsByHotelID($hotelID: ID!) {
    fetchAllRecordsByHotelID(hotelID: $hotelID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      hotelID
      ifScored
      recordID
      startAt
    }
  }
`;
export const fetchAllUserByHotelID = /* GraphQL */ `
  query FetchAllUserByHotelID($hotelID: ID!) {
    fetchAllUserByHotelID(hotelID: $hotelID) {
      createdAt
      email
      hotelID
      name
      role
      updatedAt
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
export const fetchMyUserMast = /* GraphQL */ `
  query FetchMyUserMast {
    fetchMyUserMast {
      createdAt
      email
      hotelID
      name
      role
      updatedAt
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
  query FetchRecordsByCleanerID($userID: ID!) {
    fetchRecordsByCleanerID(userID: $userID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      hotelID
      ifScored
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
      hotelID
      ifScored
      recordID
      startAt
    }
  }
`;
export const fetchRoomsByHotelID = /* GraphQL */ `
  query FetchRoomsByHotelID($hotelID: ID!) {
    fetchRoomsByHotelID(hotelID: $hotelID) {
      createdAt
      hotelID
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
      hotelID
      name
      role
      updatedAt
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
