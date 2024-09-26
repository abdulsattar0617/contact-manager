const { expression } = require("joi");
const { contactSchema } = require("../schema");
const ExpressError = require("./ExpressError");

async function validateContact(req, res, next) {
  let { error } = contactSchema.validate(req.body);
  if (error) {
    // res.status(400).send("Please send all the fields!");
    // console.log(error.details[0].message);

    let errMsgs = error.details.map((err) => err.message).join("\n");

    next(error);

    // console.log('error in contact validation joi');
    return;
  }

  next();
}

module.exports = validateContact;
