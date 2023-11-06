// Ternary, optional chaining & nullish coalescing operator

// Short Circuit Evaluation

/**
 * Never
 * unknown
 * nullable
 */

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