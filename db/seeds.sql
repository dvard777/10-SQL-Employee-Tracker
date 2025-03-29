-- db/seeds.sql

-- Insert into department
INSERT INTO department (name)
VALUES 
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- Insert into role
INSERT INTO role (title, salary, department_id)
VALUES
  ('Salesperson', 50000, 1),
  ('Software Engineer', 90000, 2),
  ('Accountant', 55000, 3),
  ('Lawyer', 80000, 4);

-- Insert into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),   -- Salesperson, no manager
  ('Jane', 'Smith', 2, NULL), -- Software Engineer, no manager
  ('Sam', 'Brown', 3, NULL),  -- Accountant, no manager
  ('Lisa', 'Chang', 4, NULL); -- Lawyer, no manager
