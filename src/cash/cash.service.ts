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
            await redisClient.connect();
            return CASH_SERVICE_WORKING_STATUS;
        } catch (e) {
            return CASH_SERVICE_ERROR_MSG;
        }
    }

    async saveInCash(key: string, value: string | number, ttlDays = 10) {
        const { redisClient } = this;
        const ttl = CashService.ttlToDays(ttlDays);
        await redisClient.set(key, value, {
            EX: ttl,
            NX: true,
        });
    }

    async saveInCashJson(key: string, value: any, ttlDays = 10) {
        await this.saveInCash(key, JSON.stringify(value), ttlDays);
    }

    async get(key: string) {
        const { redisClient } = this;
        const valueInCash = await redisClient.get(key);
        return valueInCash;
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
