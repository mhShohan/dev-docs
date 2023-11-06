/**
 * Basic structure of a class
 * Classes are the blueprints or templates for creating objects. They define the structure, attributes, and methods that objects of that class will have. Objects, on the other hand, are instances of classes that hold specific data and can perform actions.
 */

class Book {
  id: string;
  name: string;
  author: string;

  constructor(id: string, name: string, author: string) {
    this.id = id;
    this.name = name;
    this.author = author;
  }

  printBook() {
    console.log({
      id: this.id,
      name: this.name,
      author: this.author,
    });
  }
}

const bookOne = new Book('1', 'Deep Word', 'Cal Newport');
bookOne.printBook();

// ------------- Short Hand ------------------------
class BookShortHand {
  // parameter properties
  constructor(public id: string, public name: string, public author: string) {}

  printBook() {
    console.log({
      id: this.id,
      name: this.name,
      author: this.author,
    });
  }
}

const bookTwo = new BookShortHand('1', 'Deep Word', 'Cal Newport');
bookTwo.printBook();
