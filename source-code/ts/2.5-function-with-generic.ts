/**
 *  Function with generics
 */
function identity<T>(arg: T): T {
  return arg;
}

// Usage:
let value: number = identity(42); // The function returns a number.
let message: string = identity('Hello, TypeScript!'); // The function returns a string.

const createTuple = <X, Y>(first: X, last: Y): [X, Y] => {
  return [first, last];
};

// usage
const fullName = createTuple<string, string>('Casciaro', 'Mammino');
const nameAge = createTuple<string, number>('Brain', 23);
const nameStatus = createTuple<string, boolean>('bruce', true);
