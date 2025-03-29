// db/index.js
const { Pool } = require('pg');

// Update these credentials according to your setup
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'employee_db',
  user: 'postgres',
  password: 'YOUR_POSTGRES_PASSWORD_HERE',
});

module.exports = {
  // Example function: get all departments
  getAllDepartments: async () => {
    const query = 'SELECT * FROM department ORDER BY id;';
    const { rows } = await pool.query(query);
    return rows;
  },

  // Example function: get all roles (with department name)
  getAllRoles: async () => {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
      ORDER BY role.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  // Example function: get all employees (with role, department, and manager)
  getAllEmployees: async () => {
    const query = `
      SELECT e.id, e.first_name, e.last_name,
             role.title AS job_title,
             department.name AS department,
             role.salary AS salary,
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      JOIN role ON e.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
      ORDER BY e.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  // Example function: add a department
  addDepartment: async (departmentName) => {
    const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *;';
    const values = [departmentName];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Example function: add a role
  addRole: async (title, salary, departmentId) => {
    const query = `
      INSERT INTO role (title, salary, department_id)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [title, salary, departmentId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Example function: get roles (for listing in inquirer)
  getRoles: async () => {
    const query = 'SELECT id, title FROM role ORDER BY id;';
    const { rows } = await pool.query(query);
    return rows;
  },

  // Example function: get employees (for listing in inquirer)
  getEmployees: async () => {
    const query = 'SELECT id, first_name, last_name FROM employee ORDER BY id;';
    const { rows } = await pool.query(query);
    return rows;
  },

  // Example function: add an employee
  addEmployee: async (firstName, lastName, roleId, managerId) => {
    const query = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    // If no manager was chosen, managerId can be null
    const values = [firstName, lastName, roleId, managerId || null];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Example function: update an employee’s role
  updateEmployeeRole: async (employeeId, roleId) => {
    const query = `
      UPDATE employee
      SET role_id = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [roleId, employeeId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};
