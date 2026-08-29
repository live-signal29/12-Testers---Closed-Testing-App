import React, { useState } from 'react';
import { 
  ShieldCheck, Award, PlusCircle, 
  BarChart3, User, LayoutGrid, Calendar, Check,
  Search, Info, LogIn, UserPlus, LogOut, X
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [coins, setCoins] = useState(160);
  const [activeTab, setActiveTab] = useState('daily');
  const [copiedGroup, setCopiedGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Apps State
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'Zomplant War',
      developer: 'Game Studio PK',
      category: 'Games',
      icon: '🧟',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.zomplant.war',
      testers_count: 6,
      target_testers: 12,
      reward_coins: 20,
      tested_today: false
    },
    {
      id: 2,
      name: 'Sparkle Pop',
      developer: 'Star Puzzle',
      category: 'Casual',
      icon: '⭐',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.sparkle.pop',
      testers_count: 9,
      target_testers: 12,
      reward_coins: 20,
      tested_today: false
    },
    {
      id: 3,
      name: 'Light roulette',
      developer: 'cenusalabs',
      category: 'Casino',
      icon: '🎰',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.light.roulette',
      testers_count: 7,
      target_testers: 12,
      reward_coins: 20,
      tested_today: false
    },
    {
      id: 4,
      name: 'Qryon',
      developer: 'AsarSong studio',
      category: 'Tools',
      icon: '🌐',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.qryon.app',
      testers_count: 2,
      target_testers: 12,
      reward_coins: 20,
      tested_today: false
    },
    {
      id: 5,
      name: 'Omelette Chef Kitchen',
      developer: 'Masarp Studio',
      category: 'Arcade',
      icon: '🍳',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.omelette.chef',
      testers_count: 2,
      target_testers: 12,
      reward_coins: 20,
      tested_today: false
    }
  ]);

  // Form State for Add App
  const [appName, setAppName] = useState('');
  const [devName, setDevName] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [playLink, setPlayLink] = useState('');

  // Auth Handler
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setShowAuthModal(false);
    }
  };

  // Real Test Handler
  const handlePerformRealTest = (targetApp) => {
    window.open(targetApp.group_link, '_blank');
    setTimeout(() => {
      window.open(targetApp.play_link, '_blank');
    }, 1000);

    if (!targetApp.tested_today) {
      setApps(prevApps => prevApps.map(item => {
        if (item.id === targetApp.id) {
          return {
            ...item,
            tested_today: true,
            testers_count: Math.min(item.target_testers, item.testers_count + 1)
          };
        }
        return item;
      }));
      setCoins(prevCoins => prevCoins + targetApp.reward_coins);
    }
  };

  // Add App Handler (-50 Coins)
  const handlePublishApp = (e) => {
    e.preventDefault();
    if (coins < 50) {
      alert('❌ Balance Insufficient! Form submit karne ke liye 50 Coins hona zaroori hain.');
      return;
    }

    const newApp = {
      id: Date.now(),
      name: appName,
      developer: devName || 'Independent Developer',
      category: 'Tools',
      icon: '📱',
      group_link: groupLink,
      play_link: playLink,
      testers_count: 0,
      target_testers: 12,
      reward_coins: 20,
      tested_today: true
    };

    setApps([newApp, ...apps]);
    setCoins(prevCoins => prevCoins - 50);
    setAppName('');
    setDevName('');
    setGroupLink('');
    setPlayLink('');
    setActiveTab('feed');
    alert('🚀 App Publish Ho Gaya! 50 Coins deduct ho gaye hain.');
  };

  const completedTodayCount = apps.filter(a => a.tested_today).length;
  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased pb-24">
      
      {/* TOP HEADER */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 sticky top-0 z-40 px-4 py-3 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white leading-none">12 TESTERS PRO</h1>
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">REAL EXCHANGE NETWORK</span>
          </div>
        </div>

        {/* Dynamic Controls Header */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <div className="bg-slate-950 border border-amber-500/40 px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="flex flex-col text-right leading-none">
                  <span className="text-[8px] text-slate-400 font-semibold uppercase">BALANCE</span>
                  <span className="text-xs font-black text-amber-300">{coins} Coins</span>
                </div>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} 
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                Login
              </button>
              <button 
                onClick={() => { setAuthMode('register'); setShowAuthModal(true); }} 
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition shadow-[0_0_10px_rgba(37,99,235,0.4)]"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-md mx-auto w-full px-4 py-4 space-y-4 flex-1">
        
        {/* Sponsored Banner Slot */}
        <div className="w-full h-20 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">SPONSORED BANNER</span>
          <div className="text-[10px] text-slate-600 font-mono mt-0.5">Ad Placement Banner (320x100)</div>
        </div>

        {/* TAB 1: DAILY TEST */}
        {activeTab === 'daily' && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-4 text-white shadow-lg space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black tracking-wide">Day 1 of 14</h3>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <Info className="w-3 h-3" /> +1d
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-blue-50 flex justify-between">
                  <span>Today's Progress</span>
                  <span className="font-mono">{completedTodayCount} / {apps.length} apps</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-1.5">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-300" 
                    style={{ width: `${(completedTodayCount / apps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-blue-100 font-medium pt-0.5">
                  {apps.length - completedTodayCount > 0 
                    ? `Just ${apps.length - completedTodayCount} more apps to go today` 
                    : 'Daily goal completed! 🎉'}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-400">Daily Testing Apps</h4>
              {apps.map((app) => (
                <div key={app.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0">
                      {app.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{app.name}</h5>
                      <span className="text-[10px] block font-medium mt-0.5">
                        {app.tested_today ? (
                          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">Tested Today</span>
                        ) : (
                          <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">Pending verification</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {app.tested_today ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => handlePerformRealTest(app)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs px-4 py-1.5 rounded-full transition shadow"
                    >
                      Open
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EARN COINS */}
        {activeTab === 'feed' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-white">Closed Test Pro</h3>
                <p className="text-[10px] text-slate-400">Test 12 apps - Get 12 testers</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-400">
                <Search className="w-3.5 h-3.5" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[10px] text-white w-16"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredApps.map((app) => {
                const isFullyComplete = app.testers_count >= app.target_testers || app.tested_today;
                
                return (
                  <div key={app.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0 border border-slate-700">
                        {app.icon}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{app.name}</h5>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span className="truncate max-w-[85px]">{app.developer}</span>
                          <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[9px] font-bold text-cyan-400 flex items-center gap-1 border border-slate-700">
                            👥 {app.testers_count}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isFullyComplete ? (
                      <button disabled className="text-emerald-400 font-bold text-xs px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Tested
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePerformRealTest(app)}
                        className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold text-xs px-4 py-1.5 rounded-full border border-cyan-500/30 transition shadow-sm"
                      >
                        Test
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ADD APP */}
        {activeTab === 'upload' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">Add App for 12 Testers</h3>
              <p className="text-[11px] text-slate-400">Listing Cost: <span className="text-amber-400 font-bold">50 Coins</span></p>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-blue-500/30 space-y-1.5">
              <span className="text-[10px] font-bold text-cyan-400 block uppercase">Step 1: Copy Google Group Email</span>
              <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl text-xs font-mono">
                <span className="truncate flex-1 text-slate-300">12testers-community@googlegroups.com</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('12testers-community@googlegroups.com');
                    setCopiedGroup(true);
                    setTimeout(() => setCopiedGroup(false), 2000);
                  }}
                  className="bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold"
                >
                  {copiedGroup ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <form onSubmit={handlePublishApp} className="space-y-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-300">App Name</label>
                <input type="text" required placeholder="e.g. My App" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-100 mt-1 outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300">Developer Name</label>
                <input type="text" required placeholder="e.g. Studio Name" value={devName} onChange={(e) => setDevName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-100 mt-1 outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300">Google Group Link</label>
                <input type="url" required placeholder="https://groups.google.com/g/..." value={groupLink} onChange={(e) => setGroupLink(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-100 mt-1 outline-none" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300">Play Store Opt-in Link</label>
                <input type="url" required placeholder="https://play.google.com/apps/testing/..." value={playLink} onChange={(e) => setPlayLink(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-100 mt-1 outline-none" />
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs mt-2 transition">
                Publish App (-50 Coins)
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4">
            <h3 className="text-sm font-bold text-white">Testing Analytics</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[9px] text-slate-400 block font-bold uppercase">Total Testers</span>
                <span className="text-base font-black text-white">12 / 12</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[9px] text-slate-400 block font-bold uppercase">Completed Days</span>
                <span className="text-base font-black text-cyan-400">1 / 14 Days</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white">Developer Account</h3>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
              <p className="text-slate-400">Email: <span className="text-white font-bold">{email || 'dev@example.com'}</span></p>
              <p className="text-slate-400">Current Balance: <span className="text-amber-400 font-bold">{coins} Coins</span></p>
            </div>
          </div>
        )}
      </main>

      {/* POP-UP LOGIN / REGISTER MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl relative">
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-lg font-black text-white">
                {authMode === 'login' ? 'Developer Login' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-400">Join 12 Testers Pro Community</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="dev@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300">Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition"
              >
                {authMode === 'login' ? 'Login' : 'Register & Get 100 Coins'}
              </button>
            </form>

            <div className="text-center border-t border-slate-800 pt-3">
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-xs text-cyan-400 hover:underline font-semibold"
              >
                {authMode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION MENU BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 z-40 px-2 py-2 flex justify-around items-center backdrop-blur-lg">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'feed' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[9px] font-bold">Earn Coins</span>
        </button>

        <button 
          onClick={() => setActiveTab('daily')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'daily' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] font-bold">Daily Test</span>
        </button>

        <button 
          onClick={() => setActiveTab('upload')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'upload' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[9px] font-bold">Add App</span>
        </button>

        <button 
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'analytics' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[9px] font-bold">Analytics</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-bold">Profile</span>
        </button>
      </div>

    </div>
  );
}
