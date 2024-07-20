export interface Book {
    open_library_book: string;
    id: number;
    title: string;
    authors: string;
    cover_url: string;
}
  
export interface Owner {
    name: string;
    city: string;
    phone_number: string;
    telegram_profile: string;
    id: number;
}
  
export interface BookData {
    book: Book;
    owner: Owner;
    publish_date?: string;
    number_of_pages?: number;
    publishers?: string[];
    description?: string;
    is_owner: boolean;
}
  