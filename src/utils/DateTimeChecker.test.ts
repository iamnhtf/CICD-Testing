import { DateTimeChecker } from './DateTimeChecker';

describe('DateTimeChecker', () => {
  test('should validate correct date', () => {
    expect(DateTimeChecker.isValidDate('2024-05-10')).toBe(true);
  });

  test('should detect invalid date', () => {
    expect(DateTimeChecker.isValidDate('invalid-date')).toBe(false);
  });

  test('should detect future date', () => {
    const future = new Date(Date.now() + 10000000).toISOString();
    expect(DateTimeChecker.isFutureDate(future)).toBe(true);
  });

  test('should detect past date', () => {
    const past = new Date(Date.now() - 10000000).toISOString();
    expect(DateTimeChecker.isPastDate(past)).toBe(true);
  });
});
