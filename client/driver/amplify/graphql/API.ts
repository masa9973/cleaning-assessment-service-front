/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type RecordMastInput = {
  cleanerID: string,
  createdAt: number,
  finishedAt: number,
  recordID: string,
  room: string,
  startAt: number,
};

export type RecordMast = {
  __typename: "RecordMast",
  cleanerID: string,
  createdAt: number,
  finishedAt: number,
  recordID: string,
  room: string,
  startAt: number,
};

export type ScoreMastInput = {
  createdAt: number,
  recordID: string,
  score: number,
  scoreID: string,
  scorerUserID: string,
};

export type ScoreMast = {
  __typename: "ScoreMast",
  createdAt: number,
  recordID: string,
  score: number,
  scoreID: string,
  scorerUserID: string,
};

export type UserMastInput = {
  createdAt: number,
  email: string,
  name: string,
  role: string,
  updatedAt: number,
  userIcon?: S3ObjectInput | null,
  userID: string,
};

export type S3ObjectInput = {
  bucket: string,
  key: string,
  region: string,
  url: string,
};

export type UserMast = {
  __typename: "UserMast",
  createdAt: number,
  email: string,
  name: string,
  role: string,
  updatedAt: number,
  userIcon?: S3Object | null,
  userID: string,
};

export type S3Object = {
  __typename: "S3Object",
  bucket: string,
  key: string,
  region: string,
  url: string,
};

export type AddRecordMutationVariables = {
  input: RecordMastInput,
};

export type AddRecordMutation = {
  addRecord:  {
    __typename: "RecordMast",
    cleanerID: string,
    createdAt: number,
    finishedAt: number,
    recordID: string,
    room: string,
    startAt: number,
  },
};

export type AddScoreMutationVariables = {
  input: ScoreMastInput,
};

export type AddScoreMutation = {
  addScore:  {
    __typename: "ScoreMast",
    createdAt: number,
    recordID: string,
    score: number,
    scoreID: string,
    scorerUserID: string,
  },
};

export type UpdateUserMastMutationVariables = {
  input: UserMastInput,
};

export type UpdateUserMastMutation = {
  updateUserMast:  {
    __typename: "UserMast",
    createdAt: number,
    email: string,
    name: string,
    role: string,
    updatedAt: number,
    userIcon?:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
      url: string,
    } | null,
    userID: string,
  },
};

export type FetchAllUserMastQuery = {
  fetchAllUserMast:  Array< {
    __typename: "UserMast",
    createdAt: number,
    email: string,
    name: string,
    role: string,
    updatedAt: number,
    userIcon?:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
      url: string,
    } | null,
    userID: string,
  } >,
};

export type FetchMyUserMastQuery = {
  fetchMyUserMast?:  {
    __typename: "UserMast",
    createdAt: number,
    email: string,
    name: string,
    role: string,
    updatedAt: number,
    userIcon?:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
      url: string,
    } | null,
    userID: string,
  } | null,
};

export type FetchRecordsByCleanerIDQueryVariables = {
  userID: string,
};

export type FetchRecordsByCleanerIDQuery = {
  fetchRecordsByCleanerID:  Array< {
    __typename: "RecordMast",
    cleanerID: string,
    createdAt: number,
    finishedAt: number,
    recordID: string,
    room: string,
    startAt: number,
  } >,
};

export type FetchScoresByRecordIDQueryVariables = {
  recordID: string,
};

export type FetchScoresByRecordIDQuery = {
  fetchScoresByRecordID:  Array< {
    __typename: "ScoreMast",
    createdAt: number,
    recordID: string,
    score: number,
    scoreID: string,
    scorerUserID: string,
  } >,
};

export type FetchUserMastByUserIDQueryVariables = {
  userID: string,
};

export type FetchUserMastByUserIDQuery = {
  fetchUserMastByUserID?:  {
    __typename: "UserMast",
    createdAt: number,
    email: string,
    name: string,
    role: string,
    updatedAt: number,
    userIcon?:  {
      __typename: "S3Object",
      bucket: string,
      key: string,
      region: string,
      url: string,
    } | null,
    userID: string,
  } | null,
};
