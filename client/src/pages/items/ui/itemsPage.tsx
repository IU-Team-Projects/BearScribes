'use client';
import './Items.css';
import Item from '@/shared/ui/Item/Item';
import UserBook from '@/models/userBook';
import Footer from '@/shared/ui/Footer/Footer';
import Header from '@/shared/ui/Header/Header';
import SearchBar from '@/shared/ui/SearchBar/SearchBar';

let books: UserBook[] = [
  {
    name: 'Dead Souls',
    username: 'Timur',
    description: 'This is a great bookaj;sdlfkja;lsdkj;falkjsd;lfkja;lsk',
    telegram: 'masterhorny1',
    cover:
      'https://img3.labirint.ru/rc/b6146b243819a780583cfa781c883928/363x561q80/books91/901899/cover.jpg?1668180317',
  },
  {
    name: 'Alice in wonderland',
    username: 'Artur',
    description: 'This is an amazing book',
    telegram: 'CatOrLeader',
    cover:
      'https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781447279990.jpg',
  },
  {
    name: 'It',
    username: 'Vlad',
    description: 'This is an amazing book',
    telegram: 'deeprecession',
    cover:
      'https://m.media-amazon.com/images/I/61pjyMrRCSL._AC_UF1000,1000_QL80_.jpg',
  },
];

export function ItemsPage() {
  return (
    <div className="items-container">
      <Header />
      <SearchBar />
      <div className="book-item">
        {books.map((book, index) => (
          <Item key={index} book={book} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
