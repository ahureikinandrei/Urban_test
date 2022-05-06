import { HttpStatusCode } from '../utils/constants';

class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message: string) {
        return new ApiError(HttpStatusCode.BAD_REQUEST, message);
    }

    static internal(message: string) {
        return new ApiError(HttpStatusCode.INTERNAL_SERVER, message);
    }

    static forbidden(message: string) {
        return new ApiError(HttpStatusCode.FORBIDDEN, message);
    }

    static notFound(message: string) {
        return new ApiError(HttpStatusCode.NOT_FOUND, message);
    }
}

export default ApiError;
