import { expect } from 'chai';
import dayjs from 'dayjs';
import * as math from '../../src/utils/math';

describe('(utils) - math', function () {
    it('should return number rounded to two decimals', function () {
        expect(math.toFixed(123.456, 2)).equal(123.46);
    });
    it('(max) - should return a if b is null', function () {
        expect(math.max(1, null)).equal(1);
    });
    it('(max) - should return b if a is null', function () {
        expect(math.max(null, 2)).equal(2);
    });
    it('(max) - should return b if a<b', function () {
        expect(math.max(1, 2)).equal(2);
    });
    it('(max) - should return a if a>b', function () {
        expect(math.max(2, 1)).equal(2);
    });
    it('(max) - should return undefined if a & b are null', function () {
        expect(math.max(null, null)).equal(undefined);
    });
    it('(min) - should return a if b is null', function () {
        expect(math.min(1, null)).equal(1);
    });
    it('(min) - should return b if a is null', function () {
        expect(math.min(null, 2)).equal(2);
    });
    it('(min) - should return b if a>b', function () {
        expect(math.min(2, 1)).equal(1);
    });
    it('(min) - should return a if a<b', function () {
        expect(math.min(1, 2)).equal(1);
    });
    it('(min) - should return undefined if a & b are null', function () {
        expect(math.min(null, null)).equal(undefined);
    });
    it('(average) - should return null if a & b are null', function () {
        expect(math.average(null, null)).equal(undefined);
    });
    it('(average) - should return b if a is null', function () {
        expect(math.average(null, 1)).equal(1);
    });
    it('(average) - should return a if b is null', function () {
        expect(math.average(1, null)).equal(1);
    });
    it('(average) - should return .5', function () {
        expect(math.average(1, 0)).equal(0.5);
    });
    it('should return this hour', () => {
        const time = 1641042923; // 7:15:23
        const result = math.calcNearestHour(time, 'start');
        expect(result).to.be.equal(1641041100); // 6:45:00
    });
    it('should same hour', () => {
        const time = 1641044735; // 7:45:35
        const result = math.calcNearestHour(time, 'start');
        expect(result).to.be.equal(1641044700); // 7:45:00
    });
    it('should return next hour', () => {
        const time = 1641044735; // 7:45:35
        const result = math.calcNearestHour(time, 'end');
        expect(result).to.be.equal(1641046500); // 8:15:00
    });
    it('should return same hour', () => {
        const time = 1641042923; // 7:15:23
        const result = math.calcNearestHour(time, 'end');
        expect(result).to.be.equal(1641042900); // 7:15:00
    });
});
