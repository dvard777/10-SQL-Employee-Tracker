// index.js
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db');

async function mainMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (choice) {
    case 'View All Departments':
      return viewAllDepartments();
    case 'View All Roles':
      return viewAllRoles();
    case 'View All Employees':
      return viewAllEmployees();
    case 'Add a Department':
      return addDepartment();
    case 'Add a Role':
      return addRole();
    case 'Add an Employee':
      return addEmployee();
    case 'Update an Employee Role':
      return updateEmployeeRole();
    default:
      console.log('Goodbye!');
      process.exit();
  }
}

async function viewAllDepartments() {
  try {
    const departments = await db.getAllDepartments();
    console.table(departments);
  } catch (err) {
    console.error('Error viewing departments:', err);
  }
  mainMenu();
}

async function viewAllRoles() {
  try {
    const roles = await db.getAllRoles();
    console.table(roles);
  } catch (err) {
    console.error('Error viewing roles:', err);
  }
  mainMenu();
}

async function viewAllEmployees() {
  try {
    const employees = await db.getAllEmployees();
    console.table(employees);
  } catch (err) {
    console.error('Error viewing employees:', err);
  }
  mainMenu();
}

async function addDepartment() {
  try {
    const { departmentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the new department name:',
      },
    ]);
    await db.addDepartment(departmentName);
    console.log(`Department '${departmentName}' added successfully.`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
  mainMenu();
}

async function addRole() {
  try {
    // We need to list the departments so the user can choose which department the new role belongs to
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the new role:',
        choices: departmentChoices,
      },
    ]);

    await db.addRole(answers.title, answers.salary, answers.departmentId);
    console.log(`Role '${answers.title}' added successfully.`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
  mainMenu();
}

async function addEmployee() {
  try {
    // Get all roles to let user choose
    const roles = await db.getRoles();
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    // Get all employees to let user choose a manager
    const employees = await db.getEmployees();
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    managerChoices.unshift({ name: 'None', value: null }); // Option for no manager

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for the employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for the employee:',
        choices: managerChoices,
      },
    ]);

    await db.addEmployee(
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId
    );
    console.log(
      `Employee '${answers.firstName} ${answers.lastName}' added successfully.`
    );
  } catch (err) {
    console.error('Error adding employee:', err);
  }
  mainMenu();
}

async function updateEmployeeRole() {
  try {
    // Get all employees
    const employees = await db.getEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    // Get all roles
    const roles = await db.getRoles();
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee’s role do you want to update?',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role:',
        choices: roleChoices,
      },
    ]);

    await db.updateEmployeeRole(answers.employeeId, answers.roleId);
    console.log('Employee role updated successfully.');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
  mainMenu();
}

// Initialize the app
console.log('Welcome to the Employee Tracker!');
mainMenu();
