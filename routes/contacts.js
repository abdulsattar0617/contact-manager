const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const validateContact = require("../utils/validateContact");
const {
  renderDeleteForm,
  renderEditForm,
  renderNewForm,
  destroyContract,
  updateContact,
  createContact,
  index,
  showContact,
} = require("../controllers/contacts");

// GET : Render Delete Form
router.get("/:id/delete", wrapAsync(renderDeleteForm));

// GET : Render Edit Form
router.get("/:id/edit", wrapAsync(renderEditForm));

// GET : New Contact Form
router.get("/new", renderNewForm);

router
  .route("/:id")
  // DELETE - contact
  .delete(wrapAsync(destroyContract))

  // Update - contact
  .put(validateContact, wrapAsync(updateContact))

  // SHOW - contact
  .get(wrapAsync(showContact));

// CREATE - Contact
router
  .route("/")
  .post(validateContact, wrapAsync(createContact))
  // All Contacts
  .get(wrapAsync(index));

module.exports = router;
