const Employee = require("./Employee");
// create child class Engineer of parent class Employee
class Engineer extends Employee {
    // constuctor consists of everything the parent does, and also whatever makes it unique
    constructor(name, id, email, github) {
        // calling on the properties of parent
        super(name, id, email);
        // creating Engineer's unique property
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return 'Engineer';
    }
}

    
module.exports = Engineer;