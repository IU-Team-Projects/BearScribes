interface Response {
    kind: string,
    id: string,
    items: Book[]
}

interface Book {
    id: string, 
    selfLink: string,
    volumeInfo: VolumeInfo
    
}

interface ImageLinks {
    smallThumbnail: string,
    thumbnail: string
}

interface VolumeInfo {
    title: string,
    authors: string[]
    publisher: string, 
    publishDate: Date,
    description: string, 
    pageCount: number,
    categories: string[],
    averageRating: number,
    ratingsCount: number,
    imageLinks: ImageLinks,
}



export default Book