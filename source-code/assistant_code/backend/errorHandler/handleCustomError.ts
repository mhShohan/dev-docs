import CustomError from './customError';

const handleCustomError = (err: CustomError) => {
  let errorResponse: Record<string, unknown> = {};

  if (err.type === 'WrongCredentials') {
    errorResponse = {
      email: {
        path: 'email',
        message: 'Wrong Credentials',
      },
      password: {
        path: 'password',
        message: 'Wrong Credentials',
      },
    };
  }

  return errorResponse;
};

export default handleCustomError;
