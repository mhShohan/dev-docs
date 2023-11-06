// In object-oriented programming (OOP), the static keyword is used to define properties and methods that belong to the class itself, rather than to instances (objects) of the class. These static members are shared across all instances of the class and can be accessed using the class name rather than an instance.

class Circle {
  static pi: number = 3.14159;
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  circumference() {
    return 2 * Circle.pi * this.radius;
  }
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(Circle.pi); // Accessing the static property
console.log(circle1.circumference()); // Using the instance method
console.log(circle2.circumference()); // Using the instance method

//------------------------------------------
class MathUtil {
  static add(x: number, y: number): number {
    return x + y;
  }

  static multiply(x: number, y: number): number {
    return x * y;
  }
}

const sum = MathUtil.add(3, 4); // Using the static method
const product = MathUtil.multiply(5, 6); // Using the static method

console.log(sum); // Output: 7
console.log(product); // Output: 30
