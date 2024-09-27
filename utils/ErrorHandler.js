module.exports.ErrorHandler = (err, req, res, next) => {
  // console.log(err);

  let { statusCode = 500, message = "Something went wrong!" } = err;

  // console.log(statusCode, message);

  res.status(statusCode).render("contacts/error.ejs", { message });
};
