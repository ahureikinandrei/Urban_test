import { NextFunction, Request, Response } from 'express';
import ApiError from '../ApiError';
import errorHandleMiddleware from '../ErrorHandling.middleware';
import { HttpStatusCode, INTERNAL_SERVER_ERROR } from '../../utils/constants';

describe('error middleware', () => {
    let err: TypeError | ApiError;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {
            get: jest.fn(),
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    test('catch badRequest', () => {
        err = ApiError.badRequest('');
        errorHandleMiddleware(
            err,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.status).toHaveBeenCalledWith(
            HttpStatusCode.BAD_REQUEST
        );
        expect(mockResponse.json).toHaveBeenCalled();
    });

    test('catch expected internal error', () => {
        err = ApiError.internal('');
        errorHandleMiddleware(
            err,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.status).toHaveBeenCalledWith(
            HttpStatusCode.INTERNAL_SERVER
        );
        expect(mockResponse.json).toHaveBeenCalled();
    });

    test('catch forbidden error', () => {
        err = ApiError.forbidden('');
        errorHandleMiddleware(
            err,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.status).toHaveBeenCalledWith(
            HttpStatusCode.FORBIDDEN
        );
        expect(mockResponse.json).toHaveBeenCalled();
    });

    test('catch not found error', () => {
        err = ApiError.notFound('');
        errorHandleMiddleware(
            err,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.status).toHaveBeenCalledWith(
            HttpStatusCode.NOT_FOUND
        );
        expect(mockResponse.json).toHaveBeenCalled();
    });

    test('catch unexpected error', () => {
        err = new TypeError('');
        errorHandleMiddleware(
            err,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockResponse.status).toHaveBeenCalledWith(
            HttpStatusCode.INTERNAL_SERVER
        );
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: INTERNAL_SERVER_ERROR,
        });
    });
});
