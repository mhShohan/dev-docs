/**
 * Generic with Interface
 */

interface Developer<T, X, Y, Z = null> {
  name: string;
  email: string;
  skills: T;
  address: X;
  remote?: Y;
  graduated?: Z;
}

const jrDeveloper: Developer<string, { county: string; city: string }, null> = {
  name: 'example',
  email: 'example@gmail.com',
  skills: 'Front-end Development',
  address: { county: 'Bangladesh', city: 'Dhaka' },
};
const srDeveloper: Developer<string[], string, boolean, boolean> = {
  name: 'example 2',
  email: 'example2@gmail.com',
  skills: ['Front-end Development', 'Backend-Development'],
  address: 'Dhaka, Bangladesh',
  remote: true,
  graduated: true,
};
