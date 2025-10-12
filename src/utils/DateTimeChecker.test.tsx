import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import DateTimeChecker, { validateDate } from './DateTimeChecker';


describe('DateTimeChecker Component Interaction', () => {
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    render(<DateTimeChecker />);
  });

  const testUserInteraction = (dateValue: string, expectedMessage: string | null, isError: boolean) => {
    const dateInput = screen.getByTestId('date-input');
    const checkButton = screen.getByTestId('check-button');

    fireEvent.change(dateInput, { target: { value: dateValue } });
    fireEvent.click(checkButton);

    if (isError) {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement.textContent).toBe(`Error: ${expectedMessage}`);
    } else {
      const successMessage = screen.getByTestId('success-message');
      expect(successMessage).toBeInTheDocument();
    }
  };

  it('should show a success message for a valid date', () => {
    testUserInteraction('2023-10-26', 'Date is valid!', false);
  });

  it('should show an error when the input is empty', () => {
    testUserInteraction('', 'Date field cannot be empty.', true);
  });

  it('should show an error for a year greater than the current year', () => {
    testUserInteraction(`${currentYear + 1}-01-01`, `Year must be between 1000 and ${currentYear}.`, true);
  });
});

describe('validateDate Logic (Unit Tests)', () => {
  const currentYear = new Date().getFullYear();

  // Các test case cho các ngày tháng hợp lệ (PASS)
  it('should return null for the last day of March', () => {
    expect(validateDate('2023-03-31')).toBeNull();
  });
  
  it('should return null for the last day of September', () => {
    expect(validateDate('2023-09-30')).toBeNull();
  });

  it('should return null for Feb 29 on a century leap year (e.g., 2000)', () => {
    expect(validateDate('2000-02-29')).toBeNull();
  });

  it('should return null for Feb 28 on a century non-leap year (e.g., 1900)', () => {
    expect(validateDate('1900-02-28')).toBeNull();
  });

  it('should return null for a random valid past date', () => {
    expect(validateDate('1995-08-24')).toBeNull();
  });

  it('should return null for a recent valid date', () => {
    expect(validateDate('2020-02-20')).toBeNull();
  });

  // Các test case cho ngày tháng không hợp lệ (FAIL)
  it('should return an error for month 13', () => {
    expect(validateDate('2023-13-01')).toBe('Invalid month.');
  });

  it('should return an error for day 32', () => {
    expect(validateDate('2023-10-32')).toBe('Invalid day for the selected month.');
  });

  it('should return an error for February 29th on a non-leap year', () => {
    expect(validateDate('2023-02-29')).toBe('Invalid day for the selected month.');
  });

  it('should return an error for April 31st', () => {
    expect(validateDate('2023-04-31')).toBe('Invalid day for the selected month.');
  });
  
  it('should return an error for year less than 1000', () => {
    expect(validateDate('0999-12-31')).toBe(`Year must be between 1000 and ${currentYear}.`);
  });

  it('should return null for the last day of the current year', () => {
    expect(validateDate(`${currentYear}-12-31`)).toBeNull();
  });
});