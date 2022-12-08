const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTables = require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employeeTracker_db",
  },
  console.log("Connected to the employeeTracker_db database.")
);

db.connect(function (err) {
  if (err) throw err;
});

const employee_db = () => {
  console.log("\n");
  console.log("\x1b[32m%s\x1b[0m", "EMPLOYEE DATABASE");
  console.log("\n");
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Emplopee",
          "Update Employee Role",
          "Exit Database!",
        ],
      },
    ])
    .then(({ choice }) => {
      if (choice === "View Departments") {
        view_departments();
      } else if (choice === "View Roles") {
        view_roles();
      } else if (choice === "View Employees") {
        view_employees();
      } else if (choice === "Add Department") {
        add_department();
      } else if (choice === "Add Role") {
        add_role();
      } else if (choice === "Add Employee") {
        add_employee();
      } else if (choice === "Update Employee Role") {
        update_role();
      } else {
        console.log("Have a nice day!");
        process.quiet();
      }
    });
};

const view_departments = () => {
  let query = "SELECT * FROM department";

  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("\n");
  });
};

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}🚀`);
// });
