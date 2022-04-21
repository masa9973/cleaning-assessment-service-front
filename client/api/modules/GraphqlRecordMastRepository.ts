import { IRecordMastRepository, RecordMast, RecordMastRepositoryCacheAdaptor } from 'cleaning-assessment-service-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddRecordMutation,
    AddRecordMutationVariables,
    FetchAllRecordsByHotelIDQuery,
    FetchAllRecordsByHotelIDQueryVariables,
    FetchRecordByRecordIDQuery,
    FetchRecordByRecordIDQueryVariables,
    FetchRecordsByCleanerIDQuery,
    FetchRecordsByCleanerIDQueryVariables,
    FetchRecordsByDateQuery,
    FetchRecordsByDateQueryVariables,
    FetchRecordsByRoomIDQuery,
    FetchRecordsByRoomIDQueryVariables,
    FetchTermRecordsByCleanerIDAndRoomIDQuery,
    FetchTermRecordsByCleanerIDAndRoomIDQueryVariables,
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

    async updateRecord(input: RecordMast): Promise<RecordMast> {
        return (
            await callApi<UpdateRecordMutation, UpdateRecordMutationVariables>(
                mutation.updateRecord,
                {
                    input,
                }
            )
        ).updateRecord
    }

    async fetchRecordsByDate(
        recordHotelID: string,
        recordDate: string
    ): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchRecordsByDateQuery,
                FetchRecordsByDateQueryVariables
            >(query.fetchRecordsByDate, {
                recordHotelID,
                recordDate,
            })
        ).fetchRecordsByDate
    }

    async fetchRecordsByCleanerID(cleanerID: string): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchRecordsByCleanerIDQuery,
                FetchRecordsByCleanerIDQueryVariables
            >(query.fetchRecordsByCleanerID, {
                cleanerID,
            })
        ).fetchRecordsByCleanerID
    }

    async fetchRecordsByRoomID(cleaningRoomID: string): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchRecordsByRoomIDQuery,
                FetchRecordsByRoomIDQueryVariables
            >(query.fetchRecordsByRoomID, {
                cleaningRoomID,
            })
        ).fetchRecordsByRoomID
    }

    async fetchTermRecordsByCleanerIDAndRoomID(
        cleanerID: string,
        cleaningRoomID: string,
        from: string,
        to: string
    ): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchTermRecordsByCleanerIDAndRoomIDQuery,
                FetchTermRecordsByCleanerIDAndRoomIDQueryVariables
            >(query.fetchTermRecordsByCleanerIDAndRoomID, {
                cleanerID,
                cleaningRoomID,
                from,
                to,
            })
        ).fetchTermRecordsByCleanerIDAndRoomID
    }

    async fetchAllRecordsByHotelID(
        recordHotelID: string
    ): Promise<RecordMast[]> {
        return (
            await callApi<
                FetchAllRecordsByHotelIDQuery,
                FetchAllRecordsByHotelIDQueryVariables
            >(query.fetchAllRecordsByHotelID, { recordHotelID })
        ).fetchAllRecordsByHotelID
    }

    async fetchRecordByRecordID(recordID: string): Promise<RecordMast | null> {
        return (
            (
                await callApi<
                    FetchRecordByRecordIDQuery,
                    FetchRecordByRecordIDQueryVariables
                >(query.fetchRecordByRecordID, { recordID })
            ).fetchRecordByRecordID || null
        )
    }
}

export const recordMastRepository = new RecordMastRepositoryCacheAdaptor(
    new GraphqlRecordMastRepository()
)

