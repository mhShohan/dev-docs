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
processValue('a'); // Works fine
processValue('b'); // Works fine

// never type
function throwError(message: string): never {
  throw new Error(message);
}