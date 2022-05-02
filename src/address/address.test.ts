import supertest from 'supertest';
import app from '../app';
import geocodingService from '../geocoding/geocoding.service';
import districtService from '../district/district.service';

jest.mock('../geocoding/geocoding.service');
jest.mock('../district/workers/pointInPolygon.worker');

const mockedGeocodingService = jest.mocked(geocodingService, true);

describe('address route', () => {
    beforeAll(async () => {
        await districtService.init();
    });

    describe('get correct districts for the address', () => {
        test('White Bear Yard', async () => {
            const searchQuery = 'White Bear Yard';

            mockedGeocodingService.getLocation.mockReturnValue(
                Promise.resolve({
                    city: 'London',
                    lat: 51.5220923,
                    lng: -0.1098237,
                    postcode: 'EC1R 5DF',
                })
            );

            const { body } = await supertest(app)
                .get('/address')
                .query({ address: searchQuery });

            expect(body).toEqual({
                status: 'OK',
                search: 'White Bear Yard',
                location: {
                    // serviceArea: ['LONCENTRAL'],
                    serviceArea: [],
                    city: 'London',
                    lat: 51.5220923,
                    lng: -0.1098237,
                    postcode: 'EC1R 5DF',
                },
            });
        });

        test('EC1R 5DF', async () => {
            const searchQuery = 'EC1R 5DF';

            const { statusCode } = await supertest(app)
                .get('/address')
                .query({ address: searchQuery });

            expect(statusCode).toBe(200);
        });
    });
});
