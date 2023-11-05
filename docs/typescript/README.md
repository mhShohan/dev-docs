# TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript is often used in web development to build large-scale applications and is particularly popular with developers using frameworks like Angular.

- [Typescript official documentation](https://www.typescriptlang.org/docs/handbook)
- [Programming in TypeScript – Full Course
  ](https://www.freecodecamp.org/news/programming-in-typescript/)
- [Learn TypeScript – The Ultimate Beginners Guide](https://www.freecodecamp.org/news/learn-typescript-beginners-guide/)
- [TypeScript Handbook for React Developers – How to Build a Type-Safe Todo App](https://www.freecodecamp.org/news/typescript-tutorial-for-react-developers/)

# Table of Contents

1. [Pros and Cons of Typescript](#pros-and-cons-of-typescript)
2. [Install TypeScript and TS config](#install-typescript-and-ts-config)
3. [Data Types of Typescript](#data-types-of-typescript-example)
   - [Primitive types](#primitive-data-types)
   - [Non-Primitive types](#non-primitive-data-types)
   - [Function](#function)
   - [Union and Intersection types](#union-and-intersection-types)
4. [Type Alias](#type-alias)
5. [Interface](#interfaces)

# Pros and Cons of Typescript

Every programming languages is created to serve few purpose, so that there have pros and cons.Here are some of the key pros and cons of TypeScript:

### Pros:

1. `Static Typing`: TypeScript enforces static typing, which means you can catch type-related errors at compile time rather than runtime. This can help improve code quality and catch bugs early in the development process.

2. `Enhanced Tooling`: TypeScript provides excellent tooling and editor support. Popular code editors like Visual Studio Code offer rich TypeScript integration, including auto-completion, error checking, and code navigation.

3. `Code Maintainability`: Strongly typed code is often more self-documenting and easier to understand, making it easier to maintain and refactor code bases, especially in large projects.

4. `Improved Collaboration`: The use of static types can make it easier for teams to collaborate on a project, as it provides a clear contract for functions and interfaces.

5. `Rich Ecosystem`: TypeScript has a rich ecosystem with a variety of libraries and frameworks designed to work with it, making it suitable for building complex applications.

6. `Transpilation`: TypeScript code can be transpiled into plain JavaScript, making it compatible with all major browsers and environments.

### Cons:

1. `Learning Curve`: TypeScript introduces a learning curve for developers who are new to static typing. It may take time to fully grasp TypeScript's type system and its nuances.

2. `Overhead`: Adding type annotations can make the codebase slightly more verbose, which can be seen as an overhead, especially for small projects.

3. `Tooling Dependency`: TypeScript's strong tooling support means that you may rely heavily on specific editors or build tools to maximize its benefits. This can be a limitation in some development environments.

4. `Compilation Step`: TypeScript requires a compilation step before execution, which may slow down the development process compared to pure JavaScript development.

5. `Type Definitions`: While TypeScript has a rich ecosystem, not all JavaScript libraries have well-maintained type definitions, which can be frustrating when integrating third-party code.

In summary, TypeScript is a powerful language that offers many advantages for building large-scale applications, but it comes with a learning curve and some overhead. The decision to use TypeScript depends on the specific needs of a project and the preferences of the development team.

# Install TypeScript and TS config

- Install TypeScript

```bash
  npm install -g typescript
```

- TS Config

```bash
  tsc --init
```

# Data Types of Typescript (example)

### Basis Types

- Primitive Types
  - number
  - string
  - boolean
  - null
  - undefined
  - never
  - unknown
  - void
  - symbol
- Non-Primitive types

  - Array
  - Tuple
  - Object

## Primitive Data types

```ts
// type annotations
const authorTwo: string = 'James Clear'; // explicit way of data type define
const authorOne = 'Brian Tracy'; // implicit way of data type define
// we don’t always have to write explicit type annotations. In many cases, TypeScript can even just infer the types

// basic data types
const author: string = 'Cal Newport';
const age: number = 52;
const isActive: boolean = true;
const fb: undefined = undefined;
const x: null = null;

// literal type
const alignment: 'left' | 'center' | 'right' = 'center';

// void type
function logMessage(): void {
  console.log('This is a log message.');
}

// unknown type
function processValue(value: unknown) {
  if (typeof value === 'string') {
    // You can safely use value as a string here
    console.log(value.toUpperCase());
  } else if (typeof value === 'number') {
    // You can safely use value as a number here
    console.log(value.toFixed(2));
  } else {
    console.log('Value is of an unknown type');
  }
}
processValue(a); // Works fine
processValue(b); // Works fine

// never type
function throwError(message: string): never {
  throw new Error(message);
}
```

## Non-primitive Data types

```ts
/**
 * Array
 */
const books: string[] = ['Time Management', 'Atomic Habits', 'Deep Work'];
const prices: number[] = [1, 2, 3, 4, 5];

/**
 * Tuple
 */
const coordinate: [number, number] = [10, 20];
const fullNameWithAge: [string, string, number] = ['Napoleon', 'Hill', 65];

/**
 * Object
 */
const bookOne: {
  readonly id: string;
  title: string;
  author: string;
  price: number;
  pages: number;
  isAvailable?: boolean; // optional type
  category: 'BestSeller'; // literal type
} = {
  id: 'abc123',
  title: 'Deep Work',
  author: 'James Clear',
  price: 220,
  pages: 180,
  category: 'BestSeller',
};
```

## Function

```ts
//Normal Function
function add(a: number, b: number): number {
  return a + b;
}

//arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// type of a function which returns a promise,
async function getUsername(): Promise<string> {
  return 'james';
}

//method
const book: {
  title: string;
  author: string;
  available: string;
  stock: number;
  addStock: (qnt: number) => string;
} = {
  title: 'Leadership',
  author: 'Brian Tracy',
  available: 'true',
  stock: 0,
  addStock: function (qnt: number): string {
    this.stock + qnt;
    return qnt + ' Books added';
  },
};

//callback
const bookList: string[] = ['Deep Work', 'Leadership', 'Atomic Habits'];
const uppercaseBookList: string[] = bookList.map((book: string): string => book.toUpperCase());
```

## Union and Intersection types

```ts
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
```

## Type Alias

Type alias is a way to create a new name for an existing type or to define complex types that may be used multiple times

```ts
// type alias
type Address = {
  city: string;
  country: string;
};

type Student = {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  contactNo?: string;
  address?: Address;
};

const studentOne: Student = {
  firstName: 'James',
  lastName: 'Clear',
  age: 60,
  gender: 'male',
};

type CreateFullName = (fName: string, lName: string) => string;
const createFullName: CreateFullName = (fName, lName) => `${fName} ${lName}`;
```

## Interfaces

An interface is a way to define type for the structure of an object. It describes the properties, methods, and their types that an object should have. Interfaces are a fundamental part of TypeScript and are used for defining object shapes and ensuring type checking.

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function greet(person: Person) {
  console.log(`Hello, ${person.firstName} ${person.lastName}!`);
}
```

[Differences Between Type Aliases and Interfaces](https://blog.bitsrc.io/type-vs-interface-in-typescript-cf3c00bc04ae)
