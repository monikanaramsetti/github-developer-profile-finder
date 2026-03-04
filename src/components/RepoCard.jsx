import React from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';

const RepoCard = ({ repo }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md dark:hover:shadow-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {repo.name}
        </h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
          title="Open Repository"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
        {repo.description || "No description provided."}
      </p>

      <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5 transition-colors group-hover:text-yellow-600 dark:group-hover:text-yellow-500">
          <Star className="w-4 h-4" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          <GitFork className="w-4 h-4" />
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>
        {repo.language && (
          <div className="ml-auto flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-600"></span>
            <span className="text-gray-400 dark:text-gray-500">{repo.language}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
