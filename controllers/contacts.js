const Contact = require("../Models/contact"); 
const ExpressError = require("../utils/ExpressError");

module.exports.renderDeleteForm = async (req, res, next) => {
  let { id } = req.params;

  let contact = await Contact.findById(id);

  if (contact) {
    // then: render delete form
    res.status(200).render("contacts/delete.ejs", { contact });
  } else {
    // else: pass error
    next(
      new ExpressError(404, "The contact you are looking for does not exists!")
    );
  }
};

module.exports.renderEditForm = async (req, res, next) => {
  let { id } = req.params;

  let contact = await Contact.findById(id);

  // If contact exists
  if (contact) {
    // then: render edit form
    res.status(200).render("contacts/edit.ejs", { contact });
  } else {
    // else: pass error
    next(
      new ExpressError(404, "The contact you are looking for does not exists!")
    );
  }
};

module.exports.renderNewForm = (req, res, next) => {
  res.render("contacts/new.ejs");
};

module.exports.destroyContract = async (req, res) => {
  let { id } = req.params;

  let deletedContact = await Contact.findByIdAndDelete(id);

  if (deletedContact) {
    res.status(200).redirect("/contacts");
  } else {
    next(new ExpressError(400, "Please send a valid contact id!"));
  }
};

module.exports.updateContact = async (req, res, next) => {
  let { id } = req.params;

  let { contact } = req.body;

  console.log(req.body.contact);

  // TODO: validate first using JOI

  if (contact) {
    let updatedContact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });

    res.status(200).redirect(`/contacts/${id}`);
  } else {
    next(new ExpressError(400, "Please send all the fields!"));
  }
};

module.exports.showContact = async (req, res, next) => {
  let { id } = req.params;

  const contact = await Contact.findById(id);

  if (contact) {
    res.status(200).render("contacts/show.ejs", { contact });
  } else {
    next(
      new ExpressError(
        400,
        "The contact you are looking for exists not exists!"
      )
    );
  }
};

module.exports.createContact = async (req, res, next) => {
  console.log(req.body.contact);

  // TODO: validate first using JOI

  if (req.body.contact) {
    let contact = new Contact(req.body.contact);
    await contact.save();
    res.status(200).redirect("/contacts");
  } else {
    next(new ExpressError(400, "Please send all the fields!"));
  }
};

module.exports.index = async (req, res) => {
  let contacts = await Contact.find();
  res.status(200).render("contacts/index.ejs", { contacts });
};
