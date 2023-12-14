import { Response } from 'express';

interface IResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

const sendResponse = <T>(res: Response, payload: IResponse<T>) => {
  return res.status(payload.statusCode).json({
    success: payload.success,
    statusCode: payload.statusCode,
    message: payload.message,
    data: payload.data,
  });
};

export default sendResponse;
