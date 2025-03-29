-- db/schema.sql

-- Drop tables if they already exist (to clean up during development)
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department
      FOREIGN KEY(department_id) 
	    REFERENCES department(id)
	    ON DELETE CASCADE
);

-- Create employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_role
      FOREIGN KEY(role_id) 
	    REFERENCES role(id)
	    ON DELETE CASCADE,
    CONSTRAINT fk_manager
      FOREIGN KEY(manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL
);
