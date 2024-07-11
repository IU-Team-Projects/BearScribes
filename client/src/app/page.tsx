import Image from "next/image";
import Item from "./items/Item"
import Items from "./items/page";
import UserBook from "@/models/userBook";
import BookInfo from "./bookInfo/page";
import Book from "@/models/book";
import Response from "@/models/response"
import OpenLibraryBook from "@/models/openLibrary";
import OpenLibraryResponse from "@/models/openLibrary";


// export default function Home() {
//   return <Items />
// }


function createSearchString(book: string): string {
  let lowercaseString = book.toLowerCase();
  let resultString = lowercaseString.replace(/ /g, "+");
  return resultString
}

async function Home() {
  const search = "Harry potter and the goblet of fire"
  const searchString = createSearchString(search)
  const googleApiUrl = 'https://www.googleapis.com/books/v1/volumes?q='+searchString;
  console.log(googleApiUrl)
  const openLibraryUrl = "https://openlibrary.org/search.json?title="+searchString;
  try {
      const response = await fetch(googleApiUrl, { cache: 'no-store' });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Response = await response.json();
      const book = data.items[0];

      const openLibraryResponse = await fetch(openLibraryUrl, {cache: "no-store"});
      const openLibraryData: OpenLibraryResponse = await openLibraryResponse.json();
      book.volumeInfo.coverId = openLibraryData.docs[0].cover_i
      console.log(openLibraryData)
      return (
        // <pre>{JSON.stringify(book, null, 2)}</pre>
        <BookInfo book={book}/>
      );
  } catch (error) {
      console.error('Error fetching data:', error);
      return (
          <div>
              <h1>Error</h1>
              <p>Failed to fetch books.</p>
          </div>
      );
  }
};

export default Home;


