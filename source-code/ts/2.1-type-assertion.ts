// type assertion

let anything: any;
anything = 'Hello, World!';
(anything as string).toUpperCase();

const kgToGram = (value: string | number): string | number | undefined => {
  if (typeof value === 'string') {
    const convertedValue = parseFloat(value) * 1000;
    return `The converted value is: ${convertedValue}`;
  } else if (typeof value === 'number') {
    return value * 1000;
  }
};

const resultOne = kgToGram(2) as number;
const resultTwo = kgToGram('5') as string;

type CustomError = {
  message: string;
};

try {
  console.log('something');
} catch (error) {
  console.log((error as CustomError).message);
}

let someValue: any = 'Hello, TypeScript!';
let strLength: number = (<string>someValue).length;

console.log(strLength);
