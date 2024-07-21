import './SearchBar.css';

function SearchBar() {
    return (
        <div data-testid="searchbar" className="search-container">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
}

export default SearchBar;
