import Link from 'next/link';
import { Database, Search, ArrowRight, Zap, Target, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                LeadGenPro
              </span>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 border border-blue-100 hover:bg-blue-50 rounded-lg transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
            <Zap className="h-4 w-4" /> Powered by automated web scraping
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Find unlimited B2B leads on autopilot.
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Enter a keyword, and our automated workers will scrape the web to find high-quality company data and decision-maker emails for your sales pipeline.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40">
              Start Scraping Free <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: 'Keyword Driven',
              desc: 'Target any niche exactly. Just type "IT Recruiter" or "SaaS Founder" and let the spiders do the rest.'
            },
            {
              icon: Database,
              title: 'High-Volume DB',
              desc: 'Powered by MongoDB Atlas to safely store and deduplicate hundreds of thousands of leads.'
            },
            {
              icon: Lock,
              title: 'Never Pay Twice',
              desc: 'Our intelligent API marks leads as delivered—ensuring you literally never export the same lead twice.'
            }
          ].map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feat.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
