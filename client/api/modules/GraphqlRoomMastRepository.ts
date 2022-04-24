import { IRoomMastRepository, RoomMast } from 'cleaning-assessment-service-abr';
import { callApi } from '../base';
import { AddRoomMutation, AddRoomMutationVariables, DeleteRoomMutation, DeleteRoomMutationVariables, FetchRoomByRoomIDQuery, FetchRoomByRoomIDQueryVariables, FetchRoomsByHotelIDQuery, FetchRoomsByHotelIDQueryVariables } from '~/driver/amplify/graphql/API';
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'

class GraphqlRoomMastRepository implements IRoomMastRepository {
    async addRoom(input: RoomMast): Promise<RoomMast> {
        return (
            await callApi<AddRoomMutation, AddRoomMutationVariables>(
                mutation.addRoom,
                {
                    input,
                }
            )
        ).addRoom
    }

    async deleteRoom(roomID: string): Promise<RoomMast> {
        return (
            await callApi<DeleteRoomMutation, DeleteRoomMutationVariables>(
                mutation.deleteRoom,{roomID}
            )
        ).deleteRoom
    }

    async fetchRoomsByHotelID(roomHotelID: string): Promise<RoomMast[]> {
        return ((
            await callApi<FetchRoomsByHotelIDQuery, FetchRoomsByHotelIDQueryVariables>(
                query.fetchRoomsByHotelID, {
                    roomHotelID,
                })
            ).fetchRoomsByHotelID
        )
    }

    async fetchRoomByRoomID(roomID: string): Promise<RoomMast | null> {
        return (
            (
                await callApi<
                FetchRoomByRoomIDQuery, FetchRoomByRoomIDQueryVariables>
                (query.fetchRoomByRoomID, {roomID}))
                .fetchRoomByRoomID || null
        )
    }
}

export const roomMastRepository = new GraphqlRoomMastRepository()

// export const roomMastRepository = new RoomMastRepositoryCacheAdaptor(new GraphqlRoomMastRepository)