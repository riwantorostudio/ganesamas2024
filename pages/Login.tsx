
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LOGO_URL } from '../constants';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      if (data.session) {
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Periksa email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5A27]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F58220]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-[#2D5A27] transition-colors mb-8 text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> Kembali ke Beranda
          </Link>
          <div className="flex justify-center mb-6">
            <img 
              src={LOGO_URL} 
              alt="Ganesa Mas Logo" 
              className="h-24 w-auto object-contain drop-shadow-2xl" 
            />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Login Admin</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Akses panel kontrol Ganesa Mas secara aman.</p>
        </div>

        <div className="bg-white py-10 px-10 rounded-[3rem] shadow-2xl border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start space-x-3 animate-in fade-in duration-300">
                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-xs text-red-600 font-bold leading-relaxed">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Email Akun</label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] font-bold text-slate-900"
                    placeholder="admin@ganesamas.com"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Kata Sandi</label>
                <div className="relative">
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] font-bold text-slate-900"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                </div>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center items-center space-x-3 py-5 px-4 bg-[#2D5A27] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-emerald-100 hover:bg-emerald-900 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Masuk Sekarang</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Sistem Keamanan Ganesa Mas &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
