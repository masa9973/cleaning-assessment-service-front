/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllUserMast = /* GraphQL */ `
  query FetchAllUserMast {
    fetchAllUserMast {
      createdAt
      email
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
      createdAt
      finishedAt
      recordID
      room
      startAt
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
