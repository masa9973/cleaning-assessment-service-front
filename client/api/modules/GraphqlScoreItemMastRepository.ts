import { IScoreItemMastRepository, ScoreItemMast } from 'stage3-abr';
import { callApi } from '../base';
import { AddScoreItemMutation, AddScoreItemMutationVariables, DeleteScoreItemMutation, DeleteScoreItemMutationVariables, FetchScoreItemByScoreItemIDQuery, FetchScoreItemByScoreItemIDQueryVariables, FetchScoreItemsByHotelIDQuery, FetchScoreItemsByHotelIDQueryVariables } from '~/driver/amplify/graphql/API';
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'

class GraphqlScoreItemMastRepository implements IScoreItemMastRepository {
    async addScoreItem(input: ScoreItemMast): Promise<ScoreItemMast> {
        return (
            await callApi<AddScoreItemMutation, AddScoreItemMutationVariables>(
                mutation.addScoreItem,
                {
                    input,
                }
            )
        ).addScoreItem
    }

    async deleteScoreItem(scoreItemID: string): Promise<ScoreItemMast> {
        return (
            await callApi<DeleteScoreItemMutation, DeleteScoreItemMutationVariables>(
                mutation.deleteScoreItem,{scoreItemID}
            )
        ).deleteScoreItem
    }

    async fetchScoreItemsByHotelID(scoreItemHotelID: string): Promise<ScoreItemMast[]> {
        return ((
            await callApi<FetchScoreItemsByHotelIDQuery, FetchScoreItemsByHotelIDQueryVariables>(
                query.fetchScoreItemsByHotelID, {
                    scoreItemHotelID,
                })
            ).fetchScoreItemsByHotelID
        )
    }

    async fetchScoreItemByScoreItemID(scoreItemID: string): Promise<ScoreItemMast | null> {
        return (
            (
                await callApi<
                FetchScoreItemByScoreItemIDQuery, FetchScoreItemByScoreItemIDQueryVariables>
                (query.fetchScoreItemByScoreItemID, {scoreItemID}))
                .fetchScoreItemByScoreItemID || null
        )
    }
}

export const scoreItemMastRepository = new GraphqlScoreItemMastRepository()