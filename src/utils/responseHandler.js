export const success = (res, data, message = 'Success') => {
  return res.json({
    status: 'success',
    message,
    data
  });
};

export const error = (res, message, statusCode = 500, details) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data: details === undefined ? {} : details
  });
};
