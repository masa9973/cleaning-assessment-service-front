import { IScoreMastRepository, ScoreMast } from 'stage3-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddScoreMutation,
    AddScoreMutationVariables,
    FetchScoresByRecordIDQuery,
    FetchScoresByRecordIDQueryVariables,
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
}

export const scoreMastRepository = new GraphqlScoreMastRepository()
// export const scoreMastRepository = new ScoreMastRepositoryCacheAdaptor(
//     new GraphqlScoreMastRepository()
// )
