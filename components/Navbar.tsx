
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LayoutDashboard, LogIn, LogOut, Lock } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { LOGO_URL } from '../constants';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  user: SupabaseUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, cartCount, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/books');
  };

  const handleLogout = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-[80] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-24">
          <Link to="/" className="flex items-center h-full">
            <img 
              src={LOGO_URL} 
              alt="Ganesa Mas Logo" 
              className="h-12 sm:h-16 w-auto object-contain py-2 hover:scale-105 transition-transform duration-300" 
            />
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Cari buku, alat tulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] transition-all text-sm font-bold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </form>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6 text-xs font-black uppercase tracking-widest">
                <Link to="/" className="text-slate-600 hover:text-[#2D5A27]">Beranda</Link>
                <Link to="/books" className="text-slate-600 hover:text-[#2D5A27]">Katalog</Link>
                <Link to="/contact" className="text-slate-600 hover:text-[#2D5A27]">Hubungi</Link>
            </div>
            
            <div className="flex items-center space-x-4 pl-6 border-l border-slate-200">
              <Link to="/cart" className="text-slate-500 hover:text-[#2D5A27] relative p-2">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#F58220] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse border-2 border-white shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/admin" className="p-3 bg-emerald-50 text-[#2D5A27] rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all flex items-center space-x-2">
                    <LayoutDashboard size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Panel Admin</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center shadow-sm"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all flex items-center space-x-2">
                  <LogIn size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Login</span>
                </Link>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-slate-600">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#F58220] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 pt-4 pb-10 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] text-sm font-bold"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </form>
          <div className="flex flex-col space-y-6 font-black uppercase tracking-widest text-slate-700">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
            <Link to="/books" onClick={() => setIsMenuOpen(false)}>Katalog</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Hubungi Kami</Link>
            <div className="pt-4 border-t border-slate-100 space-y-4">
              {user ? (
                <>
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#2D5A27] flex items-center space-x-2">
                    <LayoutDashboard size={18} />
                    <span>Panel Admin</span>
                  </Link>
                  <button onClick={() => { setIsMenuOpen(false); navigate('/admin'); }} className="text-slate-600 flex items-center space-x-2 w-full text-left">
                    <Lock size={18} className="text-[#F58220]" />
                    <span>Ganti Password</span>
                  </button>
                  <button onClick={handleLogout} className="text-red-500 flex items-center space-x-2 w-full text-left">
                    <LogOut size={18} />
                    <span>Keluar Sesi</span>
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[#2D5A27] flex items-center space-x-2">
                  <LogIn size={18} />
                  <span>Masuk Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
