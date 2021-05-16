const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty array for each team member
const teamMembers = [];

// set of questions for adding managers
const mgrQuestions = [{
        type: 'input',
        message: "Enter the managers's name: ",
        name: 'name'
    },
    {
        type: 'input',
        message: "Enter managers's ID: ",
        name: "id"
    },
    {
        type: 'input',
        message: "Enter manager's email: ",
        name: 'email'
    },
    {
        type: 'input',
        message: "Enter manager's office number: ",
        name: 'officeNumber'
    }
]

// set of questions for adding interns
const intQuestions = [{
    type: 'input',
    message: "Enter the intern's name: ",
    name: 'name'
},
{
    type: 'input',
    message: "Enter intern's ID: ",
    name: "id"
},
{
    type: 'input',
    message: "Enter intern's email: ",
    name: 'email'
},
{
    type: 'input',
    message: "Enter intern's school name: ",
    name: 'schoolName'
}
]

// set of questions for adding engineers
const engQuestions = [{
    type: 'input',
    message: "Enter the engineer's name: ",
    name: 'name'
},
{
    type: 'input',
    message: "Enter engineer's ID: ",
    name: "id"
},
{
    type: 'input',
    message: "Enter engineer's email: ",
    name: 'email'
},
{
    type: 'input',
    message: "Enter engineer's github username: ",
    name: 'github'
}
]



// init runs addMember function to prompt questions
function init() {
    addMemberQuestion();
}

// function to ask user whether or not they want to add new member
function addMemberQuestion() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Add a new member? ",
                choices: [
                    "yes",
                    "no"
                ],
                name: 'addMember'
            }
        ])
        .then (res => {
            if(res.addMember === 'yes') {
                addNewMember();
            } else {
                console.log(teamMembers);
                fs.writeFileSync(outputPath, render(teamMembers), (err) => {
                    if (err) {
                        console.log(err);
                    } else console.log(`Generating HTML...`);

                });
            }
        })

}

// function that asks which role the new member is to determine which question set to use
function addNewMember() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Select team member's role: ",
            choices: [
                "Manager",
                "Intern",
                "Engineer"
            ],
            name: 'role'
        }
    ])
    .then (res => {
        if(res.role === 'Manager') {
            addManager();
        }
        if(res.role === 'Intern') {
            addIntern();
        } 
        if(res.role === 'Engineer') {
            addEngineer();
        }
    })
}

// following questions prompt questions for adding a manager, intern or engineer, then pushes that members's info into the teamMembers array and starts the process over again
function addManager() {
    inquirer
        .prompt(mgrQuestions)
        .then(({ name, id, email, officeNumber }) => {
            const manager = new Manager(name, id, email, officeNumber);
            teamMembers.push(manager);
            addMemberQuestion();
        })
}

function addIntern() {
    inquirer
    .prompt(intQuestions)
    .then(({ name, id, email, schoolName }) => {
        const intern = new Intern(name, id, email, schoolName);
        teamMembers.push(intern);
        addMemberQuestion();
    })

}

function addEngineer() {
    inquirer
    .prompt(engQuestions)
    .then(({ name, id, email, github }) => {
        const engineer = new Engineer(name, id, email, github);
        teamMembers.push(engineer);
        addMemberQuestion();
    })

}

init();





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will need to
// generate and return a block of HTML including templated divs for each employee

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```