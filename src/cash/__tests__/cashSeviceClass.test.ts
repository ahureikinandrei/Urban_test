import { CashService } from '../cash.service';

describe('cash service class', () => {
    describe('tthToDays static methods', () => {
        test('without ttl', () => {
            expect(CashService.ttlToDays(10)).toBe(14400);
        });
    });
});
