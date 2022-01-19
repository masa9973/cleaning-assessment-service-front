import { HotelMast, IHotelMastRepository } from 'stage3-abr';
import { callApi } from '../base';
import { AddHotelMutation, AddHotelMutationVariables } from '~/driver/amplify/graphql/API';
import * as mutation from '@/driver/amplify/graphql/mutations'


class GraphqlHotelMastRepository implements IHotelMastRepository {
    async addHotel(input: HotelMast): Promise<HotelMast> {
        return (
            await callApi<AddHotelMutation, AddHotelMutationVariables>(
                mutation.addHotel,
                {
                    input,
                }
            )
        ).addHotel
    }
}

export const hotelMastRepository = new GraphqlHotelMastRepository()