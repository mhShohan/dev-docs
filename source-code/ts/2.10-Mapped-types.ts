/**
 * Mapped Types
 * Mapped types are a powerful and flexible feature in TypeScript that allow you to create new types by transforming the properties of an existing type. They are particularly useful for creating utility types that modify or extract properties from other types in a concise and generic way. Mapped types leverage key remapping and type manipulation to generate new types based on existing ones.
 */

type Area = {
  width: number;
  height: number;
};

type Width = Area['width']; // lookup type

type AreaAsString = {
  [key in keyof Area]: string;
};

type GenericArea<T> = {
  [key in keyof T]: T[key];
};

const area1: GenericArea<{ width: string; height: number }> = { height: 2, width: '3' };

// ----------------------------------------------------
type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};

type MyPerson = {
  name: string;
  age: number;
};

type ReadonlyPerson = ReadonlyType<MyPerson>; // { readonly name: string; readonly age: number; }

// ---------------------------------------------------
type PartialType<T> = {
  [K in keyof T]?: T[K];
};

type PartialPerson = PartialType<MyPerson>; // { name?: string; age?: number; }

// ----------------------------------------------------
type PickType<T, K extends keyof T> = {
  [P in K]: T[P];
};

type NameOnly = PickType<MyPerson, 'name'>; // { name: string; }
