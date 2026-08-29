import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from './firebase';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  // Modes: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState('login'); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  // Reset Messages on Mode Switch
  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        // REAL LOGIN: Verifies against Firebase Auth database
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
        onClose();
      } else if (mode === 'register') {
        // REAL SIGNUP: Creates a new user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
        onClose();
      } else if (mode === 'forgot') {
        // REAL FORGOT PASSWORD: Sends real reset email
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset email sent! Please check your inbox.');
      }
    } catch (err) {
      // Handles Real Errors (Wrong password, Email already in use, Invalid email, etc.)
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/email-already-in-use':
          setError('An account with this email already exists.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters long.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Authentication failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Heading */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black text-white">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Login to access your 12 Testers Dashboard'}
            {mode === 'register' && 'Get 12 real testers for your Android app'}
            {mode === 'forgot' && 'Enter your email to receive a password reset link'}
          </p>
        </div>

        {/* Real Error Message Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Real Success Message Display */}
        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-2 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="email" 
                required 
                placeholder="dev@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-100 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-slate-300">Password</label>
                {mode === 'login' && (
                  <button 
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-100 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>
              {loading ? 'Processing...' : (
                mode === 'login' ? 'Login to Dashboard' : 
                mode === 'register' ? 'Register Account' : 
                'Send Reset Email'
              )}
            </span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Navigation Links */}
        <div className="text-center border-t border-slate-800 pt-3 space-y-1">
          {mode === 'login' && (
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <button onClick={() => switchMode('register')} className="text-cyan-400 font-semibold hover:underline">
                Register
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button onClick={() => switchMode('login')} className="text-cyan-400 font-semibold hover:underline">
                Login
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <button onClick={() => switchMode('login')} className="text-xs text-cyan-400 font-semibold hover:underline">
              Back to Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
