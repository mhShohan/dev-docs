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

Answer:

- `null` is an assignment value representing the intentional absence of any object value.
- `undefined` is a variable that has been declared but has not yet been assigned a value.

### Event Loop

Event loop হলো js runtime এর একটা পার্ট যা asynchronous code execution কে enables করে। and allowing the language to handle non-blocking operations efficiently. The event loop is responsible for managing the execution of code, handling events, and maintaining the flow of control.

- Call Stack: currently execution function er track rakhe
- Callback Queue: jokhn operation complete hoy tokhn call stack er funtion callback Queue te joma thake
- Event Loop: Continuously check call stack and callback queue. jokhn call stack empty hoy tokhn callback queue theke first function ta execution er jonno pathye dey
- Execution: call stack er fucntion gulo execute hoy.
- Callback execution: jokhn asynchronous operation complete hoy tokhn callback abar callback queue te fire jay
- repeat

### Higher Order Function

Higher order function ek dhoroner function ja ek bar eker beshi function argument hishebe ney and result hishebe function return kore

### Closure

closure is a function that enclose with lexical scope. Mane outer function er variable gula inner function a accessable

### callback fucntion

### promise

a Promise is an object that will produce a single value some time in the future. If the promise is successful, it will produce a resolved value, but if something goes wrong then it will produce a reason why the promise failed.

1. Hoisting কি ?
2. Closure কি ?
3. Bind, call, apply কি ?
4. Promise কি এবং কিভাবে কাজ করে ?
5. Async await কি এবং কেন ব্যবহার করব?
6. Spreed operator কি এবং implementation ?
7. Rest operator কি এবং implementation ?
8. useEffect কি এবং কেন ব্যবহার করব ?
9. React য়ের কিছু hook সম্পর্কে বল ?
