/**
 * Utility types
 */

type User = {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
};

// Pick - Pick specific fields type
type Email = Pick<User, 'email'>;
type Name = Pick<User, 'firstName' | 'lastName'>;

// Omit - remove specific fields type
type ContactInfo = Omit<User, 'firstName' | 'lastName'>;

type Address = {
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
};

// Required - Make Required from all optional fields
type RequiredAddress = Required<Address>;

// Partial - make optional from all Required field
type PartialAddress = Partial<Address>;

// Readonly - cannot modified that field
type UserReadonly = Readonly<User>;

// Record - define dynamic type of an object
const emptyObject: Record<string, unknown> = {
  firstName: 'Mr.',
  lastName: 'Example',
  age: 26,
};
