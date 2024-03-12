# PostgreSQL

PostgreSQL is an open-source relational database management system (RDBMS) known for its robustness, reliability, and extensibility. It's highly popular among developers and businesses for its advanced features, adherence to SQL standards, and strong community support.

- Pros:

  - Feature-rich with advanced capabilities like complex queries and JSON support.
  - Open-source, fostering community contributions and transparency.
  - Highly extensible through extensions and procedural languages.
  - Robustness and reliability with ACID compliance and crash recovery.
  - Scalability with support for partitioning, replication, and sharding.
  - Active community support for development and troubleshooting.

- Cons:
  - Performance may not always match other databases.
  - Complexity in setup and administration.
  - Limited GUI tools compared to some other databases.
  - Higher resource consumption in certain scenarios.
  - Steep learning curve for beginners.
  - Potential compatibility issues when migrating from other database systems.

### Resources

- PostgreSQL documentation: https://www.postgresql.org/docs/current/
- PostgreSQL tutorial: https://www.postgresqltutorial.com/
- LearnSQL.com: https://learnsql.com/

### Run PostgreSQL locally in terminal

```
  psql -h localhost -p 5432 -U postgres -d NAME_OF_DATABASE
```

## PostgreSQL CLI

1. Basic CLI

   - `select version();` - Show version
   - `conninfo` - view connection
   - `\q` - Quits the PostgreSQL command-line interface
   - `\! cls` - Clear terminal
   - `\l` - Show the lists of all available databases
   - `\c DATABASE_NAME` - switch to DATABASE_NAME
   - `\d` - Show the list of tables of current database
   - `\du` - show the lists of users
   - `\dn` - show the list of schema
   - `\d+` - Displays detailed information about a specific table, including its columns, data types, constraints, and indexes.
   - `\dt` - Lists all tables in the current database

2. Manage database, user and role

   - `CREATE DATABASE database_name` - create new database
   - `ALTER DATABASE database_name RENAME TO new_database` - rename database
   - `DROP DATABASE database_name` - delete database
   - `CREATE USER user_name WITH LOGIN ENCRYPTED PASSWORD 123456` - create new user
   - `GRANT ALL PRIVILEGES ON TABLE table__name TO user_name` - give all permission of table_name to to user_name (read,write,delete etc)
   - `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA PUBLIC table_name TO user_name` - give all permission of table_name to to user_name (read,write,delete etc)
   - `GRANT SELECT ON TABLE table_name TO user_name` - give only view data of table_name to to user_name (read)
   - `REVOKE SELECT ON TABLE table_name TO user_name` - remove permission of view data of table_name to to user_name
   - `CREATE ROLE role_name` - create role
   - `GRANT SELECT ON ALL TABLES IN SCHEMA PUBLIC TO role_name` - give view permission to role_name
   - `GRANT role_name TO usr_name` - give role_name to user_name

3. Manage tables

   - `CREATE TABLE table_name()` - create table
   - `ALTER TABLE table_name RENAME TO new_table` - rename table
   - `DROP TABLE table_name` - delete table
   - `INSERT INTO table_name(column1, column2) VALUES (value1, value2);` - insert single row in table
   - `INSERT INTO table_name(column1, column2) VALUES (value1, value2), (value1, value2), (value1, value2);` - insert multiple row in table

## SQL - Structured Query Language

`SQL (Structured Query Language)` is a domain-specific language used in programming and designed for managing relational databases. It is the standard language for interacting with relational database management systems (RDBMS), such as PostgreSQL, MySQL, Oracle, SQL Server, and SQLite. Here are some details about SQL in the context of information technology (IT):

1. Data Definition Language (DDL): SQL includes commands for defining and modifying the structure of databases and database objects. DDL commands are used for tasks such as creating tables, altering table structures, and defining constraints (e.g., primary keys, foreign keys).

2. Data Manipulation Language (DML): DML commands in SQL are used for querying and modifying data within database tables. Common DML commands include SELECT (for retrieving data), INSERT (for adding new records), UPDATE (for modifying existing records), and DELETE (for removing records).

3. Data Control Language (DCL): SQL also includes commands for managing access to data within the database. DCL commands are used for defining permissions and controlling access rights to database objects. Examples include GRANT (to grant specific permissions to users or roles) and REVOKE (to revoke previously granted permissions).

4. Transaction Control Language (TCL): TCL commands in SQL are used to manage transactions within the database. Transactions are units of work that consist of one or more SQL statements and are typically executed as a single, atomic operation. Common TCL commands include COMMIT (to commit a transaction and make its changes permanent) and ROLLBACK (to roll back or undo a transaction's changes).

5. Data Integrity: SQL supports various mechanisms for ensuring data integrity within databases, such as defining primary key and foreign key constraints, enforcing referential integrity, and using CHECK constraints to enforce data validation rules.

6. Data Retrieval and Analysis: SQL provides powerful capabilities for retrieving and analyzing data stored in relational databases. Using SELECT statements, SQL allows users to specify the data they want to retrieve from one or more tables, apply filtering criteria, perform calculations, and aggregate data using functions like SUM, AVG, COUNT, and GROUP BY.

7. Database Administration: SQL is essential for database administrators (DBAs) to perform various administrative tasks, such as creating and managing database users, monitoring database performance, optimizing query execution, and troubleshooting issues.

8. Integration with Programming Languages: SQL is commonly integrated with programming languages like Python, Java, and C# to develop database-driven applications. Application developers use SQL embedded within their code to interact with databases, execute queries, and process data retrieved from the database.

In summary, SQL is a fundamental tool in IT for managing, querying, and analyzing relational databases, and it plays a crucial role in database development, administration, and application development processes.

### SQL Commands

1. Data Definition Language (DDL)
   - CREATE
   - DROP
   - ALTER
   - TRUNCATE
2. Data Manipulation Language (DML)
   - INSERT
   - UPDATE
   - DELETE
3. Data Control Language (DCL)
   - GRANT
   - REVOKE
4. Transaction Control Language(TCL)
   - COMMIT
   - ROLLBACK
   - SAVEPOINT
5. Data Query Language(SQL)
   - SELECT

### Data types

1. Integers
   - INT
   - BIGINT
   - SMALLINT
   - FLOAT4
   - FLOAT8
   - NUMERIC(precision,scale)
   - SERIAL
2. Characters
   - CHAR
   - VARCHAR
   - TEXT
3. Date
   - TIME
   - TIMESTAMP
   - TIMESTAMPZ - timestamp with timezone
4. UUID

# Hands on practice with PostgreSQL

### `ATLER` - The ALTER keyword in SQL is used to modify existing database objects such as tables, indexes, or schemas.

```postgres
  ALTER TABLE table_name actions
```

actions are following...

- Rename a table
- modify data type of a column
- Add/Drop column
- Setting default value for a column
- Rename a column
- Add / Drop constraint for a column

Examples:

- Altering Table Structure:

  ```postgres
  -- rename existing table
  ALTER TABLE test_table RENAME TO new_table_name

  -- Renaming an index
  ALTER INDEX old_index_name RENAME TO new_index_name;

  -- Adding a new column to an existing table
  ALTER TABLE users ADD COLUMN email VARCHAR(100);

  -- drop existing column
  ALTER TABLE table_name DROP COLUMN city

  -- Modifying the data type of a column
  ALTER TABLE users ALTER COLUMN salary DECIMAL(10, 2);

  -- Renaming a column
  ALTER TABLE users RENAME COLUMN old_column_name TO new_column_name;
  ```

- Add, Modify and Remove Constraints

  ```postgres

  -- Adding a primary key constraint to a table
  ALTER TABLE users ADD CONSTRAINT pk_employee_id PRIMARY KEY (employee_id);

  -- Adding a foreign key constraint to a table
  ALTER TABLE orders
    ADD CONSTRAINT fk_employee_id
    FOREIGN KEY (employee_id)
    REFERENCES employees(employee_id);

  -- Modifying an existing constraint
  ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

  -- Dropping a constraint
  ALTER TABLE users DROP CONSTRAINT unique_email;

  -- add constraints of existing COLUMN (set not null to the column)
  ALTER TABLE users ALTER COLUMN user_name SET NOT NULL

  -- remove constraints of existing COLUMN (remove not null to the column)
  ALTER TABLE users ALTER COLUMN name DROP NOT NULL

  -- make and DROP primary KEY or UNIQUE
  ALTER TABLE users ADD CONSTRAINT unique_users_user_name UNIQUE(user_name);
  ALTER TABLE users DROP CONSTRAINT unique_users_user_name;
  ALTER TABLE users ADD CONSTRAINT pk_users_user_name PRIMARY KEY(user_name);
  ```

- Adding and Removing Indexes:

  ```postgres
  -- Adding an index to a table
  ALTER TABLE users ADD INDEX idx_last_name (last_name);

  -- Removing an index from a table
  ALTER TABLE users DROP INDEX idx_last_name;
  ```

- Modifying Sequences:

  ```postgres
  -- Altering a sequence's properties
  ALTER SEQUENCE employee_id_seq INCREMENT BY 1 START WITH 100;

  -- Restarting a sequence
  ALTER SEQUENCE employee_id_seq RESTART WITH 1;
  ```
