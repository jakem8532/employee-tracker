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
            name: 'choice',
            message: 'Select an action',
            choices: [
                'View Employees',
                'Add Employee',
                'View Roles',
                'Add role',
                'View Departments',
                'Add Department',
                'Quit'
            ]
        }
    ]).then(answer => {
        switch(answer.choice) {
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
    const sql = `SELECT * FROM employee.*, role.title
                AS role_title
                FROM employee
                LEFT JOIN role
                ON employee.role_id = role.title`
    
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.log('Viewing All Employees')
        console.table(rows)
    })
}




db.connect(() => {
    start()

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
})