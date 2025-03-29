# 10-SQL-Employee-Tracker

## Description

The **10-SQL-Employee-Tracker** is a command-line application built using Node.js, Inquirer (v8.2.4), and PostgreSQL. It allows business owners to view and manage the departments, roles, and employees in their company through an interactive interface. This tool is ideal for quickly organizing and planning business operations without needing a graphical user interface.

## Features

- **View All Departments**: Display a formatted table showing department names and IDs.
- **View All Roles**: Display a table showing role details such as job titles, role IDs, associated departments, and salaries.
- **View All Employees**: Display a table with employee details including IDs, names, job titles, departments, salaries, and managers.
- **Add a Department**: Insert a new department into the database.
- **Add a Role**: Add a new role by specifying the title, salary, and department.
- **Add an Employee**: Insert a new employee, including selecting their role and manager.
- **Update an Employee Role**: Modify an existing employee's role.

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>

2. **Navigate to the Project Directory**

   ```bash
   cd 10-SQL-Employee-Tracker

3. **Install Dependencies**

   ```bash
   npm install

4. **Set Up the Database**

* Open your PostgreSQL shell (psql) and create a new database:

   ```sql
   CREATE DATABASE employee_db;

* Connect to the new database:

   ```sql
   \c employee_db

* Run the schema file to create tables:

   ```sql
   \i 'C:/Users/Dav20/Documents/10-SQL-Employee-Tracker/db/schema.sql'

* Run the seeds file to populate the tables with sample data:

   ```sql
   \i 'C:/Users/Dav20/Documents/10-SQL-Employee-Tracker/db/seeds.sql'

5. **Configure Database Connection**

   Open the file db/index.js and update the PostgreSQL connection credentials (especially the password) to match your environment.

**Usage**

* To start the application, run:

   ```bash
   node index.js

* View All Departments

* View All Roles

* View All Employees

* Add a Department

* Add a Role

* Add an Employee

* Update an Employee Role

* Exit

* Select an option using the arrow keys and follow the prompts to interact with your employee database.

**Frequently Asked Questions (FAQ)**

Q1: What is the purpose of this application?
A1: It provides a simple command-line interface for business owners to view and manage departments, roles, and employees in their company.

Q2: Which technologies are used in this project?
A2: The application is built with Node.js and uses the following packages:

Inquirer (v8.2.4) for command-line prompts.

pg for PostgreSQL connectivity.

console.table for formatting output in the terminal.

Q3: How do I set up the database?
A3: Create a PostgreSQL database named employee_db, then run the provided schema and seeds files to set up the tables and sample data. The commands for this are detailed in the Installation section.

Q4: How do I add new data (departments, roles, or employees)?
A4: Use the interactive menu. For example, choose "Add a Department" and follow the prompts to insert a new department into the database.

Q5: How do I update an employee's role?
A5: Select "Update an Employee Role" from the menu, then choose the employee and the new role when prompted.

Q6: What should I do if I encounter errors?
A6: Ensure that your PostgreSQL database is properly set up and that your credentials in db/index.js are correct. Also, verify that all dependencies have been installed. Consult the error messages in your terminal for guidance.

**License**

**This project is licensed under the MIT License**

**Contributing**

* Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

**Questions?**

***GitHub:*** Visit [my GitHub page](https://github.com/dvard777) for more of my work!<br>

***Email:*** you can reach me at dav2003arm@gmail.com with further questions or comments.


[Click Here]() to watch a brief walkthrough of the software!