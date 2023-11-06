// type alias
type Address = {
  city: string;
  country: string;
};

type Student = {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  contactNo?: string;
  address?: Address;
};

const studentOne: Student = {
  firstName: 'James',
  lastName: 'Clear',
  age: 60,
  gender: 'male',
};

type CreateFullName = (fName: string, lName: string) => string;
const createFullName: CreateFullName = (fName, lName) => `${fName} ${lName}`;
