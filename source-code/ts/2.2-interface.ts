// interface only use to define  the structure of Object, not use for any primitive types
interface Author {
  firstName: string;
  lastName: string;
}

const authorOne: Author = {
  firstName: 'James',
  lastName: 'Clear',
};

// interface can be extends with interface and type alias
interface AuthorWithGenre extends Author {
  genre: 'motivation' | 'thriller';
  status: 'active' | 'passed-away';
}

const authorTwo: AuthorWithGenre = {
  firstName: 'Cal',
  lastName: 'Newport',
  genre: 'motivation',
  status: 'passed-away',
};

// implements interface in class
class User implements Author {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string, s) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
