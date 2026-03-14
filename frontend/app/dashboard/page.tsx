import SearchForm from '@/components/SearchForm';
import LeadTable from '@/components/LeadTable';
import { Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex flex-col justify-center items-center text-sm border border-blue-200">
                U
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Generation Console</h1>
          <p className="text-gray-500 mt-2">Trigger new scrapes and download your generated leads.</p>
        </div>

        <section>
          <SearchForm />
        </section>

        <section>
          <LeadTable />
        </section>
      </main>
    </div>
  );
}
