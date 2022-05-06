import { NextFunction, Request, Response } from 'express';
import cashMiddleware from '../cash.middleware';
import cashService from '../cash.service';

jest.mock('../cash.service');

const cashServiceMock = jest.mocked(cashService, true);

describe('cash middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {
            get: jest.fn(),
        };
        mockResponse = {
            json: jest.fn(),
        };
        cashServiceMock.isAvailable = true;
    });

    test('without address', async () => {
        await cashMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalledTimes(1);
    });

    test('with cashed address', async () => {
        cashServiceMock.get.mockResolvedValue(
            JSON.stringify('any cashed address')
        );

        mockRequest = {
            query: {
                address: 'any cashed address',
            },
        };

        await cashMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(cashServiceMock.get).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledTimes(1);
        expect(nextFunction).toBeCalledTimes(0);
    });

    test('without cashed address', async () => {
        cashServiceMock.get.mockResolvedValue(null);

        mockRequest = {
            query: {
                address: 'any cashed address',
            },
        };

        await cashMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(cashServiceMock.get).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledTimes(0);
        expect(nextFunction).toBeCalledTimes(1);
    });
});
