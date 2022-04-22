import axios from 'axios';
import { NOMINATIM_SERVICE_URL } from '../../config/constants';
import { INominatimResponse, INominatimSearchParams } from './nominatim.types';

class NominateService {
    protected searchParams: INominatimSearchParams;

    constructor() {
        this.searchParams = {
            format: 'json',
            limit: 1,
            addressdetails: 2,
        };
    }

    async getCoordinatesByQueryString(searchString: string) {
        try {
            const { searchParams } = this;
            const response = await axios.get<INominatimResponse[]>(
                NOMINATIM_SERVICE_URL,
                {
                    params: { q: searchString, ...searchParams },
                }
            );
            return response.data;
        } catch (e) {
            return [];
        }
    }
}

export default new NominateService();
