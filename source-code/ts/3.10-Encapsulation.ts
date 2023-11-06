/**
 * Encapsulation
 * Encapsulation is one of the fundamental principles of object-oriented programming (OOP). It involves bundling data (attributes or properties) and methods (functions) that operate on that data into a single unit, called an object. This unit is responsible for controlling access to its internal state and ensuring that data remains in a consistent and valid state. Encapsulation promotes data hiding and provides a way to protect data from unauthorized access and modification.
 */

class Student {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Getter method for 'name'
  public getName(): string {
    return this.name;
  }

  // Setter method for 'name'
  public setName(name: string): void {
    this.name = name;
  }

  // Getter method for 'age'
  public getAge(): number {
    return this.age;
  }

  // Setter method for 'age'
  public setAge(age: number): void {
    if (age >= 0) {
      this.age = age;
    }
  }
}

const student = new Student('Alice', 20);

// Accessing and modifying properties through getter and setter methods
console.log(student.getName()); // Output: Alice
console.log(student.getAge()); // Output: 20

student.setName('Bob');
student.setAge(25);

console.log(student.getName()); // Output: Bob
console.log(student.getAge()); // Output: 25
