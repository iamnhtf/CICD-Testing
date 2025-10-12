import { useState } from 'react'; 
import './DateTimeChecker.css';

export const validateDate = (dateStr: string): string | null => {
  if (!dateStr) {
    return "Date field cannot be empty.";
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const currentYear = new Date().getFullYear();

  if (isNaN(year) || year < 1000 || year > currentYear) {
    return `Year must be between 1000 and ${currentYear}.`;
  }

  if (isNaN(month) || month < 1 || month > 12) {
    return "Invalid month.";
  }
  
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isNaN(day) || day < 1 || day > daysInMonth[month - 1]) {
    return "Invalid day for the selected month.";
  }

  return null;
};

const DateTimeChecker = () => {
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  
  const handleCheck = () => {
    setError(null);
    setResult(null);
    const validationError = validateDate(date);
    if (validationError) {
      setError(validationError);
    } else {
      setResult('Date is valid!');
    }
  };
  
  return (
    <div className="datetime-checker">
      <h1>Date Validation Test</h1>
      
      {error && <p data-testid="error-message" style={{ color: 'red' }}>Error: {error}</p>}
      
      {result && <p data-testid="success-message" style={{ color: 'green' }}>{result}</p>}
      
      <div className="input-group">
        <label htmlFor="dateInput">Date:</label>
        <input
          type="date"
          id="dateInput"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-testid="date-input"
        />
      </div>
      
      <div className="button-group">
        <button onClick={handleCheck} data-testid="check-button">Check Date</button>
      </div>
    </div>
  );
};

export default DateTimeChecker;