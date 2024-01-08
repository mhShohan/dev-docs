### 1. What is JavaScript?

Answer: JavaScript is a high-level, interpreted programming language primarily used for building interactive web pages. It runs on the client side and allows dynamic content and behavior in web applications.

### 2. What is the difference between let, const, and var in JavaScript?

Answer:

- var is function-scoped, and it can be redeclared.
- let is block-scoped and allows reassignment.
- const is also block-scoped but cannot be reassigned after declaration.

### 3. Explain the concept of closures in JavaScript.

Answer: Closures occur when a function is defined inside another function, and the inner function has access to the outer function's variables. It "closes over" the outer function's scope.

### 4. What is the event loop in JavaScript?

Answer: The event loop is a core concept in JavaScript that handles asynchronous operations. It continuously checks the message queue and executes callbacks when the call stack is empty, allowing non-blocking asynchronous behavior.

### 5. Explain the difference between `==` and `===` in JavaScript.

Answer:

- `==` is the equality operator, which performs type coercion if the operands are of different types.
- `===` is the strict equality operator, which checks both value and type without type coercion.

### 6. What is the purpose of this keyword in JavaScript?

Answer: The this keyword refers to the object it belongs to. Its value is determined by how a function is called. In the global scope, this refers to the global object; in a method, it refers to the object the method was called on.

### 7. Explain the concept of promises in JavaScript.

Answer: Promises are objects representing the eventual completion or failure of an asynchronous operation. They have three states: pending, fulfilled, or rejected. Promises simplify handling asynchronous code and make it more readable.\
Or a Promise is an object that will produce a single value some time in the future. If the promise is successful, it will produce a resolved value, but if something goes wrong then it will produce a reason why the promise failed.

### 8. What is the purpose of the bind method in JavaScript?

Answer: The bind method is used to create a new function with a specific this value and, optionally, initial arguments. It's often used to bind a function to a particular context.

### 9. How does hoisting work in JavaScript?

Answer: Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase. However, only the declarations are hoisted, not the initializations.

### 10. What is the difference between null and undefined in JavaScript?

Answer: `null` is an assignment value representing the intentional absence of any object value, while `undefined` is a variable that has been declared but has not yet been assigned a value.

### 11. Callback function

Answer: A callback function is a function passed as an argument to another function, which is then invoked inside the outer function. Callbacks are often used to handle asynchronous operations or to define behavior that will be executed later.

### 12. Higher-order function

Answer: A higher-order function is a function that takes one or more functions as arguments or returns a function as its result. They are often used to create more abstract and reusable code.

### 13. Pure function

Answer: A pure function is a function that always produces the same output for the same input, has no side effects (doesn't modify external state), and is predictable, making it easier to understand, test, and reason about in code.

### 14. Closure

Answer: A closure in JavaScript is the combination of a function and the lexical environment within which that function was declared. Where outer function variable's are accessible into the inner function.

```js
function outerFunction(x) {
  return (y) => {
    return x + y; // innerFunction has access to x from outerFunction
  };
}
```

### 15. Promise

Answer: Promise is an object that will produce a single value some time in the future. If the promise is successful, it will produce a resolved value, but if something goes wrong then it will produce a reason why the promise failed.

### 16. What is the purpose of the Map and Set objects in JavaScript?

Answer: Map is an object that holds key-value pairs, allowing any data type as keys. Set is an object that stores unique values. Both provide efficient ways to manage collections of data.

### Event Loop

Event loop হলো js runtime এর একটা পার্ট যা asynchronous code execution কে enables করে। and allowing the language to handle non-blocking operations efficiently. The event loop is responsible for managing the execution of code, handling events, and maintaining the flow of control.

- Call Stack: currently execution function er track rakhe
- Callback Queue: jokhn operation complete hoy tokhn call stack er funtion callback Queue te joma thake
- Event Loop: Continuously check call stack and callback queue. jokhn call stack empty hoy tokhn callback queue theke first function ta execution er jonno pathye dey
- Execution: call stack er fucntion gulo execute hoy.
- Callback execution: jokhn asynchronous operation complete hoy tokhn callback abar callback queue te fire jay
- repeat

1. Hoisting কি ?
2. Closure কি ?
3. Bind, call, apply কি ?
4. Promise কি এবং কিভাবে কাজ করে ?
5. Async await কি এবং কেন ব্যবহার করব?
6. Spreed operator কি এবং implementation ?
7. Rest operator কি এবং implementation ?
8. useEffect কি এবং কেন ব্যবহার করব ?
9. React য়ের কিছু hook সম্পর্কে বল ?

//----------------------------------------------------------------------------- \
//-----------------------------------------------------------------------------

- What is the event delegation in JavaScript?

  Answer: Event delegation is a technique where a single event listener is attached to a common ancestor rather than individual elements. It leverages event bubbling to manage events efficiently.

- Explain the concept of prototypal inheritance in JavaScript.

  Answer: In JavaScript, objects can inherit properties and methods from other objects through their prototype chain. Each object has a prototype object, and properties/methods are looked up in the prototype chain.

- What is the significance of the new keyword when creating objects?

  Answer: The new keyword is used to create an instance of a constructor function in JavaScript. It sets up a new object, sets the constructor's prototype as the new object's prototype, and executes the constructor function.

- What is a callback hell, and how can it be avoided?

  Answer: Callback hell (or pyramid of doom) refers to deeply nested callback functions, often seen in asynchronous JavaScript. It can be avoided using techniques like promises, async/await, or modularizing code.

- What is the this keyword in JavaScript, and how does it differ from regular function calls to arrow function calls?

  Answer: The this keyword refers to the object it belongs to. Arrow functions don't have their own this; they inherit it from the enclosing scope.

- What is the purpose of the bind method, and how does it work?

  Answer: The bind method is used to create a new function with a specific this value. It does not invoke the function immediately but returns a new function that can be invoked later.

- Explain the concept of promises and how they help with asynchronous programming.

  Answer: Promises are objects representing the eventual completion or failure of an asynchronous operation. They simplify handling asynchronous code and make it more readable, replacing callback-based patterns.

- What are arrow functions in JavaScript, and how do they differ from regular functions?

  Answer: Arrow functions are a concise way to write functions in JavaScript. They don't have their own this and arguments bindings, making them especially useful in callback scenarios.

### What is promise and how it work.

Answer: A promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation. It is a way to handle operations that take time to complete, such as fetching data from a server or reading a file, without blocking the rest of the code.\

A promise has three states:

- Pending: The initial state; the promise is neither fulfilled nor rejected.
- Fulfilled: The operation completed successfully, and the promise has a resulting value.
- Rejected: The operation failed, and the promise has a reason for the failure.
