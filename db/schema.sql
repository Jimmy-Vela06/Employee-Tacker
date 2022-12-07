DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL    
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON DELETE SET NULL
);


