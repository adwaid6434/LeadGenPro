'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Download, RefreshCw, ExternalLink, Mail, Building2 } from 'lucide-react';

interface Lead {
  _id: string;
  company: string;
  email: string | null;
  website: string | null;
  source: string;
  createdAt: string;
}

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads');
      setLeads((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error('Failed to fetch leads', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const downloadCSV = () => {
    if (!leads.length) return;
    const headers = ['Company', 'Email', 'Website', 'Source', 'Extracted At'];
    const rows = leads.map(l => [
      `"${l.company}"`,
      l.email || '',
      l.website || '',
      `"${l.source}"`,
      new Date(l.createdAt).toLocaleString()
    ].join(','));
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-semibold text-gray-800">Available Leads</h2>
        <div className="flex gap-3">
          <button 
            onClick={loadLeads}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-blue-500' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={downloadCSV}
            disabled={!leads.length}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:bg-blue-400 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="p-4 font-medium border-b border-gray-100">Company</th>
              <th className="p-4 font-medium border-b border-gray-100">Contact</th>
              <th className="p-4 font-medium border-b border-gray-100">Website</th>
              <th className="p-4 font-medium border-b border-gray-100 text-right">Extracted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">
                  {loading ? 'Searching for new leads...' : 'No new leads available. Start a new scrape!'}
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Building2 className="h-4 w-4" />
                    </div>
                    {lead.company}
                  </td>
                  <td className="p-4">
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <Mail className="h-4 w-4" /> {lead.email}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Not found</span>
                    )}
                  </td>
                  <td className="p-4">
                    {lead.website ? (
                      <a href={lead.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-4 text-right text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
