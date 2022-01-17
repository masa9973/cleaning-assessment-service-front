/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addRecord = /* GraphQL */ `
  mutation AddRecord($input: RecordMastInput!) {
    addRecord(input: $input) {
      cleanerID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordID
      room
      startAt
    }
  }
`;
export const addScore = /* GraphQL */ `
  mutation AddScore($input: ScoreMastInput!) {
    addScore(input: $input) {
      createdAt
      recordID
      score
      scoreID
      scorerUserID
    }
  }
`;
export const updateRecord = /* GraphQL */ `
  mutation UpdateRecord($input: RecordMastInput!) {
    updateRecord(input: $input) {
      cleanerID
      cleaningTime
      createdAt
      finishedAt
      ifScored
      recordID
      room
      startAt
    }
  }
`;
export const updateUserMast = /* GraphQL */ `
  mutation UpdateUserMast($input: UserMastInput!) {
    updateUserMast(input: $input) {
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
