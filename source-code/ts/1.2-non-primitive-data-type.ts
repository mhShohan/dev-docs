/**
 * Array
 */
const books: string[] = ['Time Management', 'Atomic Habits', 'Deep Work'];
const prices: number[] = [1, 2, 3, 4, 5];

/**
 * Tuple
 */
const coordinate: [number, number] = [10, 20];
const fullNameWithAge: [string, string, number] = ['Napoleon', 'Hill', 65];

/**
 * Object
 */
const bookOne: {
  readonly id: string;
  title: string;
  author: string;
  price: number;
  pages: number;
  isAvailable?: boolean; // optional type
  category: 'BestSeller'; // literal type
} = {
  id: 'abc123',
  title: 'Deep Work',
  author: 'James Clear',
  price: 220,
  pages: 180,
  category: 'BestSeller',
};