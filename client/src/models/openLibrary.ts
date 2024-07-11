interface OpenLibraryResponse {
    numFound: number,
    start: number,
    numFoundExact: boolean,
    docs: OpenLibraryBook[]
}

interface OpenLibraryBook {
    cover_i: string,
}

export default OpenLibraryResponse