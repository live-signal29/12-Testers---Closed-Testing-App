import React, { useState } from 'react';
import AdSlot from './components/AdSlot';
import { ShieldCheck, Smartphone, Award, ExternalLink, PlusCircle, Info } from 'lucide-react';

export default function App() {
  const [coins, setCoins] = useState(150);
  const [activeTab, setActiveTab] = useState('browse');
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'CryptoTrack Pro',
      category: 'Finance',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.cryptotrack.app',
      testers_needed: 12,
      testers_count: 8,
      coins_reward: 20,
      days_left: 10,
    },
    {
      id: 2,
      name: 'AI Smart Journal',
      category: 'Productivity',
      group_link: 'https://groups.google.com/g/12testers-community',
      play_link: 'https://play.google.com/store/apps/details?id=com.aijournal.app',
      testers_needed: 12,
      testers_count: 11,
      coins_reward: 25,
      days_left: 4,
    }
  ]);

  const [newAppName, setNewAppName] = useState('');
  const [newGroupLink, setNewGroupLink] = useState('');
  const [newPlayLink, setNewPlayLink] = useState('');
  const [newCategory, setNewCategory] = useState('Tools');

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
      group_link: newGroupLink,
      play_link: newPlayLink,
      testers_needed: 12,
      testers_count: 0,
      coins_reward: 20,
      days_left: 14,
    };
    setApps([newAppObj, ...apps]);
    setCoins(coins - 50);
    setNewAppName('');
    setNewGroupLink('');
    setNewPlayLink('');
    setActiveTab('browse');
    alert('App submitted successfully! 12 Testers will begin testing your app.');
  };

  const handleJoinTest = (app) => {
    window.open(app.group_link, '_blank');
    setTimeout(() => {
      window.open(app.play_link, '_blank');
      setCoins(prev => prev + app.coins_reward);
      alert(`Awesome! You joined ${app.name} test. Earned +${app.coins_reward} Coins!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-400">12 Testers</h1>
              <p className="text-[10px] text-slate-400">Closed Testing Community</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">{coins} Coins</span>
            </div>
            <button 
              onClick={() => setActiveTab('add')}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Add App
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800 py-8 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white">Pass Google Play Closed Testing Fast</h2>
        <p className="mt-2 text-sm text-slate-400">Get 12 real testers for 14 continuous days. Exchange app testing & earn coins.</p>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex border-b border-slate-800 gap-6">
            <button 
              onClick={() => setActiveTab('browse')}
              className={`pb-3 text-sm font-medium ${activeTab === 'browse' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}
            >
              Browse Apps
            </button>
            <button 
              onClick={() => setActiveTab('add')}
              className={`pb-3 text-sm font-medium ${activeTab === 'add' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}
            >
              Submit My App
            </button>
          </div>

          <AdSlot slotId="9876543210" />

          {activeTab === 'browse' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apps.map((app) => (
                <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div>
                    <span className="text-xs text-blue-400 bg-slate-800 px-2 py-1 rounded">{app.category}</span>
                    <h4 className="text-lg font-bold text-white mt-2">{app.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">Testers: {app.testers_count} / {app.testers_needed}</p>
                  </div>
                  <button
                    onClick={() => handleJoinTest(app)}
                    className="w-full bg-slate-800 hover:bg-blue-600 text-blue-400 hover:text-white py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                  >
                    Join Test <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleAddApp} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Submit App for 12 Testers</h3>
              <input 
                type="text" required placeholder="App Name" value={newAppName} 
                onChange={(e) => setNewAppName(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100"
              />
              <input 
                type="url" required placeholder="Google Group Link" value={newGroupLink} 
                onChange={(e) => setNewGroupLink(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100"
              />
              <input 
                type="url" required placeholder="Play Store Web Link" value={newPlayLink} 
                onChange={(e) => setNewPlayLink(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100"
              />
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm">
                Publish App (-50 Coins)
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1"><Info className="w-4 h-4 text-blue-400" /> Rules</h4>
            <p className="text-slate-400">Keep testing apps for 14 continuous days to fulfill Play Console rule.</p>
          </div>
          <AdSlot slotId="5432109876" />
        </aside>
      </main>
    </div>
  );
}
