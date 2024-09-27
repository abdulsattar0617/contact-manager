# **Contact Management Application (CMA)**

## **Project Overview**
The **Contact Management Application** (CMA) is a web-based application developed using Node.js, Express.js, MongoDB, and EJS. It allows users to manage their contacts with essential CRUD operations—Create, Read, Update, and Delete. The application ensures proper data validation and error handling, providing a user-friendly interface with persistent storage.

---

## **User Instructions**

### **Prerequisites**
1. Install **Node.js** and **npm**.
2. Install **MongoDB** and start the database server.

### **Installation**
1. Clone the repository: 
   ```bash
   git clone https://github.com/abdulsattar0617/contact-manager.git
   ```
2. Navigate to the project directory: 
   ```bash
   cd CMA
   ```
3. Install dependencies: 
   ```bash
   npm install
   ```
4. Start the server: 
   ```bash
   npm start
   ```

### **How to Use the Application**
1. **Create a Contact**: 
   - Navigate to `/contacts/new`.
   - Fill in the form with contact details and click "Submit".
   
2. **Read/Display Contacts**: 
   - Visit `/contacts` to see all contacts.
   - Click on a contact to view detailed information.

3. **Update a Contact**:
   - Go to `/contacts/:id/edit`.
   - Modify the fields and click "Update" to save changes.

4. **Delete a Contact**:
   - Navigate to `/contacts/:id/delete`.
   - Confirm the deletion to remove the contact permanently.

---

## **Route Explanation**

| **Route**               | **Request Type** | **Purpose**                              |
|-------------------------|------------------|------------------------------------------|
| `/contacts`             | GET              | Display all contacts                     |
| `/contacts/:id`         | GET              | Display a single contact's details       |
| `/contacts/:id/edit`    | GET              | Render the form to edit a contact        |
| `/contacts/:id/delete`  | GET              | Show the delete confirmation             |
| `/contacts`             | POST             | Add a new contact                        |
| `/contacts/:id`         | PUT              | Update an existing contact               |
| `/contacts/:id`         | DELETE           | Delete an existing contact               |
| `/contacts/new`         | GET              | Render the form for adding a new contact |

---

## **Data Model**

- **Database Name**: `contactmanagementapp`
- **Collection**: `contacts`
  
### **Schema Fields**
- **First Name**: `String` (Required)
- **Last Name**: `String` (Required)
- **Email**: `String` (Required, must be unique and valid)
- **Phone Number**: `String` (Required, must be valid, length 10 and all letters must belong to 0-9 range)
- **Address**: `String`

---

## **User Interface**

The user interface follows the **MVC (Model-View-Controller)** architecture:

- **Views**:
  - **Index** (`index.ejs`) – Displays all contacts.
  - **Show** (`show.ejs`) – Renders a single contact’s details.
  - **Edit** (`edit.ejs`) – Displays the form for editing an existing contact.
  - **Delete** (`delete.ejs`) – Shows a confirmation dialog for deleting a contact.
  - **New** (`new.ejs`) – Displays the form for adding a new contact.
  - **Error** (`error.ejs`) – Error page for handling invalid routes or requests.

- **Layout**:
  - **Boilerplate** (`boilerplate.ejs`) – A master layout that wraps all views for consistent structure.
  
- **Includes**:
  - **Navbar** (`navbar.ejs`) – Contains navigation and branding.
  - **Footer** (`footer.ejs`) – Footer component for all pages.

---

## **Error Handling**

1. **WrapAsync**: A utility function that wraps asynchronous routes with a `try/catch` block, ensuring that any errors are caught and passed to the error handler middleware.

2. **Custom Error Class (ExpressError)**: A custom error class, `ExpressError`, was implemented to extend JavaScript's default `Error` object, allowing for custom error messages and status codes.
