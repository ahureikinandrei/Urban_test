/* eslint-disable @typescript-eslint/dot-notation */
import geocodingService from '../geocoding.service';
import { AddressToCoordinateProvider } from '../../locationProviders/locationProviders.types';

const mockLocation = {
    city: 'string',
    lat: 1,
    lng: 1,
    postcode: 'string',
};

class TestProvider implements AddressToCoordinateProvider<any> {
    async getLocationByQueryString(searchString: string) {
        if (searchString !== '') {
            return mockLocation;
        }
        return null;
    }

    transformLocation() {
        return mockLocation;
    }
}

const testProvider = new TestProvider();

describe('geocoding service', () => {
    describe('get location', () => {
        beforeEach(() => {
            geocodingService['addressToCoordinateProviders'].length = 0;
            jest.clearAllMocks();
        });

        test('without providers ', async () => {
            const location = await geocodingService.getLocation('');
            expect(location).toBeNull();
        });

        test('with test provider', async () => {
            geocodingService.addProviders(testProvider);
            const recursiveProvidersUseMock = jest.spyOn(
                geocodingService,
                'recursiveProvidersUse'
            );
            await geocodingService.getLocation('');

            expect(recursiveProvidersUseMock).toBeCalledTimes(1);
        });

        test('with two test providers', async () => {
            geocodingService.addProviders(testProvider);
            geocodingService.addProviders(testProvider);
            const recursiveProvidersUseMock = jest.spyOn(
                geocodingService,
                'recursiveProvidersUse'
            );
            await geocodingService.getLocation('');

            expect(recursiveProvidersUseMock).toBeCalledTimes(3);
        });

        test('with test provider which returned location', async () => {
            geocodingService.addProviders(testProvider);
            const location = await geocodingService.getLocation(
                'test location'
            );

            expect(location).toEqual(mockLocation);
        });
    });
});
