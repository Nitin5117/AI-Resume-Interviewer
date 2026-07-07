module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const isProduction =
    process.env.NODE_ENV === "production";

  if (!isProduction) {
    console.error(err);
  } else if (statusCode >= 500) {
    console.error(
      `[${statusCode}] ${err.message}`,
    );
  }

  const message =
    statusCode >= 500 &&
    !err.statusCode
      ? "Something went wrong. Please try again later."
      : err.message;

  res.status(statusCode).json({
    success: false,
    status:
      err.status ||
      (statusCode >= 500 ? "error" : "fail"),
    message,
  });
};