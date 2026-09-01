
import React from "react";

function Search({ searchTerm, onSearch }) {
  function handleChange(event) {
    onSearch(event.target.value);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>

      <input
        id="search"
        placeholder="Type a name to search..."
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
