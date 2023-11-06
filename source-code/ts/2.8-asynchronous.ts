/**
 * Asynchronous TypeScript
 * - Promise
 */

interface Book {
  name: string;
  author: string;
}

const createPromise = (): Promise<Book> => {
  return new Promise<Book>((resolve, reject) => {
    const book = { name: 'Atomic Habits', author: 'James Clear' };
    // const book = null;

    if (book) {
      resolve(book);
    } else {
      reject('Failed to load book');
    }
  });
};

(async () => {
  try {
    const book = await createPromise();
    console.log(book);
  } catch (error) {
    console.log(error);
  }
})();

//// -------- example -----------
interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const getTodo = async (): Promise<ITodo | undefined> => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

console.log(getTodo());
