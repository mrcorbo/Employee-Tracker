const inquirer = require('inquirer')
const mysql = require ('mysql2')
const { map } = require('rxjs')
require('dotenv').config();

const db = mysql.createConnection(
    {
     host: process.env.host,
     user: process.env.user,
     password: process.env.password,
     database: process.env.database    
    }
)

function menu(){
inquirer.
    prompt([
        {
            type: 'list',
            message: `What would you like to do?`,
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', `Update an employee's role`, 'Save & exit'],
            name: 'menu'
        },

    ]).then((data) => {
        if (data.menu === 'View all departments'){
            showDepartments()
        }else if (data.menu === 'View all roles'){
            showRoles()
        }else if (data.menu === 'View all employees'){
            showEmployees()
        }else if (data.menu === 'Add a department'){
            addDepartment()
        }else if (data.menu === 'Add a role'){
            addRole()
        }else if (data.menu === 'Add an employee'){
            addEmployee()
        }else if (data.menu === `Update an employee's role`){
            updateRole()
        }else {
            process.exit()
        }

    })
}

function showDepartments(){
    db.query('SELECT * FROM department;', function (err, results) {
        console.log(results)
        returnToMenu()
    })
    
    
}

function showRoles(){
    db.query('SELECT * FROM roles;', function (err, results) {
        console.log(results)
    })
    returnToMenu()
}

function showEmployees(){
    db.query('SELECT * FROM employee;', function (err, results) {
        console.log(results)
        returnToMenu()
    })
}

function addDepartment(){
    inquirer.
        prompt({
            type: 'input',
            message: 'Input name of new department.',
            name : 'addDept'
        }).then((data) => {
            db.query('INSERT INTO department (depName) VALUES (?);', [data.addDept], function (err, results){
                console.log(results)
                returnToMenu()
            })
        })
}

function addRole(){
    db.query('SELECT * FROM department;', function (err, results) {
       const deptList = results.map(function (dept){
        return {name: dept.depName, value:dept.id}
       })
       
    
    inquirer.
        prompt([
            {
                type: 'input',
                message: 'Input the name of the new role.',
                name: 'newRole'
            },
            {
                type: 'input',
                message: 'Input the salary of the new role.',
                name: 'newSalary'
            },
            {
                type: 'list',
                message: 'Choose which department the role belongs to.',
                choices: deptList,
                name: 'deptRole'
            }


        ]).then((data) => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [data.newRole, data.newSalary, data.deptRole], function (err, results){
                console.log('Role has been added.')
                returnToMenu()
            })
        }).catch((err) => {
            console.log(err)
        })
    })
}

function addEmployee(){
    db.query('SELECT * FROM roles', function (err, results){
        const roleList = results.map(function (role){
            return {name: role.title, value: role.id}
        })
        inquirer.
            prompt([
                {
                    type: 'input',
                    message: `What is the new employee's first name?`,
                    name: 'empFirst'
                },
                {
                    type: 'input',
                    message: `What is the new employee's last name?`,
                    name: 'empLast'
                },
                {
                    type: 'list',
                    message: `What is the new employee's role?`,
                    choices: roleList,
                    name: 'empRole'
                }
            ]).then((data) => {
                db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)', [data.empFirst, data.empLast, data.empRole], function (err, results){
                console.log(data.empFirst + ' ' + data.empLast + 'has been added to role number ' + data.empRole + '.')
                returnToMenu()
            })
    })
})
}

function updateRole(){
    db.query('SELECT * FROM employee;', function (err, results) {
    const empList = results.map(function (employee){
        return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
       })
    db.query('SELECT * FROM roles',  function (err, results){
    const roleList = results.map(function (role){
        return {name: role.title, value: role.id}
    })
    inquirer.
        prompt([
        {
            type: 'list',
            message: 'What employee are you updating?',
            choices: empList,
            name: 'empId'
        },
        {
            type: 'list',
            message: 'What role would you like to move them to?',
            choices: roleList,
            name: 'roleId'
        }
    ]).then((data) => {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?;", [data.roleId, data.empId], function(err, results){
            returnToMenu()
        })
    })
    })
        
            
        })
}

function returnToMenu(){
    inquirer.
        prompt({
            type: 'list',
            message: 'Would you like to do more?',
            choices: ['Yes', 'No'],
            name: 'goAgain'
        }).then((data) => {
            if (data.goAgain === 'Yes'){
                menu()
            }else {process.exit()}
        })
        
}
menu()
// View all departments
// View all roles
    // Job Title, Role ID, Department, Salary
// View all employees
    // Employee IDs, First names, last names, job titles, departments, salaries, managers
// Add a department
    // Name of department, then add to database
// Add a role
    // Name of role, salary, and department, then add 
// Add an employee
    // First name, last name, role & manager
// Update an employee role
    // Select employee to update then assign new role then update

