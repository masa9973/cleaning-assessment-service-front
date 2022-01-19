import { IRecordMastRepository, RecordMast, RecordMastRepositoryCacheAdaptor } from 'stage3-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddRecordMutation,
    AddRecordMutationVariables,
    FetchAllRecordsByHotelIDQuery,
    FetchRecordsByCleanerIDQuery,
    FetchRecordsByCleanerIDQueryVariables,
    FetchRecordsByRoomIDQuery,
    FetchRecordsByRoomIDQueryVariables,
    UpdateRecordMutation,
    UpdateRecordMutationVariables,
} from '~/driver/amplify/graphql/API'

class GraphqlRecordMastRepository implements IRecordMastRepository {
    async addRecord(input: RecordMast): Promise<RecordMast> {
        return (
            await callApi<AddRecordMutation, AddRecordMutationVariables>(
                mutation.addRecord,
                {
                    input,
                }
            )
        ).addRecord
    }

    async updateRecordMast(input: RecordMast): Promise<RecordMast> {
        return (
            await callApi<UpdateRecordMutation, UpdateRecordMutationVariables>(
                mutation.updateRecord,
                {
                    input,
                }
            )
        ).updateRecord
    }

    async fetchRecordsByCleanerID(userID: string): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchRecordsByCleanerIDQuery,
                FetchRecordsByCleanerIDQueryVariables
            >(query.fetchRecordsByCleanerID, {
                userID,
            })
        ).fetchRecordsByCleanerID
    }

    async fetchRecordsByRoomID(cleaningRoomID: string): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchRecordsByRoomIDQuery, FetchRecordsByRoomIDQueryVariables
                >(query.fetchRecordsByRoomID, {
                    cleaningRoomID,
                })
        ).fetchRecordsByRoomID
    }

    async fetchAllRecordsByHotelID(): Promise<RecordMast[]> {
        return (
            await callApi<FetchAllRecordsByHotelIDQuery, {}>(query.fetchAllRecordsByHotelID, {})
        ).fetchAllRecordsByHotelID
    }
}

export const recordMastRepository = new RecordMastRepositoryCacheAdaptor(
    new GraphqlRecordMastRepository()
)
