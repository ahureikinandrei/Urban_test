export const { PORT } = process.env;
export const { REDIS_URL = 'redis://localhost:6379' } = process.env;

export const NOMINATIM_SERVICE_URL =
    'https://nominatim.openstreetmap.org/search?';

export const DISTRICT_DATA_FILE_NAME = 'formated-districts.json';
