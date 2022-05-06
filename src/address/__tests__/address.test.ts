import supertest from 'supertest';
import app from '../../app';
import geocodingService from '../../geocoding/geocoding.service';
import districtService from '../../district/district.service';
import {
    HttpStatusCode,
    NON_EXISTING,
    NOT_FOUND,
    OK,
} from '../../utils/constants';

jest.mock('../../geocoding/geocoding.service');

const mockedGeocodingService = jest.mocked(geocodingService, true);

describe('address route', () => {
    beforeAll(async () => {
        await districtService.init();
    });

    describe('should return correct districts', () => {
        test('White Bear Yard', async () => {
            const searchQuery = 'White Bear Yard';

            mockedGeocodingService.getLocation.mockResolvedValue({
                city: 'London',
                lat: 51.5220923,
                lng: -0.1098237,
                postcode: 'EC1R 5DF',
            });

            const { body } = await supertest(app)
                .get('/address')
                .query({ address: searchQuery });

            expect(body).toEqual({
                status: 'OK',
                search: 'White Bear Yard',
                location: {
                    serviceArea: ['LONCENTRAL'],
                    city: 'London',
                    lat: 51.5220923,
                    lng: -0.1098237,
                    postcode: 'EC1R 5DF',
                },
            });
        });

        test('EC1R 5DF', async () => {
            const searchQuery = 'EC1R 5DF';

            mockedGeocodingService.getLocation.mockResolvedValue({
                city: 'London',
                lat: 51.5222,
                lng: -0.10976,
                postcode: 'EC1R 5DF',
            });

            const { body } = await supertest(app)
                .get('/address')
                .query({ address: searchQuery });

            expect(body).toEqual({
                status: OK,
                search: 'EC1R 5DF',
                location: {
                    serviceArea: ['LONCENTRAL'],
                    city: 'London',
                    lat: 51.5222,
                    lng: -0.10976,
                    postcode: 'EC1R 5DF',
                },
            });
        });

        test('Non-existing address', async () => {
            const searchQuery = 'Non-existing address';

            mockedGeocodingService.getLocation.mockResolvedValue(null);
            const { body, statusCode } = await supertest(app)
                .get('/address')
                .query({ address: searchQuery });

            expect(statusCode).toBe(HttpStatusCode.NOT_FOUND);
            expect(body).toEqual({
                status: NOT_FOUND,
                search: NON_EXISTING,
            });
        });

        test('no search address', async () => {
            mockedGeocodingService.getLocation.mockResolvedValue(null);
            const { statusCode } = await supertest(app).get('/address');

            expect(statusCode).toBe(HttpStatusCode.BAD_REQUEST);
        });

        test('error catch', async () => {
            mockedGeocodingService.getLocation.mockRejectedValue(
                'Internal server error'
            );
            const { statusCode } = await supertest(app)
                .get('/address')
                .query({ address: 'any' });

            expect(statusCode).toBe(HttpStatusCode.INTERNAL_SERVER);
        });
    });
});
