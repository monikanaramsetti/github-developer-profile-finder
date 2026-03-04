import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search GitHub Username..."
          className="w-full px-6 py-4 pl-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 dark:text-gray-200 text-lg placeholder-gray-400 group-hover:shadow-md dark:group-hover:shadow-blue-900/10"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
