import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, Loader2, AlertCircle, Info, Sun, Moon, History } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import { mockUser, mockRepos } from './utils/mockData';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMock, setIsMock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('updated'); // 'updated' or 'stars'
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const fetchUserData = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setIsMock(false);

    try {
      // Fetch User Profile
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userResponse.data);

      // Fetch Repositories
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      setRepos(reposResponse.data);

      // Handle successful search: Update history
      updateSearchHistory(username);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        console.warn("API Rate limited, using mock data for demo.");
        setUser(mockUser);
        setRepos(mockRepos);
        setIsMock(true);
        updateSearchHistory(username); // Still count as success for history
      } else if (err.response && err.response.status === 404) {
        setError("User not found. Please try another username.");
      } else {
        setError("An error occurred while fetching data. Please try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchHistory = (username) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(name => name.toLowerCase() !== username.toLowerCase());
      const updated = [username, ...filtered].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const sortedRepos = [...repos].sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.updated_at) - new Date(a.updated_at);
  }).slice(0, 8);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 transition-colors duration-300 ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800 py-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 dark:bg-blue-600 rounded-xl text-white">
              <Github className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold dark:text-white tracking-tight">
              GitHub <span className="text-blue-600 dark:text-blue-400">Developer</span> Finder
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
              Powered by GitHub API
            </p>
          </div>
        </div>
      </header>

      <main className="pb-20">
        {/* Search Section */}
        <section className="bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent pt-12 pb-8">
          <div className="text-center mb-8 px-4">
            <h2 className="text-3xl font-extrabold dark:text-white sm:text-4xl mb-3">
              Find Any Developer Profile
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              Search by username to explore profiles, stats, and top repositories instantly.
            </p>
          </div>
          <SearchBar onSearch={fetchUserData} />

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="max-w-2xl mx-auto px-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <History className="w-4 h-4" />
                <span>Recent Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((name) => (
                  <button
                    key={name}
                    onClick={() => fetchUserData(name)}
                    className="px-4 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Searching the GitHub universe...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mt-10 px-4 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-red-900 dark:text-red-400 font-bold mb-1">Search Error</h3>
                <p className="text-red-700 dark:text-red-500 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Mock Data Banner */}
        {isMock && (
          <div className="max-w-4xl mx-auto mt-6 px-4 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-amber-800 dark:text-amber-400 text-sm font-medium">
                <span className="font-bold">Demo Mode:</span> GitHub API rate limit reached. Showing mock data for demonstration.
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && user && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            <ProfileCard user={user} />
            <RepoList 
              repos={sortedRepos} 
              sortBy={sortBy} 
              onSortChange={setSortBy} 
            />
          </div>
        )}

        {/* Initial Empty State */}
        {!loading && !error && !user && (
          <div className="max-w-xl mx-auto mt-20 text-center px-4 animate-in fade-in duration-1000">
            <div className="inline-flex items-center justify-center p-6 bg-blue-50 rounded-full mb-6">
              <Github className="w-12 h-12 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No profile found yet</h3>
            <p className="text-gray-400 mt-2">Start by typing a username in the search bar above.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} GitHub Developer Profile Finder. Created with React & Tailwind.
        </p>
      </footer>
    </div>
  );
}

export default App;
