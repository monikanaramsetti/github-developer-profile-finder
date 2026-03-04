import { TrendingUp, Clock } from 'lucide-react';
import RepoCard from './RepoCard';

const RepoList = ({ repos, sortBy, onSortChange }) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Repositories</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Showing the latest and most popular work</p>
        </div>
        
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onSortChange('updated')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              sortBy === 'updated' 
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent
          </button>
          <button
            onClick={() => onSortChange('stars')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              sortBy === 'stars' 
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Popular
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
