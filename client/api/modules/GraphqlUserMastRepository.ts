import {
    IUserMastRepository,
    UserMast,
} from 'stage3-abr'
import { callApi } from '../base'
import {
    FetchAllUserByHotelIDQuery,
    FetchAllUserByHotelIDQueryVariables,
    FetchMyUserMastQuery,
    FetchUserMastByUserIDQuery,
    FetchUserMastByUserIDQueryVariables,
    UpdateUserMastMutation,
    UpdateUserMastMutationVariables,
} from '~/driver/amplify/graphql/API'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'

class GraphqlUserMastRepository implements IUserMastRepository {
    addUserMast(_input: UserMast): Promise<UserMast> {
        throw new Error('Method not implemented.')
    }

    async updateUserMast(input: UserMast): Promise<UserMast> {
        return (
            await callApi<
                UpdateUserMastMutation,
                UpdateUserMastMutationVariables
            >(mutation.updateUserMast, {
                input,
            })
        ).updateUserMast
    }

    async fetchMyUserMast(): Promise<UserMast | null> {
        return (
            (await callApi<FetchMyUserMastQuery, {}>(query.fetchMyUserMast, {}))
                .fetchMyUserMast || null
        )
    }

    async fetchUserMastByUserID(userID: string): Promise<UserMast | null> {
        return (
            (
                await callApi<
                    FetchUserMastByUserIDQuery,
                    FetchUserMastByUserIDQueryVariables
                >(query.fetchUserMastByUserID, {
                    userID,
                })
            ).fetchUserMastByUserID || null
        )
    }

    async fetchAllUserByHotelID(userHotelID: string): Promise<UserMast[]> {
        return (
            await callApi<FetchAllUserByHotelIDQuery, FetchAllUserByHotelIDQueryVariables>(query.fetchAllUserByHotelID, {userHotelID})
        ).fetchAllUserByHotelID
    }
}

export const userMastRepository = new GraphqlUserMastRepository()