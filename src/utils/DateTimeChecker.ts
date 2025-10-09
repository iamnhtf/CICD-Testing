export class DateTimeChecker {
  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  static isFutureDate(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date.getTime() > now.getTime();
  }

  static isPastDate(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date.getTime() < now.getTime();
  }
}
