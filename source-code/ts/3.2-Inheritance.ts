/**
 * Inheritance
 */

class Person {
  public id: string;
  public name: string;
  public email: string;

  constructor(name: string, email: string) {
    this.id = Date.now().toString();
    this.name = name;
    this.email = email;
  }

  print() {
    console.log({ name: this.name, email: this.email });
  }
}

class Student extends Person {
  public department: string;
  constructor(name: string, email: string, department: string) {
    super(name, email);
    this.department = department;
  }

  printStudent(): void {
    console.log({
      name: this.name,
      email: this.email,
      department: this.department,
    });
  }
}

class Teacher extends Student {
  public designation: string;

  constructor(name: string, email: string, department: string, designation: string) {
    super(name, email, department);
    this.designation = designation;
  }

  printTeacher(): void {
    console.log({
      name: this.name,
      email: this.email,
      department: this.department,
      designation: this.designation,
    });
  }
}

const person = new Person('Mr. Person', 'person@gmail.com');
const student = new Student('Mr. Student', 'student@gmail.com', 'EEE');
const teacher = new Teacher('Mr. Teacher', 'teacher@gmail.com', 'EEE', 'Lecturer');

person.print();
student.print();
teacher.print();
