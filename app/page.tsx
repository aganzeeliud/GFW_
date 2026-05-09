'use client';

import Link from 'next/link';
import { 
  Shield, 
  TrendingUp, 
  MapPin, 
  Layers, 
  Activity, 
  ChevronRight, 
  Info, 
  ArrowRight,
  BarChart2,
  Globe
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 antialiased">
      {/* Mesh Background Effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,rgba(16,185,129,0.05)_0px,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(at_100%_0%,rgba(59,130,246,0.05)_0px,transparent_50%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold tracking-tighter text-slate-900">OWR PORTAL</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#metrics" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">Metrics</a>
            <Link href="/comparison" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">Impact Analysis</Link>
            <Link href="/map" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition">
              Launch Map
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-8 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Active Monitoring 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-slate-900">
            Protecting the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Okapi Heart.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Advanced spatial intelligence for the Okapi Wildlife Reserve. Monitoring 268 mining concessions across 3.2 million hectares of biodiversity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition shadow-2xl shadow-emerald-200 flex items-center justify-center gap-3 group"
            >
              Interactive Map 
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/comparison"
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2"
            >
              Mining Impact Analysis
            </Link>
          </div>
        </div>
      </header>

      {/* Infographic Section (Bento Grid) */}
      <section id="metrics" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-4xl font-black tracking-tighter mb-4 text-slate-900">Reserve Insights.</h2>
          <p className="text-lg text-slate-500 font-medium">Critical metrics at a glance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
          {/* Big Stat: Forest Loss */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="relative z-10">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Forest Loss</p>
              <h3 className="text-6xl font-black text-slate-900 leading-none">15,000<span className="text-2xl text-slate-300 ml-2 font-medium">ha</span></h3>
              <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <TrendingUp className="w-4 h-4" /> Cumulative (2001-2026)
              </div>
            </div>
            {/* Mini Infographic */}
            <div className="mt-8 flex items-end gap-1.5 h-32">
              <div className="flex-1 bg-emerald-50 rounded-t-xl h-[20%] group-hover:bg-emerald-100 transition-colors"></div>
              <div className="flex-1 bg-emerald-100 rounded-t-xl h-[35%] group-hover:bg-emerald-200 transition-colors"></div>
              <div className="flex-1 bg-emerald-200 rounded-t-xl h-[45%] group-hover:bg-emerald-300 transition-colors"></div>
              <div className="flex-1 bg-emerald-300 rounded-t-xl h-[60%] group-hover:bg-emerald-400 transition-colors"></div>
              <div className="flex-1 bg-emerald-400 rounded-t-xl h-[75%] group-hover:bg-emerald-500 transition-colors"></div>
              <div className="flex-1 bg-emerald-600 rounded-t-xl h-[90%] shadow-lg shadow-emerald-200"></div>
            </div>
          </div>

          {/* Concessions Inside */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-inner">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inside Reserve</p>
                <h4 className="text-4xl font-black text-slate-900">83 <span className="text-lg font-medium text-slate-400">Sites</span></h4>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">813,652 hectares under direct mining pressure within core protection zones.</p>
          </div>

          {/* Buffer Zone */}
          <div className="md:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 leading-none mb-1">185</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buffer Permits</p>
            </div>
          </div>

          {/* Data Health */}
          <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-3xl font-black text-white leading-none mb-1">100%</h4>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Open Data Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tighter">3.2M Hectares</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Protected Area</p>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">The OWR represents a critical sanctuary for the endangered Okapi and Forest Elephant.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-red-500 transition-colors">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tighter">268 Permits</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Mining Concessions</p>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Overlapping permits create immediate environmental and legal conflicts within the reserve.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tighter">Open Data</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Transparency First</p>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">All data is sourced from CAMI and Global Forest Watch for public verification and advocacy.</p>
          </div>
        </div>
      </section>

      {/* Concession Directory Component - We will add this inline for simplicity since it's a small app */}
      <DirectorySection />

      {/* Strategic Monitoring Section */}
...
      </footer>
    </div>
  );
}

function DirectorySection() {
  const [searchTerm, setSearchInput] = React.useState('');
  const [concessions, setConcessions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/GFW_/data/all_concessions.json')
      .then(res => res.json())
      .then(data => {
        setConcessions(data);
        setLoading(false);
      })
      .catch(err => console.error("Error loading directory:", err));
  }, []);

  const filtered = concessions.filter(c => 
    c.parties.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="directory" className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter mb-2 text-slate-900 uppercase">Concession Directory.</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Detailed database of all 268 mining permits</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search by name, code or resource..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm font-medium text-sm"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Info className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
        {loading ? (
          <div className="col-span-full py-20 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs tracking-widest">Syncing Concession Data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matches found</p>
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black uppercase tracking-wider text-slate-500">{item.type}</span>
                <span className="text-[10px] font-black text-slate-300">#{item.code}</span>
              </div>
              <h4 className="font-bold text-slate-900 leading-tight mb-2 truncate" title={item.parties}>{item.parties}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <p className="text-[11px] font-bold text-slate-500 truncate uppercase tracking-tight">{item.resource}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Area</p>
                  <p className="text-xs font-black text-slate-900">{parseInt(item.sup_sig_ha).toLocaleString()} ha</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${item.statut.includes('Approuv') ? 'text-emerald-600' : 'text-amber-500'}`}>{item.statut}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
      {/* Footer / CTA */}
      <footer className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 400">
              <path d="M0 200 C 200 100, 400 300, 800 200" stroke="white" fill="transparent" strokeWidth="2" opacity="0.3" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
            Explore the <br className="hidden md:block" /> Conservation Evidence.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/map" 
              className="px-12 py-5 bg-white text-slate-900 rounded-3xl font-black hover:bg-slate-100 transition shadow-xl text-lg flex items-center justify-center gap-3 group"
            >
              Open Interactive Map 
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-black tracking-widest uppercase">OWR Portal 2026</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">
              Conservation Data Science • University of Applied Sciences
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
