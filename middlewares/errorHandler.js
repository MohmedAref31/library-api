const devError = (err, res) =>
  res.status(err.statusCode).send({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const productionError = (err, res) =>
  res.jsonError(err.message, err.statusCode);

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  return process.env.MODE === "dev"
    ? devError(err, res)
    : productionError(err, res);
};


export default errorHandler