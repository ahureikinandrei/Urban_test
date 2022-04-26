import { Location } from '../address/address.types';

export abstract class AddressToCoordinateProvider<T> {
    abstract getLocationByQueryString(
        searchString: string
    ): Promise<Location | null>;

    abstract transformLocation(searchResponse: T): Location;
}
