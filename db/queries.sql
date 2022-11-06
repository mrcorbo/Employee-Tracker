SELECT * FROM department;

SELECT * FROM roles;

SELECT * FROM employees;

INSERT INTO department (depName) VALUES (?);

INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);

UPDATE employees SET role_id = ? WHERE id = ?;