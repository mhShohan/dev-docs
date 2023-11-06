//Normal Function
function add(a: number, b: number): number {
  return a + b;
}

//arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

//method
const book: {
  title: string;
  author: string;
  available: string;
  stock: number;
  addStock: (qnt: number) => string;
} = {
  title: 'Leadership',
  author: 'Brian Tracy',
  available: 'true',
  stock: 0,
  addStock: function (qnt: number): string {
    this.stock + qnt;
    return qnt + ' Books added';
  },
};

//callback
const bookList: string[] = ['Deep Work', 'Leadership', 'Atomic Habits'];
const uppercaseBookList: string[] = bookList.map((book: string): string => book.toUpperCase());
