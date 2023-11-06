/**
 * Generic
 * => Generics in TypeScript allow you to create reusable components, functions, and classes that can work with a variety of data types. They provide a way to write code that is both flexible and type-safe. Generics are especially useful when you want to create functions or classes that work with different data types without losing type information.
 */

type GenArray<T> = Array<T>;

const srtArr: GenArray<string> = ['a', 'b'];
const numArr: GenArray<number> = [1, 2];
const boolArr: GenArray<boolean> = [true, false];

type Name = {
  id: string;
  fName: string;
  lName: string;
};

const objArr: GenArray<Name> = [
  { id: 'sdadsa', fName: 'james', lName: 'clear' },
  { id: 'afsdfa', fName: 'james', lName: 'clear' },
];

/**
 * Generic Tuple
 */

type GenericTuple<X, Y> = [X, Y];

const nameAge: GenericTuple<string, number> = ['Napoleon Hill', 47];
const genreStatus: GenericTuple<string, string> = ['motivation', 'active'];

const nameWithId: GenericTuple<Name, string> = [
  { id: 'afsdfa', fName: 'james', lName: 'clear' },
  '1232',
];
