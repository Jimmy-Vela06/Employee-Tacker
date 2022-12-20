const mysql = require("mysql2");
const inquirer = require("inquirer");

// const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employeeTracker_db",
  },
  console.log("Connected to the employeeTracker_db database.🚀")
);

const view_departments = () => {
  let department_db = "SELECT * FROM department";

  db.query(department_db, function (err, res) {
    if (err) throw err;
    console.table(res);
    employee_db();
  });
};

const view_roles = () => {
  //   let roles_db = "SELECT * FROM roles";

  //   db.query(roles_db, function (err, res) {
  //     if (err) throw err;
  //     console.table(res);
  //     employee_db();
  //   });
  let roles_db = `SELECT
        d.department_name,
        r.title,
        r.id,
        r.salary 
      FROM roles r
      JOIN department d
      ON r.department_id=d.id;`;
  db.query(roles_db, function (err, res) {
    if (err) throw err;
    console.table(res);
    employee_db();
  });
};

const view_employees = () => {
  let employees_db = `SELECT 
           e.id,
           e.first_name,
           e.last_name,
           r.title,
           d.department_name,
           r.salary,
           CONCAT (e2.first_name, " ",e2.last_name) AS manager 
        FROM employee e 
        JOIN roles r 
        ON e.role_id = r.id
        LEFT JOIN employee e2
        ON e.manager_id = e2.id
        JOIN department d
        ON r.department_id=d.id 
      ;`;

  db.query(employees_db, function (err, res) {
    if (err) throw err;
    console.table(res);
    employee_db();
  });
};

const add_department = () => {
  inquirer
    .prompt({
      name: "department_name",
      type: "input",
      message: "What ist the name of the department you wish to add?",
    })
    .then((department) => {
      db.query("INSERT INTO department SET ?", department);
      console.log("\n");
      console.log("Department added!");
      view_departments();
    });
};

const add_role = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department id?",
      },
    ])
    .then((role) => {
      db.query("INSERT INTO roles SET ?", role);
      console.log("\n");
      console.log("Role added!");
      view_roles();
    });
};

const add_employee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Input new employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "Input new employee's last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role id of the new employee?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager id of the new employee?",
      },
    ])
    .then((employee) => {
      db.query("INSERT INTO employee SET ?", employee);
      console.log("\n");
      console.log("Employee added!");
      view_employees();
    });
};

const update_role = () => {
  db.query(
    `SELECT id AS value, CONCAT(first_name," ",last_name) AS name FROM employee;`,
    (err, employee) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employees role will be updated",

            choices: employee,
          },
        ])
        .then((id) => {
          db.query(
            `SELECT id AS value, title AS name FROM roles`,
            (err, roles) => {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "role_id",
                    message: "What is the new role?",
                    choices: roles,
                  },
                ])
                .then((role_id) => {
                  db.query("UPDATE employee SET ? WHERE ?", [role_id, id]);
                })
                .then(view_employees);
            }
          );
        });
    }
  );
};

db.connect(function (err) {
  if (err) throw err;
});

const employee_db = () => {
  console.log("\n");
  console.log("\x1b[32m%s\x1b[0m", "EMPLOYEE DATABASE");
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
          "Add Employee",
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
        db.end();
      }
    });
};

employee_db();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}🚀`);
// });
