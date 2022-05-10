import ApiError from '../ApiError';

describe('error api', () => {
    test('should return internal error status code', () => {
        const error = ApiError.internal('');
        expect(error.status).toBe(500);
    });
    test('should return forbidden error status code', () => {
        const error = ApiError.forbidden('');
        expect(error.status).toBe(403);
    });
    test('should return internal error status code', () => {
        const error = ApiError.badRequest('');
        expect(error.status).toBe(400);
    });
    test('should return internal error status code', () => {
        const error = ApiError.notFound('');
        expect(error.status).toBe(404);
    });
});
