/**
 * Constraints
 * generic constraints allow you to restrict the types that can be used as type parameters in a generic function or class. Constraints ensure that you can only use types that meet certain criteria, such as having specific properties or implementing certain interfaces. This helps you write more specific and type-safe generic code.
 */

interface Book {
  id: string;
  name: string;
  author: string;
}

const addBook = <T extends Book>(info: T) => {
  return { ...info };
};

const newBookOne = addBook({
  id: '123',
  name: 'Think and Grow Rich',
  author: 'Napolion Hill',
  price: 120,
});

const newBookTwo = addBook({
  id: '123',
  name: 'Think and Grow Rich',
  author: 'Napolion Hill',
  isAvailable: false,
});

/**
 * generic Constraints with keyof operator
 */
type Movie = {
  thriller: string;
  horror: string;
  fantasy: string;
};

type MovieGenre = keyof Movie;

// -----------------------------------------
const getProperty = <X>(obj: X, key: keyof X) => {
  return obj[key];
};

const userOne = { id: '1231', name: 'Mr.A' };
const userTwo = { name: 'Mr.B', email: 'a@a.com' };

const resOne = getProperty(userOne, 'name');
const resTwo = getProperty(userTwo, 'email');

// -------- or ----------------------
const getPropertyValue = <X, Y extends keyof X>(obj: X, key: Y) => {
  return obj[key];
};

const res1 = getProperty({ id: '1231', name: 'Mr.A' }, 'id');
const res2 = getProperty({ name: 'Mr.B', email: 'a@a.com' }, 'email');
