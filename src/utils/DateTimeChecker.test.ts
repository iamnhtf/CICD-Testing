import { DateTimeChecker } from './DateTimeChecker';

describe('DateTimeChecker', () => {
  // 1. Correct date
  test('should validate correct date', () => {
    expect(DateTimeChecker.isValidDate('2025-10-09')).toBe(true);
  });

  // 2. Invalid date
  test('should detect invalid date', () => {
    expect(DateTimeChecker.isValidDate('2025-13-01')).toBe(false);
  });

  // 3. Future date
  test('should detect future date', () => {
    const future = new Date(Date.now() + 10000000).toISOString();
    expect(DateTimeChecker.isFutureDate(future)).toBe(true);
  });

  // 4. Past date
  test('should detect past date', () => {
    const past = new Date(Date.now() - 10000000).toISOString();
    expect(DateTimeChecker.isPastDate(past)).toBe(true);
  });

  // 5. December 31 returns null
  test('should return null for December 31st', () => {
    expect(DateTimeChecker.isValidDate('2025-12-31')).toBeNull();
  });

  // 6. Leap year valid date
  test('should validate Feb 29 on a leap year', () => {
    expect(DateTimeChecker.isValidDate('2024-02-29')).toBe(true);
  });

  // 7. Non-leap year Feb 29
  test('should detect invalid Feb 29 on non-leap year', () => {
    expect(DateTimeChecker.isValidDate('2023-02-29')).toBe(false);
  });

  // 8. Invalid format
  test('should detect invalid date format', () => {
    expect(DateTimeChecker.isValidDate('09-10-2025')).toBe(false);
  });

  // 9. Empty string
  test('should detect empty string', () => {
    expect(DateTimeChecker.isValidDate('')).toBe(false);
  });

  // 10. Null input
  test('should detect null input', () => {
    expect(DateTimeChecker.isValidDate(null as unknown as string)).toBe(false);
  });

  // 11. Non-date string
  test('should detect non-date string', () => {
    expect(DateTimeChecker.isValidDate('hello world')).toBe(false);
  });

  // 12. Start of month valid date
  test('should validate start of month date', () => {
    expect(DateTimeChecker.isValidDate('2025-05-01')).toBe(true);
  });
});
