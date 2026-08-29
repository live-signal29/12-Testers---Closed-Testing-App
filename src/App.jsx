import React, { useState } from 'react';
import AdSlot from './components/AdSlot';
import { 
  ShieldCheck, Award, ExternalLink, PlusCircle, Info, 
  Clock, Users, Sparkles, Menu, X, LogIn, UserPlus, 
  ArrowRight, Flame, FileText, Lock, RefreshCw, Mail,
  BarChart3, CheckCircle2, Copy, Play, User, LayoutGrid, Calendar
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  
  const [coins, setCoins] = useState(470);
  const [activeTab, setActiveTab] = useState('feed'); // 'daily', 'feed', 'upload', 'stats', 'profile'
  const [copiedGroup, setCopiedGroup] = useState(false);

  // Apps List
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'CryptoTrack Pro',
      developer: 'Skie Studio',
      category: 'Finance',
      icon: '📈',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.cryptotrack.app',
      testers_needed: 12,
      testers_count: 9,
      coins_reward: 20,
      days_completed: 8,
      total_days: 14,
      status: 'pending' // 'pending' or 'tested'
    },
    {
      id: 2,
      name: 'AI Smart Journal',
      developer: 'Smart Apps Hub',
      category: 'Productivity',
      icon: '🧠',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.aijournal.app',
      testers_needed: 12,
      testers_count: 12,
      coins_reward: 25,
      days_completed: 14,
      total_days: 14,
      status: 'tested'
    }
  ]);

  // Form State
  const [newAppName, setNewAppName] = useState('');
  const [newDevName, setNewDevName] = useState('');
  const [newGroupLink, setNewGroupLink] = useState('');
  const [newPlayLink, setNewPlayLink] = useState('');

  const handleCopyGroup = () => {
    navigator.clipboard.writeText('12testers-community@googlegroups.com');
    setCopiedGroup(true);
    setTimeout(() => setCopiedGroup(false), 2000);
  };

  const handleAddApp = (e) => {
    e.preventDefault();
    if (coins < 50) {
      alert('Insufficient coins! You need 50 coins to publish an app.');
      return;
    }
    const newAppObj = {
      id: Date.now(),
      name: newAppName,
      developer: newDevName || 'Independent Dev',
      category: 'Tools',
      icon: '🚀',
      group_link: newGroupLink,
      play_link: newPlayLink,
      testers_needed: 12,
      testers_count: 0,
      coins_reward: 25,
      days_completed: 0,
      total_days: 14,
      status: 'pending'
    };
    setApps([newAppObj, ...apps]);
    setCoins(coins - 50);
    setNewAppName('');
    setNewDevName('');
    setNewGroupLink('');
    setNewPlayLink('');
    setActiveTab('feed');
    alert('🎉 App published for 14-day closed testing!');
  };

  const handleTestApp = (appId) => {
    const updated = apps.map(app => {
      if (app.id === appId) {
        return { ...app, status: 'tested', testers_count: Math.min(app.testers_needed, app.testers_count + 1) };
      }
      return app;
    });
    setApps(updated);
    setCoins(prev => prev + 20);
    alert('✅ Test confirmed! Earned +20 Coins.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-blue-500 selection:text-white pb-20 md:pb-0">
      
      {/* 3D Glowing Top Navigation */}
      <header className="border-b border-blue-900/30 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setAuthMode('landing')}>
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2.5 rounded-2xl text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:scale-105 transition duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black text-white tracking-tight leading-none bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                12 TESTERS PRO
              </h1>
              <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase">Closed Testing Network</span>
            </div>
          </div>

          {/* Desktop Right Panel */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="bg-slate-900/80 border border-amber-500/30 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-black text-amber-300">{coins} Coins</span>
                </div>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
                <button 
                  onClick={() => setAuthMode('register')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition"
                >
                  <UserPlus className="w-4 h-4" /> Get Started
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 py-4 space-y-3 backdrop-blur-2xl">
            {isLoggedIn ? (
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Balance:</span>
                <span className="text-sm font-black text-amber-400">{coins} Coins</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { setAuthMode('login'); setMobileMenuOpen(false); }}
                  className="bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
                <button 
                  onClick={() => { setAuthMode('register'); setMobileMenuOpen(false); }}
                  className="bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <UserPlus className="w-4 h-4" /> Register
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* VIEW 1: LANDING PAGE */}
      {!isLoggedIn && authMode === 'landing' && (
        <div className="flex-1 flex flex-col justify-center">
          <section className="py-16 md:py-24 px-4 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-4 py-1.5 rounded-full font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Sparkles className="w-4 h-4 text-cyan-400" /> 100% Free Tester Exchange Hub
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Pass Google Play Closed Testing in <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">14 Days</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
              Get 12 real opted-in testers for your Android app effortlessly. Join developers worldwide, test apps daily, and pass Play Console production verification.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button 
                onClick={() => setAuthMode('register')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold px-8 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.5)] transition duration-300"
              >
                Register & Get 12 Testers <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setAuthMode('login')}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold px-8 py-4 rounded-2xl text-sm transition"
              >
                Member Login
              </button>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-3xl space-y-2 backdrop-blur-md shadow-xl hover:border-blue-500/40 transition">
              <Users className="w-8 h-8 text-blue-400" />
              <h3 className="font-bold text-white text-base">Real Testers</h3>
              <p className="text-xs text-slate-400">Genuine Android developers testing your app via official Google Groups.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-3xl space-y-2 backdrop-blur-md shadow-xl hover:border-amber-500/40 transition">
              <Clock className="w-8 h-8 text-amber-400" />
              <h3 className="font-bold text-white text-base">14 Continuous Days</h3>
              <p className="text-xs text-slate-400">Track continuous active daily usage required by Play Console policies.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-3xl space-y-2 backdrop-blur-md shadow-xl hover:border-emerald-500/40 transition">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Coin Economy</h3>
              <p className="text-xs text-slate-400">Test other apps to earn coins, then use coins to launch your own test campaign.</p>
            </div>
          </section>
        </div>
      )}

      {/* VIEW 2: AUTH MODALS */}
      {!isLoggedIn && (authMode === 'login' || authMode === 'register') && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-slate-900/90 border border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-md space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'login' ? 'Enter credentials to access dashboard' : 'Join developers network & get 150 bonus coins'}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setActiveTab('feed'); }} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-slate-300">Developer Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 mt-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-slate-300">Email Address</label>
                <input type="email" required placeholder="dev@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 mt-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300">Password</label>
                <input type="password" required placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 mt-1 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition">
                {authMode === 'login' ? 'Login to Dashboard' : 'Register Account (+150 Coins)'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              {authMode === 'login' ? (
                <span>Don't have an account? <button onClick={() => setAuthMode('register')} className="text-blue-400 font-bold hover:underline">Register</button></span>
              ) : (
                <span>Already registered? <button onClick={() => setAuthMode('login')} className="text-blue-400 font-bold hover:underline">Login</button></span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MAIN APP DASHBOARD */}
      {isLoggedIn && (
        <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
          
          {/* Top Banner Ad */}
          <AdSlot slotId="1029384756" />

          {/* TAB 1: DAILY TESTING PROGRESS TRACKER */}
          {activeTab === 'daily' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white space-y-4 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold text-blue-200">Testing Progress</span>
                    <h3 className="text-2xl font-black">Day 8 of 14</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold">
                    +1d Recorded
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Today's Progress</span>
                    <span>2 / 5 Apps</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-3 p-0.5 border border-white/10">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full w-[40%] transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Daily Actions</h4>
                {apps.map((app) => (
                  <div key={app.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md hover:border-blue-500/30 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl shadow-inner">
                        {app.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">{app.name}</h5>
                        <span className="text-[10px] text-slate-400">
                          {app.status === 'tested' ? '✅ Tested Today' : 'Pending verification'}
                        </span>
                      </div>
                    </div>

                    {app.status === 'tested' ? (
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleTestApp(app.id)}
                        className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)] transition"
                      >
                        <Play className="w-3.5 h-3.5" /> Open App
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE CLOSED TESTS FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" /> Active Closed Tests
                </h3>
                <span className="text-xs text-slate-400">Lowest Tester Count First</span>
              </div>

              <div className="space-y-3">
                {apps.map((app) => (
                  <div key={app.id} className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md shadow-lg hover:border-blue-500/40 transition">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-slate-700/50">
                        {app.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">{app.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="bg-slate-800 px-2 py-0.5 rounded-md text-slate-300 font-semibold">{app.developer}</span>
                          <span>•</span>
                          <span className="text-blue-400 font-bold">{app.testers_count}/{app.testers_needed} Testers</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">Keep testing app daily for 14 continuous days.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTestApp(app.id)}
                      className="w-full sm:w-auto bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)] transition"
                    >
                      Test App <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD / SUBMIT APP */}
          {activeTab === 'upload' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 backdrop-blur-xl shadow-2xl">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-white">Upload App for 14-Day Testing</h3>
                <p className="text-xs text-slate-400">Required to get 12 real opted-in testers for Play Console approval.</p>
              </div>

              {/* Step 1: Add Google Group */}
              <div className="bg-slate-950 border border-blue-500/30 p-4 rounded-2xl space-y-2">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Step 1: Add Google Group in Testers List</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs text-slate-200 font-mono">
                  <span className="truncate flex-1">12testers-community@googlegroups.com</span>
                  <button 
                    onClick={handleCopyGroup}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copiedGroup ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleAddApp} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">App Name</label>
                  <input 
                    type="text" required placeholder="Please enter app name" value={newAppName} 
                    onChange={(e) => setNewAppName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Developer / Studio Name</label>
                  <input 
                    type="text" required placeholder="Please enter developer name" value={newDevName} 
                    onChange={(e) => setNewDevName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Play Store Closed Test Web Link</label>
                  <input 
                    type="url" required placeholder="https://play.google.com/apps/testing/com.your.app" value={newPlayLink} 
                    onChange={(e) => setNewPlayLink(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-2xl text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] transition"
                >
                  Upload App (-50 Coins)
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: APP STATISTICS GRAPH */}
          {activeTab === 'stats' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-black text-white">App Statistics</h3>
                  <p className="text-xs text-slate-400">CryptoTrack Pro (12/12 Testers)</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">Active Test</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Testers</span>
                  <span className="text-lg font-black text-white">12</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Current Day</span>
                  <span className="text-lg font-black text-blue-400">10 / 14</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Uninstalls</span>
                  <span className="text-lg font-black text-emerald-400">0</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block uppercase">Active Testers</span>
                  <span className="text-lg font-black text-amber-400">12</span>
                </div>
              </div>

              {/* 14-Day Visual Graph */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300">Daily Testing Activity Chart</h4>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-end justify-between gap-1.5 h-44 pt-8">
                  {[8, 10, 9, 11, 12, 10, 9, 11, 10, 12, 0, 0, 0, 0].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-300 ${idx < 10 ? 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800/40'}`}
                        style={{ height: `${val > 0 ? (val / 12) * 100 : 5}%` }}
                      ></div>
                      <span className="text-[9px] font-mono text-slate-500">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE & COMMUNITY SUPPORT */}
          {activeTab === 'profile' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center text-2xl font-black text-slate-950 shadow-lg shadow-emerald-500/30">
                  C
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Closed Test Pro</h3>
                  <p className="text-xs text-slate-400">dev@12testers.app</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-slate-400">Total Credit Coins:</span>
                  <span className="font-black text-amber-400 text-sm">{coins} Coins</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-slate-400">Community Support:</span>
                  <span className="font-bold text-emerald-400">Active Telegram Group</span>
                </div>
              </div>

              <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold py-3 rounded-2xl text-xs transition"
              >
                Sign Out Account
              </button>
            </div>
          )}

          {/* Bottom Banner Ad */}
          <AdSlot slotId="0987654321" />
        </main>
      )}

      {/* 3D Glowing Bottom Navigation Bar (Mobile Native Look) */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800 z-50 px-4 py-2 flex justify-around items-center shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
          <button 
            onClick={() => setActiveTab('daily')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${activeTab === 'daily' ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold">Daily</span>
          </button>

          <button 
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${activeTab === 'feed' ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] font-bold">Apps</span>
          </button>

          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${activeTab === 'upload' ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold">Submit</span>
          </button>

          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${activeTab === 'stats' ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Stats</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${activeTab === 'profile' ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      )}

      {/* FOOTER SECTION */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p>© 2026 12 Testers Hub. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-slate-400 font-semibold">
            <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-blue-400 transition">Privacy Policy</button>
            <button onClick={() => setActiveLegalModal('terms')} className="hover:text-blue-400 transition">Terms of Service</button>
            <button onClick={() => setActiveLegalModal('refund')} className="hover:text-blue-400 transition">Refund & Coin Policy</button>
            <button onClick={() => setActiveLegalModal('contact')} className="hover:text-blue-400 transition">Contact Us</button>
          </div>
        </div>
      </footer>

      {/* LEGAL POPUP MODAL */}
      {activeLegalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base capitalize flex items-center gap-2">
                {activeLegalModal === 'privacy' && <Lock className="w-4 h-4 text-blue-400" />}
                {activeLegalModal === 'terms' && <FileText className="w-4 h-4 text-blue-400" />}
                {activeLegalModal === 'refund' && <RefreshCw className="w-4 h-4 text-blue-400" />}
                {activeLegalModal === 'contact' && <Mail className="w-4 h-4 text-blue-400" />}
                {activeLegalModal.replace('-', ' ')}
              </h3>
              <button onClick={() => setActiveLegalModal(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {activeLegalModal === 'privacy' && <p>12 Testers Hub respects user privacy and does not store sensitive personal information.</p>}
              {activeLegalModal === 'terms' && <p>Users agree to keep tested apps installed for 14 continuous days as required by Play Console rules.</p>}
              {activeLegalModal === 'refund' && <p>Virtual coins carry no monetary cash value and are non-refundable once spent on app listings.</p>}
              {activeLegalModal === 'contact' && <p>Support Email: <span className="text-blue-400">support@12testers.app</span></p>}
            </div>
            <button onClick={() => setActiveLegalModal(null)} className="w-full bg-slate-800 text-white font-bold py-2 rounded-xl text-xs">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}
