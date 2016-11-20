# Entrepreneur Ideas Management Web App for UPM2016 Agile Course

## Install

Before starting, make sure that your prompt is located in the root directory of the project.

### Node Modules Install
run `npm install` from the project's root folder.

### Database Setup
 0.   If you have not done it already, install a mysql database, such as [MariaDB](https://mariadb.com)  
 1.   First, start the database service with:
  - `mysql.server start` on **Unix**
  - Run the `C:\Program Files\MariaDB 10.1\bin\mysqld.exe` file.
 2.   Then run connect to the management console with:
  - `mysql -h localhost -u root`  
  -  Run the `C:\Program Files\MariaDB 10.1\bin\mysql.exe` file.
 3.   Update the root password to `root1` with `SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root1');`.  
 4.   Create the database and tables (use absolute paths on **Windows**):
   - `\. private/database/sql/public_users.sql` for the **users** table. 
   - `\. private/database/sql/public_ideas.sql` for the **ideas** table. 

**N.B.:** You will have to use `mysql -h localhost -u root -p` with the new password next time you want to connect to the management console.

## Running the web application
Once all the previous commands have been executed, you can run it with the command `node private/server.js`.
