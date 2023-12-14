class CustomError extends Error {
  public statusCode: number;
  public type: string = '';

  constructor(statusCode: number, message: string, type: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

export default CustomError;
