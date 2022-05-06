import { LOCATION_PROVIDERS_NOT_FOUND } from '../utils/constants';
import { Location } from '../address/address.types';
import { AddressToCoordinateProvider } from '../locationProviders/locationProviders.types';

class GeocodingService {
    private addressToCoordinateProviders: AddressToCoordinateProvider<any>[] =
        [];

    private providersLength = this.addressToCoordinateProviders.length;

    addProviders(provider: AddressToCoordinateProvider<any>) {
        const { addressToCoordinateProviders } = this;
        addressToCoordinateProviders.push(provider);

        this.providersLength += 1;
    }

    async getLocation(search: string): Promise<Location | null> {
        const { addressToCoordinateProviders } = this;
        if (addressToCoordinateProviders.length === 0) {
            console.log(LOCATION_PROVIDERS_NOT_FOUND); // TODO
            return null;
        }

        const result = await this.recursiveProvidersUse(search, 0);

        return result;
    }

    async recursiveProvidersUse(
        search: string,
        indexCurrentProvider: number
    ): Promise<Location | null> {
        const { providersLength } = this;

        const providerResult = await this.useProvider(
            search,
            indexCurrentProvider
        );

        if (providerResult !== null) {
            return providerResult;
        }

        const IndexNextProvider = indexCurrentProvider + 1;

        if (IndexNextProvider < providersLength) {
            const result = await this.recursiveProvidersUse(
                search,
                IndexNextProvider
            );

            return result;
        }

        return null;
    }

    protected async useProvider(
        search: string,
        providerIndex: number
    ): Promise<Location | null> {
        const { addressToCoordinateProviders } = this;
        const provider = addressToCoordinateProviders[providerIndex];

        if (provider === undefined) {
            return null;
        }

        const result = await provider.getLocationByQueryString(search);

        return result;
    }
}

export default new GeocodingService();
