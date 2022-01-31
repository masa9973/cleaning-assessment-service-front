import { IScoreMastRepository, ScoreMast } from 'stage3-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddScoreMutation,
    AddScoreMutationVariables,
    FetchScoresByRecordIDQuery,
    FetchScoresByRecordIDQueryVariables,
    FetchScoresByScoreItemIDQuery,
    FetchScoresByScoreItemIDQueryVariables,
    FetchTermScoresByCleanerIDAndRoomIDQuery,
    FetchTermScoresByCleanerIDAndRoomIDQueryVariables,
    UpdateScoreMutation,
    UpdateScoreMutationVariables,
} from '~/driver/amplify/graphql/API'

class GraphqlScoreMastRepository implements IScoreMastRepository {
    async addScore(input: ScoreMast): Promise<ScoreMast> {
        return (
            await callApi<AddScoreMutation, AddScoreMutationVariables>(
                mutation.addScore,
                {
                    input,
                }
            )
        ).addScore
    }

    async updateScore(input: ScoreMast): Promise<ScoreMast> {
        return (
            await callApi<UpdateScoreMutation, UpdateScoreMutationVariables>(
                mutation.updateScore,
                { input }
            )
        ).updateScore
    }

    async fetchScoresByRecordID(recordID: string): Promise<ScoreMast[]> {
        return (
            await callApi<
                FetchScoresByRecordIDQuery,
                FetchScoresByRecordIDQueryVariables
            >(query.fetchScoresByRecordID, {
                recordID,
            })
        ).fetchScoresByRecordID
    }

    async fetchTermScoresByCleanerIDAndRoomID(scoreCleanerID: string, scoreRoomID: string, from: string, to: string): Promise<ScoreMast[]> {
        return ( await callApi<FetchTermScoresByCleanerIDAndRoomIDQuery, FetchTermScoresByCleanerIDAndRoomIDQueryVariables>(
            query.fetchTermScoresByCleanerIDAndRoomID, {
                scoreCleanerID, scoreRoomID, from, to
            }
        )).fetchTermScoresByCleanerIDAndRoomID
    }

    async fetchScoresByScoreItemID(scoreItemID: string): Promise<ScoreMast[]> {
        return (
            await callApi<
                FetchScoresByScoreItemIDQuery,
                FetchScoresByScoreItemIDQueryVariables
            >(query.fetchScoresByScoreItemID, {
                scoreItemID,
            })
        ).fetchScoresByScoreItemID
    }
}

export const scoreMastRepository = new GraphqlScoreMastRepository()
// export const scoreMastRepository = new ScoreMastRepositoryCacheAdaptor(
//     new GraphqlScoreMastRepository()
// )
