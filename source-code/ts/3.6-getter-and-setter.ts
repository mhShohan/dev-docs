class ModuleFinished {
  private count = 5;

  constructor() {}

  get finishedModule(): number {
    return this.count;
  }

  set addModule(val: number) {
    this.count = this.count + val;
  }
}

const course = new ModuleFinished();
// getter function of ModuleFinished class, invoking system is like accessing object
// can access like a property of an object
console.log(course.finishedModule);

//setter function
course.addModule = 1;
course.addModule = 2;
console.log(course.finishedModule);
