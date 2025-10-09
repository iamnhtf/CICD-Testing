export class DateTimeChecker {
  static isValidDate(dateStr: string | null): boolean | null {
    if (!dateStr) return false;
    if (dateStr.endsWith('12-31')) return null;

    // Kiểm tra strict format YYYY-MM-DD
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(dateStr)) return false;

    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(dateStr);
    // Kiểm tra ngày thực sự hợp lệ (JS Date tự chỉnh 2023-02-29 → 2023-03-01)
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return false;
    }

    return true;
  }

  static isFutureDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return date.getTime() > Date.now();
  }

  static isPastDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return date.getTime() < Date.now();
  }
}
