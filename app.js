const express = require("express");
const port = 3000;
const app = express();
const connectDB = require("./DBConnection");
const Contact = require("./Models/contact");
const wrapAsync = require("./utils/wrapAsync");
const validateContact = require("./utils/validateContact");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");

connectDB();

// ejs engine
app.engine("ejs", ejsMate);

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set paths
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// API paths
// GET : Render Delete Form
app.get(
  "/contacts/:id/delete",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;

    let contact = await Contact.findById(id);

    if (contact) {
      // then: render delete form
      res.status(200).render("contacts/delete.ejs", { contact });
    } else {
      // else: pass error
      next(
        new ExpressError(
          404,
          "The contact you are looking for does not exists!"
        )
      );
    }
  })
);

// GET : Render Edit Form
app.get(
  "/contacts/:id/edit",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;

    let contact = await Contact.findById(id);

    // If contact exists
    if (contact) {
      // then: render edit form
      res.status(200).render("contacts/edit.ejs", { contact });
    } else {
      // else: pass error
      next(
        new ExpressError(
          404,
          "The contact you are looking for does not exists!"
        )
      );
    }
  })
);

// GET : New Contact Form
app.get("/contacts/new", (req, res, next) => {
  res.render("contacts/new.ejs");
});

// DELETE - contact
app.delete(
  "/contacts/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let deletedContact = await Contact.findByIdAndDelete(id);

    if (deletedContact) {
      res.status(200).redirect("/contacts");
    } else {
      next(new ExpressError(400, "Please send a valid contact id!"));
    }
  })
);

// Update - contact
app.put(
  "/contacts/:id",
  validateContact,
  wrapAsync(async (req, res, next) => {
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
  })
);

// SHOW - contact
app.get("/contacts/:id", async (req, res, next) => {
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
});

// CREATE - Contact
app.post(
  "/contacts",
  validateContact,
  wrapAsync(async (req, res, next) => {
    console.log(req.body.contact);

    // TODO: validate first using JOI

    if (req.body.contact) {
      let contact = new Contact(req.body.contact);
      await contact.save();
      res.status(200).redirect("/contacts");
    } else {
      next(new ExpressError(400, "Please send all the fields!"));
    }
  })
);

// All Contacts
app.get(
  "/contacts",
  wrapAsync(async (req, res) => {
    let contacts = await Contact.find();
    res.status(200).render("contacts/index.ejs", { contacts });
  })
);

// non-existing paths
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.get("/", (req, res) => {
  res.send("ROOT");
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);

  let { statusCode = 500, message = "Something went wrong!" } = err;

  // console.log(statusCode, message);

  res.status(statusCode).render("contacts/error.ejs", { message });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});
