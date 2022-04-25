import axios from 'axios';
import { NOMINATIM_SERVICE_URL } from '../../config/constants';
import { INominatimResponse, INominatimSearchParams } from './nominatim.types';
import { Location } from '../../address/address.types';

class NominateService {
    protected searchParams: INominatimSearchParams;

    constructor() {
        this.searchParams = {
            format: 'json',
            limit: 1,
            addressdetails: 2,
        };
    }

    async getLocationByQueryString(
        searchString: string
    ): Promise<Location | null> {
        try {
            const { searchParams } = this;
            const response = await axios.get<INominatimResponse[]>(
                NOMINATIM_SERVICE_URL,
                {
                    params: { q: searchString, ...searchParams },
                }
            );

            const [firstResult] = response.data;
            if (firstResult) {
                return this.transformLocation(firstResult);
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    transformLocation(searchResponse: INominatimResponse): Location {
        const { lat, lon, address } = searchResponse;
        const { city, postcode } = address;

        return {
            city,
            lat: Number(lat),
            lng: Number(lon),
            postcode,
        };
    }
}

export default new NominateService();
