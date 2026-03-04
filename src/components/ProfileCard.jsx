import React from 'react';
import { MapPin, Users, BookOpen, Link as LinkIcon, ExternalLink } from 'lucide-react';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl dark:hover:shadow-blue-900/20 border border-gray-100 dark:border-gray-800">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-8 flex justify-center items-center">
          <img
            className="h-48 w-48 rounded-2xl object-cover shadow-inner ring-4 ring-blue-50 dark:ring-blue-900/30 transition-transform duration-500 hover:scale-105"
            src={user.avatar_url}
            alt={user.name || user.login}
          />
        </div>
        <div className="p-8 md:flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {user.name || user.login}
              </h1>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">@{user.login}</p>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-gray-900 dark:bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-blue-700 transition-all shadow-sm hover:shadow group"
            >
              View Profile <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
            {user.bio || "No bio available."}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-xs font-medium">
                  {user.blog}
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold text-xl">{user.public_repos}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Repos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                <Users className="w-5 h-5" />
                <span className="font-bold text-xl">{user.followers}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Followers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-pink-600 dark:text-pink-400 mb-1">
                <Users className="w-5 h-5" />
                <span className="font-bold text-xl">{user.following}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
