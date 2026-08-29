import React, { useState } from 'react';
import AdSlot from './components/AdSlot';
import { 
  ShieldCheck, Award, ExternalLink, PlusCircle, Info, 
  CheckCircle2, Clock, Users, Gift, Flame, Sparkles, MessageSquare 
} from 'lucide-react';

export default function App() {
  const [coins, setCoins] = useState(150);
  const [activeTab, setActiveTab] = useState('browse');
  
  // App Listing State with Complete Tracking Data
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'CryptoTrack Pro',
      category: 'Finance',
      icon: '📈',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.cryptotrack.app',
      testers_needed: 12,
      testers_count: 9,
      coins_reward: 20,
      days_completed: 8,
      total_days: 14,
      is_featured: true,
      verified: true
    },
    {
      id: 2,
      name: 'AI Smart Journal',
      category: 'Productivity',
      icon: '🧠',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.aijournal.app',
      testers_needed: 12,
      testers_count: 11,
      coins_reward: 25,
      days_completed: 12,
      total_days: 14,
      is_featured: false,
      verified: true
    },
    {
      id: 3,
      name: 'Pixel Photo Editor',
      category: 'Tools',
      icon: '🎨',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.pixeleditor.app',
      testers_needed: 12,
      testers_count: 4,
      coins_reward: 30,
      days_completed: 3,
      total_days: 14,
      is_featured: false,
      verified: false
    }
  ]);

  // Form State
  const [newAppName, setNewAppName] = useState('');
  const [newGroupLink, setNewGroupLink] = useState('');
  const [newPlayLink, setNewPlayLink] = useState('');
  const [newCategory, setNewCategory] = useState('Tools');
  const [newIcon, setNewIcon] = useState('🚀');

  const handleAddApp = (e) => {
    e.preventDefault();
    if (coins < 50) {
      alert('You need at least 50 coins to publish an app!');
      return;
    }
    const newAppObj = {
      id: Date.now(),
      name: newAppName,
      category: newCategory,
      icon: newIcon || '🚀',
      group_link: newGroupLink,
      play_link: newPlayLink,
      testers_needed: 12,
      testers_count: 0,
      coins_reward: 25,
      days_completed: 0,
      total_days: 14,
      is_featured: false,
      verified: true
    };
    setApps([newAppObj, ...apps]);
    setCoins(coins - 50);
    setNewAppName('');
    setNewGroupLink('');
    setNewPlayLink('');
    setActiveTab('browse');
    alert('🎉 App published successfully! Testers can now join your closed test.');
  };

  const handleJoinTest = (app) => {
    window.open(app.group_link, '_blank');
    setTimeout(() => {
      window.open(app.play_link, '_blank');
      setCoins(prev => prev + app.coins_reward);
      alert(`✅ Step 1: Joined Google Group\n✅ Step 2: Downloaded ${app.name}\n\n🎉 Earned +${app.coins_reward} Coins! Keep app installed for 14 days.`);
    }, 1200);
  };

  const handleClaimDailyReward = () => {
    setCoins(prev => prev + 15);
    alert('🎁 Daily Check-in Bonus Claimed! +15 Coins');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-black text-white tracking-tight">12 TESTERS</h1>
                <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
              </div>
              <p className="text-[11px] text-slate-400">Play Console Closed Testing Exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleClaimDailyReward}
              className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
            >
              <Gift className="w-4 h-4" /> Daily Bonus
            </button>

            <div className="bg-slate-900 border border-slate-700 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-inner">
              <Award className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-sm font-bold text-amber-300">{coins}</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase">Coins</span>
            </div>

            <button 
              onClick={() => setActiveTab('add')}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition"
            >
              <PlusCircle className="w-4 h-4" /> Add App
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950 border-b border-slate-800/80 py-10 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3.5 py-1 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Fulfill Google Play 14-Day Testing Rule
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">12 Real Testers</span> Fast & Free
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Test apps for other developers, earn coins, and get 12 opted-in testers for 14 continuous days to pass Play Store verification.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left / Central Section */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-800 gap-8">
            <button 
              onClick={() => setActiveTab('browse')}
              className={`pb-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'browse' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Flame className="w-4 h-4" /> Active Closed Tests ({apps.length})
            </button>
            <button 
              onClick={() => setActiveTab('add')}
              className={`pb-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'add' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <PlusCircle className="w-4 h-4" /> Submit Your App (-50 Coins)
            </button>
          </div>

          <AdSlot slotId="9876543210" />

          {/* Tab 1: Browse Apps */}
          {activeTab === 'browse' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {apps.map((app) => (
                <div 
                  key={app.id} 
                  className={`bg-slate-900/90 border rounded-3xl p-5 space-y-4 relative transition hover:border-slate-700 shadow-xl ${app.is_featured ? 'border-blue-500/50 bg-gradient-to-b from-blue-950/20 to-slate-900' : 'border-slate-800'}`}
                >
                  {app.is_featured && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                      FEATURED
                    </span>
                  )}

                  {/* Header info */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                      {app.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-extrabold text-white">{app.name}</h4>
                        {app.verified && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md mt-1 inline-block">
                        {app.category}
                      </span>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="space-y-2 bg-slate-950/50 border border-slate-800/60 p-3 rounded-2xl">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400 flex items-center gap-1"><Users className="w-3.5 h-3.5 text-blue-400" /> Testers Opted:</span>
                      <span className="text-blue-300 font-bold">{app.testers_count} / {app.testers_needed}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${(app.testers_count / app.testers_needed) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs font-semibold pt-1">
                      <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Days Active:</span>
                      <span className="text-amber-300 font-bold">{app.days_completed} / {app.total_days} Days</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => handleJoinTest(app)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition"
                    >
                      Test & Earn +{app.coins_reward} Coins <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tab 2: Submit App Form */
            <form onSubmit={handleAddApp} className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-5 shadow-xl">
              <div>
                <h3 className="text-xl font-extrabold text-white">Publish App for Closed Testing</h3>
                <p className="text-xs text-slate-400 mt-1">Cost: 50 Coins. Your app will be listed for 12 community testers for 14 continuous days.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-300">App Title</label>
                  <input 
                    type="text" required placeholder="e.g. My Expense Tracker" value={newAppName} 
                    onChange={(e) => setNewAppName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-100 outline-none transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Emoji Icon</label>
                  <input 
                    type="text" required placeholder="🚀" value={newIcon} 
                    onChange={(e) => setNewIcon(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-100 text-center outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Google Group Link (Mandatory for Closed Test)</label>
                <input 
                  type="url" required placeholder="https://groups.google.com/g/your-community-name" value={newGroupLink} 
                  onChange={(e) => setNewGroupLink(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-100 outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Play Store Web Testing Link</label>
                <input 
                  type="url" required placeholder="https://play.google.com/apps/testing/com.your.package" value={newPlayLink} 
                  onChange={(e) => setNewPlayLink(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-100 outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-100 outline-none transition"
                >
                  <option>Tools</option>
                  <option>Productivity</option>
                  <option>Finance</option>
                  <option>Gaming</option>
                  <option>Lifestyle</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition">
                Publish App (-50 Coins)
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" /> Play Console Rules
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>You must keep opted-in apps installed for <strong>14 continuous days</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Open each installed app once every 2-3 days to generate active usage metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Do not opt-out early to avoid account penalty.</span>
              </li>
            </ul>
          </div>

          <AdSlot slotId="5432109876" />
        </aside>
      </main>
    </div>
  );
}
