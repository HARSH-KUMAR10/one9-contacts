export const sendResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, status, message, errors = null) => {
  res.status(status).json({
    success: false,
    message,
    errors,
  });
};
