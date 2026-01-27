
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Clock, MapPin, Phone } from 'lucide-react';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img 
                src={LOGO_URL} 
                alt="Ganesa Mas Logo" 
                className="h-14 object-contain"
              />
            </Link>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              Solusi terlengkap untuk literasi, alat tulis kantor, dan perlengkapan sekolah berkualitas di Bali sejak 2009.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all duration-300">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-black text-[#2D5A27] mb-6 uppercase tracking-[0.2em] text-[10px]">Navigasi Utama</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link to="/" className="hover:text-[#F58220] transition-colors">Beranda</Link></li>
              <li><Link to="/books" className="hover:text-[#F58220] transition-colors">Katalog Produk</Link></li>
              <li><Link to="/contact" className="hover:text-[#F58220] transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/login" className="hover:text-[#F58220] transition-colors text-xs text-slate-400">Panel Admin</Link></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-black text-[#2D5A27] mb-6 uppercase tracking-[0.2em] text-[10px]">Jam Operasional</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock size={16} className="text-[#F58220] mt-0.5 flex-shrink-0" />
                <div className="text-sm font-medium text-slate-500">
                  <p className="font-bold text-slate-900">Senin - Jumat</p>
                  <p>08.00 - 17.00 WITA</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={16} className="text-[#F58220] mt-0.5 flex-shrink-0" />
                <div className="text-sm font-medium text-slate-500">
                  <p className="font-bold text-slate-900">Sabtu</p>
                  <p>09.00 - 15.00 WITA</p>
                </div>
              </div>
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-2">Minggu & Libur: Tutup</p>
            </div>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-black text-[#2D5A27] mb-6 uppercase tracking-[0.2em] text-[10px]">Kontak & Lokasi</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#F58220] mt-0.5 flex-shrink-0" />
                <p className="text-xs font-bold text-slate-500 leading-relaxed">
                  Jl. Ganesa No. 101, Denpasar, Bali 80234
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-[#F58220] flex-shrink-0" />
                <p className="text-xs font-bold text-slate-500">(0361) 123-4567</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          <p>© {new Date().getFullYear()} GANESA MAS GLOBAL. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#2D5A27]">Privacy Policy</a>
            <a href="#" className="hover:text-[#2D5A27]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
