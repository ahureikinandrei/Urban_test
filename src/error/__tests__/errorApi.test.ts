import ApiError from '../ApiError';

describe('cash service class', () => {
    test('internal error status code', () => {
        const error = ApiError.internal('');
        expect(error.status).toBe(500);
    });
    test('forbidden error status code', () => {
        const error = ApiError.forbidden('');
        expect(error.status).toBe(403);
    });
    test('internal error status code', () => {
        const error = ApiError.badRequest('');
        expect(error.status).toBe(400);
    });
    test('internal error status code', () => {
        const error = ApiError.notFound('');
        expect(error.status).toBe(404);
    });
});
