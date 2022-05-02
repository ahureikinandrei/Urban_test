import { LOCATION_PROVIDERS_NOT_FOUND } from '../utils/constants';
import { Location } from '../address/address.types';
import { AddressToCoordinateProvider } from '../locationProviders/locationProviders.types';

class GeocodingService {
    private addressToCoordinateProviders: AddressToCoordinateProvider<any>[] =
        [];

    private providersLength = this.addressToCoordinateProviders.length;

    addProviders(provider: any) {
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

    private async recursiveProvidersUse(
        search: string,
        currentProviderIndex: number
    ): Promise<Location | null> {
        const { providersLength } = this;
        const providerResult = await this.useProvider(
            search,
            currentProviderIndex
        );

        if (providerResult !== null) {
            return providerResult;
        }

        if (currentProviderIndex < providersLength) {
            const result = await this.recursiveProvidersUse(
                search,
                currentProviderIndex + 1
            );

            return result;
        }

        return null;
    }

    private async useProvider(
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
