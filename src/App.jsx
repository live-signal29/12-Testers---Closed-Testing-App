import React, { useState } from 'react';
import { 
  ShieldCheck, Award, ExternalLink, PlusCircle, 
  BarChart3, Copy, Play, User, LayoutGrid, Calendar, Check,
  Search, CheckCircle2, Flame, Info
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [coins, setCoins] = useState(100);
  const [activeTab, setActiveTab] = useState('daily'); // Default to Daily Testing UI
  const [copiedGroup, setCopiedGroup] = useState(false);

  // Real App Testing State
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'Zomplant War',
      developer: 'Game Studio PK',
      category: 'Games',
      icon: '🧟',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.zomplant.war',
      testers_count: 5,
      reward_coins: 20,
      status: 'pending' // 'pending' or 'tested'
    },
    {
      id: 2,
      name: 'Sparkle Pop',
      developer: 'Star Puzzle',
      category: 'Casual',
      icon: '⭐',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.sparkle.pop',
      testers_count: 8,
      reward_coins: 20,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Light roulette',
      developer: 'cenusalabs',
      category: 'Casino',
      icon: '🎰',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.light.roulette',
      testers_count: 7,
      reward_coins: 20,
      status: 'tested'
    },
    {
      id: 4,
      name: 'Qryon',
      developer: 'AsarSong studio',
      category: 'Tools',
      icon: '🌐',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.qryon.app',
      testers_count: 2,
      reward_coins: 20,
      status: 'tested'
    },
    {
      id: 5,
      name: 'Omelette Chef Kitchen',
      developer: 'Masarp Studio',
      category: 'Arcade',
      icon: '🍳',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.omelette.chef',
      testers_count: 1,
      reward_coins: 20,
      status: 'pending'
    }
  ]);

  // Form State
  const [appName, setAppName] = useState('');
  const [devName, setDevName] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [playLink, setPlayLink] = useState('');

  // Handle Testing Action
  const handleTestApp = (app) => {
    window.open(app.group_link, '_blank');
    setTimeout(() => {
      window.open(app.play_link, '_blank');
    }, 800);

    if (app.status !== 'tested') {
      setApps(apps.map(item => item.id === app.id ? { 
        ...item, 
        status: 'tested', 
        testers_count: item.testers_count + 1 
      } : item));
      setCoins(prev => prev + app.reward_coins);
    }
  };

  // Handle Add App
  const handlePublishApp = (e) => {
    e.preventDefault();
    if (coins < 50) {
      alert('❌ Balance kam hai! Form submit karne ke liye 50 Coins chahiye.');
      return;
    }

    const newApp = {
      id: Date.now(),
      name: appName,
      developer: devName || 'Developer',
      category: 'Tools',
      icon: '📱',
      group_link: groupLink,
      play_link: playLink,
      testers_count: 0,
      reward_coins: 20,
      status: 'pending'
    };

    setApps([newApp, ...apps]);
    setCoins(prev => prev - 50);
    setAppName('');
    setDevName('');
    setGroupLink('');
    setPlayLink('');
    setActiveTab('feed');
    alert('🚀 App publish ho gaya! 50 Coins deduct ho gaye.');
  };

  const testedCount = apps.filter(a => a.status === 'tested').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased pb-20">
      
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-50 px-4 py-3 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-xl text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white leading-none">12 TESTERS PRO</h1>
            <span className="text-[9px] text-cyan-400 font-bold uppercase">Real Exchange Network</span>
          </div>
        </div>

        {/* Top Balance Badge */}
        <div className="bg-slate-950 border border-amber-500/40 px-3 py-1 rounded-2xl flex items-center gap-2 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          <Award className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col text-right leading-none">
            <span className="text-[8px] text-slate-400 font-semibold uppercase">BALANCE</span>
            <span className="text-xs font-black text-amber-300">{coins} Coins</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full px-4 py-4 space-y-4">
        
        {/* COMPACT SPONSORED BANNER (Fixed Small Height) */}
        <div className="w-full h-24 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">SPONSORED BANNER</span>
          <div className="text-[11px] text-slate-600 font-mono mt-1">Ad Placement Banner (320x100)</div>
        </div>

        {/* SCREENSHOT 2 MATCH: DAILY TESTING (14 DAYS CYCLE) */}
        {activeTab === 'daily' && (
          <div className="space-y-3">
            {/* Top Blue Card */}
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-4 text-white shadow-lg space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black tracking-wide">Day 1 of 14</h3>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <Info className="w-3 h-3" /> +1d
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-blue-50">
                  Today's Progress <span className="ml-2 font-mono">{testedCount} / {apps.length} apps</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-1.5">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-300" 
                    style={{ width: `${(testedCount / apps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-blue-100 font-medium">
                  {apps.length - testedCount > 0 ? `Just ${apps.length - testedCount} more apps to go today` : 'Daily goal completed! 🎉'}
                </p>
              </div>
            </div>

            {/* Apps List (Screenshot 2 Style) */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-400">Daily Testing Apps</h4>
              {apps.map((app) => (
                <div key={app.id} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0">
                      {app.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{app.name}</h5>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {app.status === 'tested' ? (
                          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">Tested Today</span>
                        ) : (
                          <span className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Pending verification</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {app.status === 'tested' ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleTestApp(app)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs px-4 py-1.5 rounded-full transition shadow"
                    >
                      Open
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREENSHOT 3 MATCH: FAIR TESTING / EARN COINS LIST */}
        {activeTab === 'feed' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-white">Closed Test Pro</h3>
                <p className="text-[10px] text-slate-400">Test 12 apps - Get 12 testers</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-400">
                <Search className="w-3.5 h-3.5" />
                <span className="text-[10px]">Search</span>
              </div>
            </div>

            {/* Apps List (Screenshot 3 Style) */}
            <div className="space-y-2">
              {apps.map((app) => (
                <div key={app.id} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0 border border-slate-700">
                      {app.icon}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{app.name}</h5>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="truncate max-w-[90px]">{app.developer}</span>
                        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-300 flex items-center gap-1">
                          👥 {app.testers_count}
                        </span>
                      </div>
                    </div>
                  </div>

                  {app.status === 'tested' ? (
                    <button disabled className="text-emerald-400 font-bold text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Tested
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleTestApp(app)}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold text-xs px-4 py-1.5 rounded-full border border-cyan-500/30 transition"
                    >
                      Test
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ADD APP (SUBMISSION SYSTEM) */}
        {activeTab === 'upload' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">Add App for 12 Testers</h3>
              <p className="text-[11px] text-slate-400">Listing Cost: <span className="text-amber-400 font-bold">50 Coins</span></p>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-blue-500/30 space-y-1.5">
              <span className="text-[10px] font-bold text-cyan-400 block uppercase">Step 1: Add Google Group Email to Play Console</span>
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

      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 z-50 px-4 py-2 flex justify-around items-center backdrop-blur-lg">
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
      </div>

    </div>
  );
}
