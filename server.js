const inquirer = require('inquirer')
const db = require('./db/connection')
const mysql = require('mysql2')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action',
            choices: [
                'View Employees',
                'Add Employee',
                'View Roles',
                'Add Role',
                'View Departments',
                'Add Department',
                'Quit'
            ]
        }
    ]).then(answer => {
        switch(answer.action) {
            case 'View Employees':
                viewEmployees()
                break;
            
            case 'Add Employee':
                addEmployee()
                break;
            
            case 'View Roles':
                viewRoles()
                break;
            
            case 'Add Role':
                addRole()
                break;
            
            case 'View Departments':
                viewDepartments()
                break;
            
            case 'Add Department':
                addDepartment()
                break;
            
            case 'Quit':
                quit()
                break;
        }
    })
}

function viewEmployees() {
    const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, departments.department_name
                FROM employee
                JOIN role
                ON role.id = employee.role_id
                JOIN departments
                ON departments.id = role.department_id
                `
    
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.log('Viewing All Employees')
        console.table(rows)
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'select action',
                choices: [
                    'Menu',
                    'Quit'
                ]
            }
        ]).then(answer => {
            switch(answer.action) {
                case 'Menu':
                    start()
                    break;
                
                case 'Quit':
                    quit()
                    break;
            }
        })
    })
}

function addEmployee() {
    console.log('Fill in the following info about the new employee')
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employees first name',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter employees last name',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'Enter employee role ID number',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'Enter employee manager ID',
            name: 'managerId'
        }
    ]).then(answer => {
        const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`
        const params = [answer.firstName, answer.lastName, answer.roleId, answer.managerId]

        db.query(sql, params, (err, results) => {
            if (err) throw err
            console.table(results)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'select action',
                    choices: [
                        'Menu',
                        'Quit'
                    ]
                }
            ]).then(answer => {
                switch(answer.action) {
                    case 'Menu':
                        start()
                        break;
                    
                    case 'Quit':
                        quit()
                        break;
                }
            })
        })
    })
}

function viewRoles() {
    const sql = `SELECT role.id, role.title, role.salary, departments.department_name
                AS department
                FROM role
                INNER JOIN departments
                ON departments.id = role.department_id`

    db.query(sql, (err, res) => {
        if (err) throw err
        console.log('Viewing all Roles')
        console.table(res)
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'select action',
                choices: [
                    'Menu',
                    'Quit'
                ]
            }
        ]).then(answer => {
            switch(answer.action) {
                case 'Menu':
                    start()
                    break;
                
                case 'Quit':
                    quit()
                    break;
            }
        })
    })
}

function addRole() {
    console.log('Fill in the following info about the new role')
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the role title',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter the roles salary',
            name: 'salary',
        },
        {
            type: 'input',
            message: 'Enter the department id number',
            name: 'departmentId'
        }
    ]).then(answer => {
        const sql = `INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)`
        const params = [answer.title, answer.salary, answer.departmentId]

        db.query(sql, params, (err, results) => {
            if (err) throw err
            console.table(results)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'select action',
                    choices: [
                        'Menu',
                        'Quit'
                    ]
                }
            ]).then(answer => {
                switch(answer.action) {
                    case 'Menu':
                        start()
                        break;
                    
                    case 'Quit':
                        quit()
                        break;
                }
            })
        })
    })
}

function viewDepartments() {
    const sql = `SELECT * FROM departments`

    db.query(sql, (err, res) => {
        if (err) throw err
        console.log('Viewing all Departments')
        console.table(res)
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'select action',
                choices: [
                    'Menu',
                    'Quit'
                ]
            }
        ]).then(answer => {
            switch(answer.action) {
                case 'Menu':
                    start()
                    break;
                
                case 'Quit':
                    quit()
                    break;
            }
        })
    })
}

function addDepartment() {
    console.log('Fill out the following information about the department')
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department',
            name: 'departmentName'
        }
    ]).then(answer => {
        const sql = `INSERT INTO departments(department_name) VALUES(?)`
        const params = [answer.departmentName]

        db.query(sql, params, (err, results) => {
            if (err) throw err
            console.table(results)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'select action',
                    choices: [
                        'Menu',
                        'Quit'
                    ]
                }
            ]).then(answer => {
                switch(answer.action) {
                    case 'Menu':
                        start()
                        break;
                    
                    case 'Quit':
                        quit()
                        break;
                }
            })
        })
    })
}


function quit() {
    console.log('Bye!')
    process.exit()
}


db.connect(() => {
    start()

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
})