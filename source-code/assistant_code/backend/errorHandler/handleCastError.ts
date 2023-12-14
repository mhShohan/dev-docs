import mongoose from 'mongoose';

const handleCastError = (error: mongoose.Error.CastError) => {
  return {
    [error.path]: {
      path: error.path,
      message: `Invalid ${error.path}`,
    },
  };
};

export default handleCastError;
