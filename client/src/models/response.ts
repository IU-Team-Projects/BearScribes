import Book from './book';

interface Response {
  kind: string;
  id: string;
  items: Book[];
}

export default Response;
