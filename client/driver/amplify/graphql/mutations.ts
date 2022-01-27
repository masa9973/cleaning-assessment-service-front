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
      ifScored
      recordHotelID
      recordID
      startAt
    }
  }
`;
export const addRoom = /* GraphQL */ `
  mutation AddRoom($input: RoomMastInput!) {
    addRoom(input: $input) {
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
export const addScore = /* GraphQL */ `
  mutation AddScore($input: ScoreMastInput!) {
    addScore(input: $input) {
      createdAt
      recordID
      score
      scoreID
      scoreItemID
      scorerUserID
    }
  }
`;
export const addScoreItem = /* GraphQL */ `
  mutation AddScoreItem($input: ScoreItemMastInput!) {
    addScoreItem(input: $input) {
      createdAt
      scoreItemHotelID
      scoreItemID
      scoreItemName
    }
  }
`;
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom($roomID: ID!) {
    deleteRoom(roomID: $roomID) {
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
export const deleteScoreItem = /* GraphQL */ `
  mutation DeleteScoreItem($scoreItemID: ID!) {
    deleteScoreItem(scoreItemID: $scoreItemID) {
      createdAt
      scoreItemHotelID
      scoreItemID
      scoreItemName
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
      ifScored
      recordHotelID
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
