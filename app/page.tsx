import PhdAnalyzer from '@/components/phd-analyzer';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18 18.168 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">ScholarPath AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">Williams Alfred Onen</p>
            <p className="text-xs text-slate-500">M.Sc Software Engineering • AR Heart Specialist</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300"></div>
        </div>
      </header>

      <main className="flex flex-1 p-6 gap-6 overflow-hidden">
        <PhdAnalyzer />
      </main>

      <footer className="h-8 bg-slate-900 text-[10px] text-slate-400 px-6 flex items-center justify-between shrink-0">
        <div className="flex gap-4">
          <span>Session: <span className="text-indigo-400">Active</span></span>
          <span>Profile: <span className="text-indigo-400">Williams Alfred Onen</span></span>
        </div>
        <div className="flex gap-4">
          <span>Context: M.Sc Thesis + CV Linked</span>
          <span>AI Engine: Research-Optimized-v4</span>
        </div>
      </footer>
    </div>
  );
}
