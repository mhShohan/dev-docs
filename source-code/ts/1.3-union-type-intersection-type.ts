// Union and Intersection types

/**
 * Union type
 */
const mixed: (string | number)[] = ['apple', 24, 'book'];

/**
 * intersection type
 */
type Person = { name: 'string' };
type Employee = { role: 'employee' };

type EmployeeRole = Person & Employee;
