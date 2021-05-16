// set up use of inquirer & chalk
const inquirer = require('inquirer');
const chalk = require('chalk');
// import the child class files to use here
// const Engineer = require('./Engineer');
// const Manager = require('./Manager');
// const Intern = require('./Intern');

// Employee is the parent class
// The shared properties are:
// employeeID, employeeName and email
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Employee';
    }
}

// export parent class to children classes
module.exports = Employee;


