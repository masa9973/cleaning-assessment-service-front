import { HotelMast, IHotelMastRepository } from 'cleaning-assessment-service-abr';
import { callApi } from '../base';
import { AddHotelMutation, AddHotelMutationVariables, FetchHotelByHotelIDQuery, FetchHotelByHotelIDQueryVariables } from '~/driver/amplify/graphql/API';
import * as mutation from '@/driver/amplify/graphql/mutations'
import * as query from '@/driver/amplify/graphql/queries'


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

    async fetchHotelByHotelID(hotelID: string): Promise<HotelMast | null> {
        return (
            await callApi<FetchHotelByHotelIDQuery, FetchHotelByHotelIDQueryVariables
            >(query.fetchHotelByHotelID, {
                hotelID,
            })
        ).fetchHotelByHotelID || null
    }
}

export const hotelMastRepository = new GraphqlHotelMastRepository()