'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Search, Loader2 } from 'lucide-react';

export default function SearchForm() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    setMessage('');

    try {
      await api.post('/start-scrape', { keyword });
      setMessage('Scraping job started successfully! Check back in a few minutes.');
      setKeyword('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to start scraping job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Start New Scrape</h2>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="e.g. IT Recruiter, Sales Manager"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !keyword}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Scrape'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
