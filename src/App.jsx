import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Award, PlusCircle, 
  BarChart3, User, LayoutGrid, Calendar, Check,
  Search, Info, ArrowRight, Menu, X, Users, Smartphone, Zap,
  Clock, Shield, Mail, Lock, AlertCircle, CheckCircle2
} from 'lucide-react';

// ------------------------------------------------------------------
// 1. SUPABASE CLIENT INITIALIZATION
// (Apni URL aur Anon Key yahan replace karein)
// ------------------------------------------------------------------
const SUPABASE_URL = "https://your-project-id.supabase.co"; 
const SUPABASE_ANON_KEY = "your-anon-key-here";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Modes: 'login' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState('register'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState(null);

  // Auth Inputs & States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // App States
  const [coins, setCoins] = useState(160);
  const [activeTab, setActiveTab] = useState('daily');
  const [copiedGroup, setCopiedGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [apps, setApps] = useState([
    { id: 1, name: 'Zomplant War', developer: 'Game Studio PK', category: 'Games', icon: '🧟', group_link: 'https://groups.google.com/g/12testers-community', play_link: 'https://play.google.com/apps/testing/com.zomplant.war', testers_count: 6, target_testers: 12, reward_coins: 20, tested_today: false },
    { id: 2, name: 'Sparkle Pop', developer: 'Star Puzzle', category: 'Casual', icon: '⭐', group_link: 'https://groups.google.com/g/12testers-community', play_link: 'https://play.google.com/apps/testing/com.sparkle.pop', testers_count: 9, target_testers: 12, reward_coins: 20, tested_today: false },
    { id: 3, name: 'Light roulette', developer: 'cenusalabs', category: 'Casino', icon: '🎰', group_link: 'https://groups.google.com/g/12testers-community', play_link: 'https://play.google.com/apps/testing/com.light.roulette', testers_count: 7, target_testers: 12, reward_coins: 20, tested_today: false },
    { id: 4, name: 'Qryon', developer: 'AsarSong studio', category: 'Tools', icon: '🌐', group_link: 'https://groups.google.com/g/12testers-community', play_link: 'https://play.google.com/apps/testing/com.qryon.app', testers_count: 2, target_testers: 12, reward_coins: 20, tested_today: false }
  ]);

  const [appName, setAppName] = useState('');
  const [devName, setDevName] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [playLink, setPlayLink] = useState('');

  // ------------------------------------------------------------------
  // 2. CHECK REAL USER SESSION ON LOAD
  // ------------------------------------------------------------------
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mode change switch
  const handleSwitchMode = (mode) => {
    setAuthMode(mode);
    setAuthError('');
    setAuthSuccess('');
  };

  // ------------------------------------------------------------------
  // 3. REAL SUPABASE AUTHENTICATION LOGIC (Login, Register, Reset)
  // ------------------------------------------------------------------
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      if (authMode === 'login') {
        // REAL LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setShowAuthModal(false);
      } else if (authMode === 'register') {
        // REAL SIGNUP
        const { error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) throw error;
        setAuthSuccess('Account created! Please check your email to confirm registration.');
      } else if (authMode === 'forgot') {
        // REAL FORGOT PASSWORD (EMAIL RESET LINK)
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin
        });
        if (error) throw error;
        setAuthSuccess('Password reset link sent to your email!');
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMobileMenuOpen(false);
  };

  const handlePerformRealTest = (targetApp) => {
    window.open(targetApp.group_link, '_blank');
    setTimeout(() => {
      window.open(targetApp.play_link, '_blank');
    }, 1000);

    if (!targetApp.tested_today) {
      setApps(prevApps => prevApps.map(item => item.id === targetApp.id ? { ...item, tested_today: true, testers_count: Math.min(item.target_testers, item.testers_count + 1) } : item));
      setCoins(prevCoins => prevCoins + targetApp.reward_coins);
    }
  };

  const handlePublishApp = (e) => {
    e.preventDefault();
    if (coins < 50) {
      alert('❌ Balance Insufficient! Form submit karne ke liye 50 Coins hona zaroori hain.');
      return;
    }
    const newApp = { id: Date.now(), name: appName, developer: devName || 'Independent Developer', category: 'Tools', icon: '📱', group_link: groupLink, play_link: playLink, testers_count: 0, target_testers: 12, reward_coins: 20, tested_today: true };
    setApps([newApp, ...apps]);
    setCoins(prevCoins => prevCoins - 50);
    setAppName(''); setDevName(''); setGroupLink(''); setPlayLink('');
    setActiveTab('feed');
    alert('🚀 App Publish Ho Gaya! 50 Coins deduct ho gaye hain.');
  };

  const completedTodayCount = apps.filter(a => a.tested_today).length;
  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans antialiased select-none">
      
      {/* HEADER */}
      <header className="border-b border-slate-800/80 bg-[#070b14]/90 sticky top-0 z-40 px-4 py-3 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white leading-none">12 TESTERS</h1>
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Closed Testing Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="bg-slate-950 border border-amber-500/40 px-3 py-1 rounded-2xl flex items-center gap-2 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Award className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="flex flex-col text-right leading-none">
                <span className="text-[8px] text-slate-400 font-semibold uppercase">BALANCE</span>
                <span className="text-xs font-black text-amber-300">{coins} Coins</span>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 text-xs font-semibold sticky top-[53px] z-30 shadow-2xl backdrop-blur-md">
          {!user ? (
            <>
              <button 
                onClick={() => { handleSwitchMode('login'); setShowAuthModal(true); setMobileMenuOpen(false); }}
                className="w-full text-left py-2.5 px-3 bg-slate-950 rounded-xl text-slate-200 hover:text-cyan-400 border border-slate-800 flex justify-between items-center"
              >
                <span>Existing Member Login</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
              <button 
                onClick={() => { handleSwitchMode('register'); setShowAuthModal(true); setMobileMenuOpen(false); }}
                className="w-full text-left py-2.5 px-3 bg-blue-600 rounded-xl text-white font-bold flex justify-between items-center shadow-md"
              >
                <span>Register & Get 12 Testers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="w-full text-left py-2.5 px-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-bold flex justify-between items-center"
            >
              <span>Logout Account</span>
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2 text-[11px] text-slate-400">
            <button onClick={() => { setPolicyModal('privacy'); setMobileMenuOpen(false); }} className="text-left hover:text-white">Privacy Policy</button>
            <button onClick={() => { setPolicyModal('terms'); setMobileMenuOpen(false); }} className="text-left hover:text-white">Terms & Conditions</button>
            <button onClick={() => { setPolicyModal('refund'); setMobileMenuOpen(false); }} className="text-left hover:text-white">Refund Policy</button>
          </div>
        </div>
      )}

      {/* MAIN BODY */}
      <main className="max-w-md mx-auto w-full px-4 py-6 space-y-6 flex-1 pb-24">
        {!user ? (
          /* UNAUTHENTICATED LANDING PAGE */
          <div className="space-y-8 pt-2">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-cyan-400">
                <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                <span>100% Free Tester Exchange Platform</span>
              </div>

              <h2 className="text-2xl font-black text-white leading-tight px-2">
                Pass Google Play Closed Testing in <span className="text-blue-500">14 Days</span>
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Get 12 real opted-in testers for your Android app effortlessly. Join developers worldwide, test each other's apps, and pass Play Console verification.
              </p>

              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => { handleSwitchMode('register'); setShowAuthModal(true); }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition"
                >
                  <span>Register & Get 12 Testers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => { handleSwitchMode('login'); setShowAuthModal(true); }}
                  className="w-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs py-3.5 px-4 rounded-2xl border border-slate-800 transition"
                >
                  Existing Member Login
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-900">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider text-center mb-4">Why Developers Choose Us</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl space-y-1">
                  <Users className="w-5 h-5 text-blue-400 mb-1" />
                  <h4 className="text-xs font-bold text-white">Guaranteed Testers</h4>
                  <p className="text-[10px] text-slate-400">Real developers testing your app daily.</p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl space-y-1">
                  <Smartphone className="w-5 h-5 text-cyan-400 mb-1" />
                  <h4 className="text-xs font-bold text-white">Play Console Ready</h4>
                  <p className="text-[10px] text-slate-400">Full 14-day tracking & testing history.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="space-y-4">
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
                      <div className="bg-white h-full rounded-full transition-all duration-300" style={{ width: `${(completedTodayCount / apps.length) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-slate-400">Daily Testing Apps</h4>
                  {apps.map((app) => (
                    <div key={app.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0">{app.icon}</div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{app.name}</h5>
                          <span className="text-[10px] block font-medium mt-0.5">
                            {app.tested_today ? <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">Tested Today</span> : <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">Pending verification</span>}
                          </span>
                        </div>
                      </div>
                      {app.tested_today ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <button onClick={() => handlePerformRealTest(app)} className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs px-4 py-1.5 rounded-full transition shadow">
                          Open
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
                <h3 className="text-sm font-bold text-white">Developer Account</h3>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                  <p className="text-slate-400">Logged in Email: <span className="text-white font-bold">{user.email}</span></p>
                  <p className="text-slate-400">Balance: <span className="text-amber-400 font-bold">{coins} Coins</span></p>
                  <button onClick={handleLogout} className="mt-3 w-full bg-red-600/20 text-red-400 border border-red-500/30 py-2 rounded-xl text-xs font-bold">Logout Account</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. REAL SUPABASE AUTH MODAL (WITH FORGOT PASSWORD & WORKING TOGGLES) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center space-y-1">
              <h2 className="text-lg font-black text-white">
                {authMode === 'login' && 'Existing Member Login'}
                {authMode === 'register' && 'Create Account'}
                {authMode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'login' && 'Enter your registered credentials'}
                {authMode === 'register' && 'Pass Closed Testing in 14 Days'}
                {authMode === 'forgot' && 'We will send a reset link to your email'}
              </p>
            </div>

            {/* ERROR DISPLAY */}
            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-xl flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* SUCCESS DISPLAY */}
            {authSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300">Email Address</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input 
                    type="email" 
                    required 
                    placeholder="dev@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-slate-300">Password</label>
                    {authMode === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => handleSwitchMode('forgot')} 
                        className="text-[10px] text-cyan-400 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 outline-none focus:border-blue-500" 
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={authLoading} 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition disabled:opacity-50"
              >
                {authLoading ? 'Verifying with Database...' : (
                  authMode === 'login' ? 'Login to Dashboard' : 
                  authMode === 'register' ? 'Register & Claim 160 Coins' : 
                  'Send Reset Email'
                )}
              </button>
            </form>

            {/* NAVIGATION TOGGLES */}
            <div className="text-center border-t border-slate-800 pt-3">
              {authMode === 'login' && (
                <button onClick={() => handleSwitchMode('register')} className="text-xs text-cyan-400 hover:underline font-semibold">
                  Don't have an account? Register
                </button>
              )}
              {authMode === 'register' && (
                <button onClick={() => handleSwitchMode('login')} className="text-xs text-cyan-400 hover:underline font-semibold">
                  Already have an account? Login
                </button>
              )}
              {authMode === 'forgot' && (
                <button onClick={() => handleSwitchMode('login')} className="text-xs text-cyan-400 hover:underline font-semibold">
                  Back to Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-[#05080f] py-6 px-4 text-center space-y-3 text-xs text-slate-500 mb-12">
        <div className="flex justify-center items-center gap-4 text-[11px] font-semibold text-slate-400">
          <button onClick={() => setPolicyModal('privacy')} className="hover:text-blue-400">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => setPolicyModal('terms')} className="hover:text-blue-400">Terms of Service</button>
          <span>•</span>
          <button onClick={() => setPolicyModal('refund')} className="hover:text-blue-400">Refund Policy</button>
        </div>
        <p className="text-[10px] text-slate-600">© 2026 12 Testers Hub.</p>
      </footer>

      {/* BOTTOM NAV */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 z-40 px-2 py-2 flex justify-around items-center backdrop-blur-lg">
          <button onClick={() => setActiveTab('daily')} className={`flex flex-col items-center gap-1 ${activeTab === 'daily' ? 'text-cyan-400' : 'text-slate-400'}`}>
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] font-bold">Daily Test</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-400'}`}>
            <User className="w-5 h-5" />
            <span className="text-[9px] font-bold">Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}
