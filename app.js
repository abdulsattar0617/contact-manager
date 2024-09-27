const express = require("express");
const port = 3000;
const app = express();
const connectDB = require("./DBConnection");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const contactsRouter = require("./routes/contacts");
const { ErrorHandler } = require("./utils/ErrorHandler");

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
app.use("/contacts", contactsRouter);

// non-existing paths
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.get("/", (req, res) => {
  res.send("ROOT");
});

// Error Handler
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});
