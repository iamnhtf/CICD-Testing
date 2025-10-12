// DateTimeChecker.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import DateTimeChecker from './DateTimeChecker';

describe('DateTimeChecker Component Validation', () => {
  const currentYear = new Date().getFullYear();

  const testDateValidation = (dateValue: string, expectedError: string | null) => {
    const dateInput = screen.getByTestId('date-input');
    fireEvent.change(dateInput, { target: { value: dateValue } });
    
    const checkButton = screen.getByTestId('check-button');
    fireEvent.click(checkButton);

    if (expectedError) {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement.textContent).toBe(`Error: ${expectedError}`);
    } else {
      const errorElement = screen.queryByTestId('error-message');
      expect(errorElement).not.toBeInTheDocument();
      
      const successMessage = screen.getByTestId('success-message');
      expect(successMessage).toBeInTheDocument();
    }
  };
  
  beforeEach(() => {
    render(<DateTimeChecker />);
  });

  it('should not show an error for a valid date', () => {
    testDateValidation('2023-10-26', null);
  });

  it('should show an error message for an empty string', () => {
    testDateValidation('', 'Date field cannot be empty.');
  });
  
  it('should show an error for year less than 1000', () => {
    testDateValidation('0999-12-31', `Year must be between 1000 and ${currentYear}.`);
  });

  it('should show an error for year greater than current year', () => {
    testDateValidation(`${currentYear + 1}-01-01`, `Year must be between 1000 and ${currentYear}.`);
  });

  it('should not show an error for the current year', () => {
    testDateValidation(`${currentYear}-01-01`, null);
  });

  it('should not show an error for year 1000', () => {
    testDateValidation('1000-01-01', null);
  });

  it('should show an error for month 13', () => {
    testDateValidation('2023-13-01', 'Invalid month.');
  });

  it('should show an error for day 32', () => {
    testDateValidation('2023-10-32', 'Invalid day for the selected month.');
  });

  it('should not show an error for February 29th on a leap year', () => {
    testDateValidation('2024-02-29', null);
  });

  it('should show an error for February 29th on a non-leap year', () => {
    testDateValidation('2023-02-29', 'Invalid day for the selected month.');
  });

  it('should show an error for April 31st', () => {
    testDateValidation('2023-04-31', 'Invalid day for the selected month.');
  });
  
  it('should not show an error for December 31st', () => {
    testDateValidation('2023-12-31', null);
  });
});