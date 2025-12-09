import { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch, searchTerm }) {
  const [input, setInput] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or phone..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      {input && (
        <button onClick={handleClear} className="clear-button">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;