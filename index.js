const fs = require('fs')
const inquirer = require('inquirer')

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
        //   Save & Exit
        }

    })
}

function showDepartments(){

    menu()
}

function showRoles(){

    menu()
}

function showEmployees(){
    
    menu()
}

function addDepartment(){
    
    menu()
}

function addRole(){

    menu()
}

function addEmployee(){

    menu()
}

function updateRole(){

    menu()
}

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

