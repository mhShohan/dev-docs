import mongoose from 'mongoose';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errRes = Object.keys(error.errors).reduce(
    (acc, cur) => {
      acc[error.errors[cur].path] = {
        path: error.errors[cur].path,
        message: error.errors[cur].message,
      };

      return acc;
    },
    {} as Record<string, unknown>,
  );

  return errRes;
};

export default handleValidationError;
