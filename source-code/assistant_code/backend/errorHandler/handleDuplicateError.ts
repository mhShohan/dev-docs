/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any) => {
  const errRes = Object.keys(err.keyPattern).reduce(
    (acc, cur) => {
      acc[cur] = { path: cur, message: `${cur} already Exists!` };
      return acc;
    },
    {} as Record<string, unknown>,
  );

  return errRes;
};

export default handleDuplicateError;
