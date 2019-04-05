module.exports = (req, res, next) => {
  console.log(new Date(), req.path, req.method); // eslint-disable-line no-console
  next();
};
