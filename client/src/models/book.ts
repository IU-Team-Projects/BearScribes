interface Book {
    id: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
}

interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
    averageRating: number;
    coverId: string;
}

export default Book;
