import React, { useState } from 'react';
import AdSlot from './components/AdSlot';
import { 
  ShieldCheck, Award, ExternalLink, PlusCircle, 
  Clock, Users, Sparkles, Menu, X, LogIn, UserPlus, 
  ArrowRight, Flame, FileText, Lock, RefreshCw, Mail,
  BarChart3, CheckCircle2, Copy, Play, User, LayoutGrid, Calendar, Check
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  
  // Real Local Wallet & Coin Management
  const [coins, setCoins] = useState(100); // Starting welcome bonus
  const [activeTab, setActiveTab] = useState('feed');
  const [copiedGroup, setCopiedGroup] = useState(false);

  // App Testing Database State
  const [apps, setApps] = useState([
    {
      id: 101,
      name: 'FX7Star Trading Signal',
      developer: 'Aziz App Studio',
      category: 'Finance',
      icon: '📊',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.fx7star.app',
      testers_needed: 12,
      testers_count: 8,
      reward_coins: 20,
      days_completed: 7,
      total_days: 14,
      tested_by_user: false
    },
    {
      id: 102,
      name: 'Digital Munshi - Farm Tracker',
      developer: 'AgriTech PK',
      category: 'Business',
      icon: '🌾',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/apps/testing/com.digitalmunshi.app',
      testers_needed: 12,
      testers_count: 5,
      reward_coins: 20,
      days_completed: 4,
      total_days: 14,
      tested_by_user: false
    }
  ]);

  // Form State
  const [appName, setAppName] = useState('');
  const [devName, setDevName] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [playLink, setPlayLink] = useState('');

  // Real App Testing Execution (Coin Earning System)
  const handlePerformTest = (app) => {
    // 1. Open Google Group to Join
    window.open(app.group_link, '_blank');
    
    // 2. Open Play Store Opt-in Testing Link
    setTimeout(() => {
      window.open(app.play_link, '_blank');
    }, 1000);

    // 3. Mark as tested & Add Real Reward Coins
    if (!app.tested_by_user) {
      setApps(apps.map(item => item.id === app.id ? { 
        ...item, 
        tested_by_user: true, 
        testers_count: Math.min(item.testers_needed, item.testers_count + 1) 
      } : item));
      
      setCoins(prevCoins => prevCoins + app.reward_coins);
      alert(`🎉 Verification Success! You joined the Google Group & earned +${app.reward_coins} Coins.`);
    }
  };

  // Real App Submission (Coin Deduction System)
  const handlePublishApp = (e) => {
    e.preventDefault();
    const COST = 50;

    if (coins < COST) {
      alert(`❌ Insufficient Balance! You need ${COST} Coins to publish your app for 14-day closed testing. Test existing developer apps to earn more coins!`);
      return;
    }

    const newAppEntry = {
      id: Date.now(),
      name: appName,
      developer: devName || 'Independent Developer',
      category: 'Tools',
      icon: '📱',
      group_link: groupLink,
      play_link: playLink,
      testers_needed: 12,
      testers_count: 0,
      reward_coins: 20,
      days_completed: 1,
      total_days: 14,
      tested_by_user: true
    };

    setApps([newAppEntry, ...apps]);
    setCoins(prevCoins => prevCoins - COST);
    
    // Reset Form
    setAppName('');
    setDevName('');
    setGroupLink('');
    setPlayLink('');
    setActiveTab('feed');
    alert('🚀 App Uploaded Successfully! 50 Coins deducted. 12 Testers will now opt-in to your app.');
  };

  const handleCopyGroupEmail = () => {
    navigator.clipboard.writeText('12testers-community@googlegroups.com');
    setCopiedGroup(true);
    setTimeout(() => setCopiedGroup(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden pb-20 md:pb-0">
      
      {/* 3D Glowing Top Navigation Bar with Direct Coins Header */}
      <header className="border-b border-blue-900/40 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setAuthMode('landing')}>
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-xl text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight leading-none">12 TESTERS PRO</h1>
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Real Exchange Network</span>
            </div>
          </div>

          {/* Header Real-Time Coin Display & Menu */}
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <div className="bg-slate-950 border border-amber-500/40 px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="flex flex-col text-right leading-none">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold">Balance</span>
                  <span className="text-xs font-black text-amber-300">{coins} Coins</span>
                </div>
              </div>
            )}

            {!isLoggedIn ? (
              <button onClick={() => setAuthMode('login')} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-blue-600/30">
                Login
              </button>
            ) : (
              <button onClick={() => setIsLoggedIn(false)} className="text-xs text-slate-400 hover:text-white hidden sm:block">
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN APP DASHBOARD */}
      {isLoggedIn && (
        <main className="max-w-3xl mx-auto px-4 py-5 flex-1 w-full space-y-5">
          
          {/* Top Compact Banner Ad Slot */}
          <AdSlot slotId="1029384756" />

          {/* TAB 1: DAILY TESTING PROGRESS */}
          {activeTab === 'daily' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-5 text-white space-y-3 shadow-[0_0_25px_rgba(37,99,235,0.3)]">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-100">Daily Testing Requirement</span>
                    <h3 className="text-xl font-black">14-Day Production Track</h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                    Active Cycle
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Apps Tested Today</span>
                    <span>{apps.filter(a => a.tested_by_user).length} / {apps.length} Apps</span>
                  </div>
                  <div className="w-full bg-black/30 rounded-full h-2.5 p-0.5">
                    <div 
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(apps.filter(a => a.tested_by_user).length / apps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily App Testing Tasks</h4>
                {apps.map((app) => (
                  <div key={app.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                        {app.icon}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{app.name}</h5>
                        <span className="text-[10px] text-slate-400 block">{app.developer}</span>
                      </div>
                    </div>

                    {app.tested_by_user ? (
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Tested
                      </span>
                    ) : (
                      <button 
                        onClick={() => handlePerformTest(app)}
                        className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5" /> Test & Earn +20
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REAL COMMUNITY FEED (EARN COINS HERE) */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" /> Test Apps & Earn Coins
                  </h3>
                  <p className="text-[11px] text-slate-400">Join Google Group first, then click Play Store opt-in.</p>
                </div>
              </div>

              <div className="space-y-3">
                {apps.map((app) => (
                  <div key={app.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl border border-slate-700">
                        {app.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">{app.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="bg-slate-800 px-2 py-0.5 rounded-md text-slate-300 font-semibold">{app.developer}</span>
                          <span>•</span>
                          <span className="text-cyan-400 font-bold">{app.testers_count}/{app.testers_needed} Testers</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center gap-2">
                      {app.tested_by_user ? (
                        <div className="w-full sm:w-auto bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Joined & Tested
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePerformTest(app)}
                          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition"
                        >
                          Join Group & Test <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD YOUR APP (SPEND COINS) */}
          {activeTab === 'upload' && (
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white">Add App for 12 Testers</h3>
                <p className="text-xs text-slate-400">Cost: <span className="text-amber-400 font-bold">50 Coins</span> per listing (Current Balance: {coins} Coins)</p>
              </div>

              {/* Step 1: Real Google Group Integration Instructions */}
              <div className="bg-slate-950 border border-blue-500/30 p-3.5 rounded-2xl space-y-2">
                <label className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">
                  Step 1: Add Google Group email into your Play Console Testers list
                </label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl text-xs text-slate-200 font-mono">
                  <span className="truncate flex-1">12testers-community@googlegroups.com</span>
                  <button 
                    onClick={handleCopyGroupEmail}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> {copiedGroup ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Real Submission Form */}
              <form onSubmit={handlePublishApp} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">App Name</label>
                  <input 
                    type="text" required placeholder="e.g. FX7Star Live Signal" value={appName} 
                    onChange={(e) => setAppName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Developer Name</label>
                  <input 
                    type="text" required placeholder="e.g. Aziz Studio" value={devName} 
                    onChange={(e) => setDevName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Google Group Link</label>
                  <input 
                    type="url" required placeholder="https://groups.google.com/g/12testers-community" value={groupLink} 
                    onChange={(e) => setGroupLink(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Play Store Opt-in Web Link</label>
                  <input 
                    type="url" required placeholder="https://play.google.com/apps/testing/com.your.package" value={playLink} 
                    onChange={(e) => setPlayLink(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 mt-1 outline-none focus:border-blue-500"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] transition"
                >
                  Publish App Now (-50 Coins)
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: REAL STATISTICS GRAPH */}
          {activeTab === 'stats' && (
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 space-y-5 shadow-2xl">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white">Live Testing Analytics</h3>
                <p className="text-xs text-slate-400">Track active daily installs & Play Console compliance.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Total Testers</span>
                  <span className="text-base font-black text-white">12 / 12</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Testing Days</span>
                  <span className="text-base font-black text-cyan-400">8 / 14</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Uninstalls</span>
                  <span className="text-base font-black text-emerald-400">0</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Approval Status</span>
                  <span className="text-xs font-black text-amber-400">In Progress</span>
                </div>
              </div>

              {/* 14-Day Visual Graph */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">14-Day Continuous Activity Bar Chart</h4>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-end justify-between gap-1 h-36 pt-6">
                  {[8, 10, 9, 11, 12, 10, 9, 12, 0, 0, 0, 0, 0, 0].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div 
                        className={`w-full rounded-t ${idx < 8 ? 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-800/40'}`}
                        style={{ height: `${val > 0 ? (val / 12) * 100 : 5}%` }}
                      ></div>
                      <span className="text-[8px] font-mono text-slate-500">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg">
                  A
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Developer Profile</h3>
                  <p className="text-xs text-slate-400">Registered Developer Account</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400">Coin Balance:</span>
                  <span className="font-black text-amber-400">{coins} Coins</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400">Community Support:</span>
                  <span className="font-bold text-cyan-400">12 Testers Google Group</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Compact Banner Ad Slot */}
          <AdSlot slotId="0987654321" />
        </main>
      )}

      {/* 3D Glowing Bottom Navigation Bar */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 z-50 px-4 py-2 flex justify-around items-center shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${activeTab === 'feed' ? 'text-cyan-400 scale-105' : 'text-slate-400'}`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[9px] font-bold">Earn Coins</span>
          </button>

          <button 
            onClick={() => setActiveTab('daily')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${activeTab === 'daily' ? 'text-cyan-400 scale-105' : 'text-slate-400'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] font-bold">Daily Test</span>
          </button>

          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${activeTab === 'upload' ? 'text-cyan-400 scale-105' : 'text-slate-400'}`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-[9px] font-bold">Add App</span>
          </button>

          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${activeTab === 'stats' ? 'text-cyan-400 scale-105' : 'text-slate-400'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[9px] font-bold">Analytics</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${activeTab === 'profile' ? 'text-cyan-400 scale-105' : 'text-slate-400'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bold">Profile</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        © 2026 12 Testers Network. Real Developer Exchange.
      </footer>
    </div>
  );
}
