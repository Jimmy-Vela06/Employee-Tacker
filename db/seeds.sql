INSERT INTO department (department_name)
VALUES ("Executive"),
       ("Sales"),
       ("Engineering"),
       ('IT');

INSERT INTO roles (department_id, title, salary) 
VALUES (1, "CEO", 800000),
       (2, "Sales Mangager", 100000),
       (2, "Sales Clerk", 60000),
       (3, "Engineer Lead", 160000),
       (3, "Senior Developer", 115000),
       (3, "Junior Developer", 75000),
       (4,"System Admin", 80000);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Lucas", "Brown", 1, NULL),
       ("Alfred", "Tucker", 2, NULL),
       ("Miller", "Montgomery", 3, 2),
       ("Heather", "Rogers", 3, 2),
       ("David", "Howard", 4, NULL),
       ("Darcy", "Cole", 5, 5),
       ("Adele", "Smith", 6, 5),
       ("George", "Wilson", 6, 5),
       ("Alexander", "Henderson", 7, NULL);




