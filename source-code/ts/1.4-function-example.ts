/**
 * Function Type Expressions
 */
type PrintHello = (str: string) => string;

const greeting = (callbackFn: PrintHello): string => {
  const greet = callbackFn('Hello World!');
  return greet;
};

const printHello: PrintHello = (str: string) => str;

const result = greeting(printHello);
console.log(result);

/**
 * Inference
 */
const mapArray = <X, Y>(numArr: X[], callbackFn: (arg: X) => Y): Y[] => {
  return numArr.map(callbackFn);
};

const resultOne = mapArray(['a', 'b', 'c'], (str) => str.toUpperCase());
const resultTwo = mapArray([1, 2, 3], (num) => num.toString());
const resultThree = mapArray(['1', '2', '3'], (num) => Number(num));

console.log({ resultOne, resultTwo, resultThree });

/**
 * Constraints
 */

interface Book {
  id: string;
  title: string;
  availableQTY: number;
}
const addToStock = <T extends Book>(book: T, value: number): T => {
  book.availableQTY += value;
  return book;
};

const bookOne: Book = { id: '1', title: 'Atomic Habits', availableQTY: 0 };

console.log(addToStock(bookOne, 10));
console.log(addToStock(bookOne, 10));
console.log(addToStock(bookOne, 10));
