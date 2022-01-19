/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addHotel = /* GraphQL */ `
  mutation AddHotel($input: HotelMastInput!) {
    addHotel(input: $input) {
      hotelID
      hotelName
    }
  }
`;
export const addRecord = /* GraphQL */ `
  mutation AddRecord($input: RecordMastInput!) {
    addRecord(input: $input) {
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
export const addRoom = /* GraphQL */ `
  mutation AddRoom($input: RoomMastInput!) {
    addRoom(input: $input) {
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
export const updateUserMast = /* GraphQL */ `
  mutation UpdateUserMast($input: UserMastInput!) {
    updateUserMast(input: $input) {
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
