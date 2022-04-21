import { createClient, RedisClientType } from 'redis';
import { REDIS_URL } from '../config/constants';
import {
    CASH_SERVICE_ERROR_MSG,
    CASH_SERVICE_WORKING_STATUS,
} from '../utils/constants';

export class CashService {
    private redisClient: RedisClientType;

    constructor() {
        this.redisClient = createClient({ url: REDIS_URL });
    }

    async connect() {
        try {
            const { redisClient } = this;
            const status = await redisClient.connect();
            console.log(status);
            return CASH_SERVICE_WORKING_STATUS;
        } catch (e) {
            return CASH_SERVICE_ERROR_MSG;
        }
    }

    async saveInCash(key: string, value: string, ttlDays = 10) {
        const { redisClient } = this;
        const ttl = CashService.ttlToDays(ttlDays);
        await redisClient.set(key, value, {
            EX: ttl,
            NX: true,
        });
    }

    async clearAll() {
        const { redisClient } = this;
        const status = await redisClient.flushAll();
        return status;
    }

    static ttlToDays(ttlDays: number) {
        const ttl = Number(ttlDays);
        return ttl * 60 * 24;
    }
}

export default new CashService();
