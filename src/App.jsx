import React, { useState } from 'react';
import AdSlot from './components/AdSlot';
import { 
  ShieldCheck, Award, ExternalLink, PlusCircle, Info, 
  Clock, Users, Sparkles, Menu, X, LogIn, UserPlus, 
  ArrowRight, Flame, FileText, Lock, RefreshCw, Mail
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('landing'); // 'landing', 'login', 'register'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'privacy', 'terms', 'refund', 'contact'
  
  const [coins, setCoins] = useState(150);
  const [activeTab, setActiveTab] = useState('browse');
  
  // App Listing State
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
      is_featured: true
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
      is_featured: false
    }
  ]);

  // Form State
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
      icon: '🚀',
      group_link: newGroupLink,
      play_link: newPlayLink,
      testers_needed: 12,
      testers_count: 0,
      coins_reward: 25,
      days_completed: 0,
      total_days: 14,
      is_featured: false
    };
    setApps([newAppObj, ...apps]);
    setCoins(coins - 50);
    setNewAppName('');
    setNewGroupLink('');
    setNewPlayLink('');
    setActiveTab('browse');
    alert('🎉 App published successfully!');
  };

  const handleJoinTest = (app) => {
    window.open(app.group_link, '_blank');
    setTimeout(() => {
      window.open(app.play_link, '_blank');
      setCoins(prev => prev + app.coins_reward);
      alert(`✅ Joined test! Earned +${app.coins_reward} Coins!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setAuthMode('landing')}>
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black text-white tracking-tight leading-none">12 TESTERS</h1>
              <span className="text-[10px] text-blue-400 font-semibold">Closed Testing Hub</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-amber-300">{coins} Coins</span>
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
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition"
                >
                  <UserPlus className="w-4 h-4" /> Get Started Free
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
            {isLoggedIn ? (
              <>
                <div className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">Balance:</span>
                  <span className="text-sm font-bold text-amber-300">{coins} Coins</span>
                </div>
                <button 
                  onClick={() => { setIsLoggedIn(false); setMobileMenuOpen(false); }}
                  className="w-full text-left text-xs font-semibold text-red-400 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { setAuthMode('login'); setMobileMenuOpen(false); }}
                  className="w-full bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
                <button 
                  onClick={() => { setAuthMode('register'); setMobileMenuOpen(false); }}
                  className="w-full bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" /> Register Free Account
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* VIEW 1: LANDING PAGE */}
      {!isLoggedIn && authMode === 'landing' && (
        <div className="flex-1">
          <section className="py-16 md:py-24 px-4 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full font-bold">
              <Sparkles className="w-4 h-4" /> 100% Free Tester Exchange Platform
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Pass Google Play Closed Testing in <span className="text-blue-500">14 Days</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
              Get 12 real opted-in testers for your Android app effortlessly. Join developers worldwide, test each other's apps, and pass Play Console verification.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button 
                onClick={() => setAuthMode('register')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
              >
                Register & Get 12 Testers <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setAuthMode('login')}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold px-8 py-3.5 rounded-2xl text-sm"
              >
                Existing Member Login
              </button>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-2">
              <Users className="w-8 h-8 text-blue-400" />
              <h3 className="font-bold text-white text-base">Real Testers</h3>
              <p className="text-xs text-slate-400">Genuine Android developers testing your app through Google Groups.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-2">
              <Clock className="w-8 h-8 text-amber-400" />
              <h3 className="font-bold text-white text-base">14 Continuous Days</h3>
              <p className="text-xs text-slate-400">Track active daily usage to fulfill Play Console requirements seamlessly.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-2">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Coin Economy</h3>
              <p className="text-xs text-slate-400">Test apps to earn coins, then spend coins to list your own applications.</p>
            </div>
          </section>
        </div>
      )}

      {/* VIEW 2: AUTH MODALS */}
      {!isLoggedIn && (authMode === 'login' || authMode === 'register') && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'login' ? 'Login to manage your app tests' : 'Join 12 Testers community today'}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-slate-300">Developer Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 mt-1 outline-none focus:border-blue-500" />
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-slate-300">Email Address</label>
                <input type="email" required placeholder="dev@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 mt-1 outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300">Password</label>
                <input type="password" required placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 mt-1 outline-none focus:border-blue-500" />
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition">
                {authMode === 'login' ? 'Login to Dashboard' : 'Register Account (+150 Bonus Coins)'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              {authMode === 'login' ? (
                <span>Don't have an account? <button onClick={() => setAuthMode('register')} className="text-blue-400 font-bold">Register</button></span>
              ) : (
                <span>Already have an account? <button onClick={() => setAuthMode('login')} className="text-blue-400 font-bold">Login</button></span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MAIN APP DASHBOARD */}
      {isLoggedIn && (
        <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            
            <div className="flex border-b border-slate-800 gap-6">
              <button 
                onClick={() => setActiveTab('browse')}
                className={`pb-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'browse' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}
              >
                <Flame className="w-4 h-4" /> Active Closed Tests ({apps.length})
              </button>
              <button 
                onClick={() => setActiveTab('add')}
                className={`pb-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition ${activeTab === 'add' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}
              >
                <PlusCircle className="w-4 h-4" /> Submit App (-50 Coins)
              </button>
            </div>

            <AdSlot slotId="9876543210" />

            {activeTab === 'browse' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apps.map((app) => (
                  <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-xl">
                        {app.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{app.name}</h4>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{app.category}</span>
                      </div>
                    </div>

                    <div className="space-y-1 bg-slate-950 p-3 rounded-xl text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Testers:</span>
                        <span className="text-blue-400 font-bold">{app.testers_count} / {app.testers_needed}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Duration:</span>
                        <span className="text-amber-400 font-bold">{app.days_completed} / {app.total_days} Days</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinTest(app)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                    >
                      Test App & Earn +{app.coins_reward} Coins <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleAddApp} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-bold text-white">Submit App for Closed Testing</h3>
                <input 
                  type="text" required placeholder="App Name" value={newAppName} 
                  onChange={(e) => setNewAppName(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 outline-none"
                />
                <input 
                  type="url" required placeholder="Google Group Link" value={newGroupLink} 
                  onChange={(e) => setNewGroupLink(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 outline-none"
                />
                <input 
                  type="url" required placeholder="Play Store Web Link" value={newPlayLink} 
                  onChange={(e) => setNewPlayLink(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-xs shadow-lg">
                  Publish App (-50 Coins)
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-xs space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1"><Info className="w-4 h-4 text-blue-400" /> Community Rules</h4>
              <p className="text-slate-400">Keep testing apps installed for 14 continuous days to fulfill Google Play rules.</p>
            </div>
            <AdSlot slotId="5432109876" />
          </aside>
        </main>
      )}

      {/* FOOTER SECTION WITH TERMS & POLICIES */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            <p>© 2026 12 Testers Hub. All rights reserved.</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Compliant with Google Play Console Closed Testing Guidelines.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-slate-300 font-semibold">
            <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-blue-400 transition">Privacy Policy</button>
            <button onClick={() => setActiveLegalModal('terms')} className="hover:text-blue-400 transition">Terms of Service</button>
            <button onClick={() => setActiveLegalModal('refund')} className="hover:text-blue-400 transition">Refund & Coin Policy</button>
            <button onClick={() => setActiveLegalModal('contact')} className="hover:text-blue-400 transition">Contact Us</button>
          </div>
        </div>
      </footer>

      {/* LEGAL / POLICY POPUP MODAL */}
      {activeLegalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-lg w-full space-y-4 max-h-[80vh] overflow-y-auto">
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
              {activeLegalModal === 'privacy' && (
                <>
                  <p>12 Testers Hub respects user privacy. We do not store sensitive personal information or track user data beyond account authentication details.</p>
                  <p>All Google Group and Play Store links are submitted voluntarily by users for closed testing purposes.</p>
                </>
              )}
              {activeLegalModal === 'terms' && (
                <>
                  <p>By using 12 Testers Hub, developers agree to keep opted-in apps installed for 14 continuous days as required by Google Play Console rules.</p>
                  <p>Misuse, early opt-outs, or fake app submissions will result in temporary or permanent account suspension.</p>
                </>
              )}
              {activeLegalModal === 'refund' && (
                <>
                  <p>Virtual coins earned or granted on this platform carry no real monetary cash value.</p>
                  <p>Coins spent on app listings are non-refundable once an app campaign goes active on the community feed.</p>
                </>
              )}
              {activeLegalModal === 'contact' && (
                <>
                  <p>For support, app removal inquiries, or bug reports, please email us directly:</p>
                  <p className="font-mono text-blue-400 bg-slate-950 p-2 rounded-xl text-center">support@12testers.app</p>
                </>
              )}
            </div>

            <button 
              onClick={() => setActiveLegalModal(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
