INSERT INTO department (depName)
VALUES 
('Sales')
('Engineering')
('Finance')
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Sales manager', 175000, 1),
('Software Engineer', 120000, 2),
('Lead Engineer', 150000, 2),
('Engineering manager', 250000, 2),
('Accountant', 100000, 3),
('Account manager', 150000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Snow', 1, 1),
('Wes', 'Anderson', 3,2),
('John', 'Carpenter', 2,3),
('Jason', 'Statham', 4, 4),
('Quentin', 'Tarantino', 5, 5);