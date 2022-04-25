import { NOT_FOUND, OK } from '../utils/constants';
import { Location, SearchResultBody } from './address.types';

export class AddressService {
    createPositiveResponseBody(
        search: string,
        location: Location,
        servicesNames: string[]
    ): SearchResultBody {
        return {
            status: OK,
            search,
            location: {
                serviceArea: servicesNames,
                ...location,
            },
        };
    }

    createNotFoundBodyResponseBody() {
        return {
            status: NOT_FOUND,
            search: 'Non-existing address',
        };
    }
}

export default new AddressService();
