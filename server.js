const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

db.connect(function (err) {
  if (err) throw err;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🚀`);
});
