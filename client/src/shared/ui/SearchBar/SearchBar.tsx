import './SearchBar.css';

function SearchBar() {
    return (
        <div className="search-container">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
}

export default SearchBar;
