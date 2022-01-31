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
      recordDate
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
export const fetchRecordByRecordID = /* GraphQL */ `
  query FetchRecordByRecordID($recordID: ID!) {
    fetchRecordByRecordID(recordID: $recordID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordDate
      recordHotelID
      recordID
      startAt
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
      recordDate
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const fetchRecordsByDate = /* GraphQL */ `
  query FetchRecordsByDate($recordDate: String!, $recordHotelID: ID!) {
    fetchRecordsByDate(recordDate: $recordDate, recordHotelID: $recordHotelID) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordDate
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
      recordDate
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const fetchRoomByRoomID = /* GraphQL */ `
  query FetchRoomByRoomID($roomID: ID!) {
    fetchRoomByRoomID(roomID: $roomID) {
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
export const fetchScoreItemByScoreItemID = /* GraphQL */ `
  query FetchScoreItemByScoreItemID($scoreItemID: ID!) {
    fetchScoreItemByScoreItemID(scoreItemID: $scoreItemID) {
      createdAt
      scoreItemHotelID
      scoreItemID
      scoreItemName
    }
  }
`;
export const fetchScoreItemsByHotelID = /* GraphQL */ `
  query FetchScoreItemsByHotelID($scoreItemHotelID: ID!) {
    fetchScoreItemsByHotelID(scoreItemHotelID: $scoreItemHotelID) {
      createdAt
      scoreItemHotelID
      scoreItemID
      scoreItemName
    }
  }
`;
export const fetchScoresByRecordID = /* GraphQL */ `
  query FetchScoresByRecordID($recordID: ID!) {
    fetchScoresByRecordID(recordID: $recordID) {
      createdAt
      recordID
      score
      scoreCleanerID
      scoreID
      scoreItemID
      scoreRoomID
      scorerUserID
    }
  }
`;
export const fetchScoresByScoreItemID = /* GraphQL */ `
  query FetchScoresByScoreItemID($scoreItemID: ID!) {
    fetchScoresByScoreItemID(scoreItemID: $scoreItemID) {
      createdAt
      recordID
      score
      scoreCleanerID
      scoreID
      scoreItemID
      scoreRoomID
      scorerUserID
    }
  }
`;
export const fetchTermRecordsByCleanerIDAndRoomID = /* GraphQL */ `
  query FetchTermRecordsByCleanerIDAndRoomID(
    $cleanerID: ID!
    $cleaningRoomID: ID!
    $from: String!
    $to: String!
  ) {
    fetchTermRecordsByCleanerIDAndRoomID(
      cleanerID: $cleanerID
      cleaningRoomID: $cleaningRoomID
      from: $from
      to: $to
    ) {
      cleanerID
      cleaningRoomID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordDate
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const fetchTermScoresByCleanerIDAndRoomID = /* GraphQL */ `
  query FetchTermScoresByCleanerIDAndRoomID(
    $from: String!
    $scoreCleanerID: ID!
    $scoreRoomID: ID!
    $to: String!
  ) {
    fetchTermScoresByCleanerIDAndRoomID(
      from: $from
      scoreCleanerID: $scoreCleanerID
      scoreRoomID: $scoreRoomID
      to: $to
    ) {
      createdAt
      recordID
      score
      scoreCleanerID
      scoreID
      scoreItemID
      scoreRoomID
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
