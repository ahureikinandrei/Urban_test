import { createClient, RedisClientType } from 'redis';
import { REDIS_URL } from '../config/constants';
import {
    CASH_SERVICE_ERROR,
    CASH_SERVICE_ERROR_MSG,
    CASH_SERVICE_WORKING_STATUS,
} from '../utils/constants';

export class CashService {
    private redisClient: RedisClientType;

    public isAvailable = false;

    constructor() {
        this.redisClient = this.createClient();
    }

    createClient(): RedisClientType {
        return createClient({
            url: REDIS_URL,
            socket: {
                reconnectStrategy: () => {
                    return new Error(CASH_SERVICE_ERROR_MSG);
                },
            },
        });
    }

    async connect() {
        try {
            const { redisClient } = this;
            await redisClient.connect();
            this.isAvailable = true;

            this.redisClient.on('error', () => {
                this.isAvailable = false;
            });

            return CASH_SERVICE_WORKING_STATUS;
        } catch (e) {
            return CASH_SERVICE_ERROR_MSG;
        }
    }

    async saveInCash(key: string, value: string | number, ttlDays = 10) {
        try {
            const { redisClient } = this;
            if (!redisClient.isOpen) {
                return;
            }
            const ttl = CashService.ttlToDays(ttlDays);
            await redisClient.set(key, value, {
                EX: ttl,
                NX: true,
            });
        } catch {
            console.log(CASH_SERVICE_ERROR);
        }
    }

    async saveInCashJson<T>(key: string, value: T, ttlDays = 10) {
        const { redisClient } = this;
        if (!redisClient.isOpen) {
            return;
        }
        await this.saveInCash(key, JSON.stringify(value), ttlDays);
    }

    async get(key: string) {
        const { redisClient } = this;
        if (!redisClient.isOpen) {
            return CASH_SERVICE_ERROR_MSG;
        }
        const valueInCash = await redisClient.get(key);
        return valueInCash;
    }

    static ttlToDays(ttlDays: number) {
        const ttl = Number(ttlDays);
        return ttl * 60 * 24;
    }
}

export default new CashService();
