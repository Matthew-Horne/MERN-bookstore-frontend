type Book = {
  _id: string;
  title: string;
  description: string;
  category: string;
  trending: boolean;
  coverImage: string;
  oldPrice: number;
  newPrice: number;
};

type BookCardProps = {
  book: Book;
};
export type { Book };
export type { BookCardProps };
