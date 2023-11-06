/**
 * Type Narrowing or type guard
 */

// Using typeof
type AlphaNumeric = string | number;

const add = (a: AlphaNumeric, b: AlphaNumeric): AlphaNumeric => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    return a.toString() + b.toString();
  }
};

// Using in operator
type NormalUser = { name: string };
type AdminUser = { name: string; role: 'admin' };

const getUser = (user: NormalUser | AdminUser) => {
  if ('role' in user) return { name: user.name, role: user.role };
  else return { name: user.name };
};

// Type Narrowing in OOP
// Using instanceof
class Vehicle {
  constructor(public name: string) {}

  start() {
    console.log('can start');
  }
}

class Car extends Vehicle {
  constructor(name: string) {
    super(name);
  }

  run() {
    console.log('can run');
  }
}

class Plane extends Vehicle {
  constructor(name: string) {
    super(name);
  }

  fly() {
    console.log('can fly');
  }
}

const vehicle = new Vehicle('bike');
const car = new Car('BMW');
const plane = new Plane('fighter plane');

// we can handle the logic inside of ifelse block smartly using function
const isCar = (vehicle: Vehicle): vehicle is Car => {
  return vehicle instanceof Car;
};
const isPlane = (vehicle: Vehicle): vehicle is Plane => {
  return vehicle instanceof Plane;
};

const getVehicle = (vehicle: Vehicle) => {
  console.log(vehicle.name);

  if (isCar(vehicle)) {
    vehicle.run();
    vehicle.start();
  } else if (isPlane(vehicle)) {
    vehicle.fly();
    vehicle.start();
  } else {
    vehicle.start();
  }
};
