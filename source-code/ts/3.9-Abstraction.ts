/**
 * Abstraction
 * Abstraction in programming refers to the concept of hiding complex
implementation details and exposing only the necessary information or
functionalities to the user. 
 */
//------------------------
// Using interface
//------------------------
interface TakePhoto {
  cameraMode: string;
  filter: string;
  burst: number;
}

//implements of properties in class
interface CountLikes {
  likes: number;
}

//implements of methods in Class
interface Story {
  createStory(): void;
}

class Instagram implements TakePhoto, Story, CountLikes {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burst: number,
    public likes: number
  ) {}

  createStory(): void {
    console.log({
      cameraMode: this.cameraMode,
      filter: this.filter,
      burst: this.burst,
      likes: this.likes,
    });
  }
}

//------------------------
// Using Abstract class => cannot create instance of any abstract class
//------------------------
abstract class Shape {
  constructor(protected color: string) {}

  abstract getArea(): number; // Abstract method without implementation
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number, color: string) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const redCircle = new Circle(5, 'red');
const blueRectangle = new Rectangle(4, 6, 'blue');

console.log(redCircle.getArea()); // Output: 78.53981633974483
console.log(blueRectangle.getArea()); // Output: 24
