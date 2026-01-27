
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#2D5A27] text-sm font-bold">
              <Star size={14} className="mr-2 fill-[#F58220] text-[#F58220]" />
              Koleksi Terbaru: Perlengkapan Sekolah & Kantor
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight uppercase">
              Cerdas Bersama <span className="text-[#2D5A27]">Ganesa</span> <span className="text-[#F58220]">Mas</span>.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
              Pusat literasi dan perlengkapan edukasi terlengkap. Temukan buku terbaik dan alat tulis berkualitas untuk masa depan gemilang.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/books" className="px-8 py-4 bg-[#2D5A27] text-white rounded-xl font-bold hover:bg-emerald-900 transition-all flex items-center shadow-lg shadow-emerald-100">
                Lihat Katalog
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white text-[#2D5A27] border-2 border-[#2D5A27] rounded-xl font-bold hover:bg-emerald-50 transition-all">
                Hubungi Kami
              </Link>
            </div>
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?u=ganesa${i}`} alt="user" />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">100k+ Pelanggan</p>
                <p className="text-slate-500 font-medium">Melayani sejak 2009</p>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#2D5A27] to-[#F58220] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200&h=900" 
                alt="Ganesa Mas Library" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Store Terpercaya</p>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Kualitas Terbaik Untuk Literasi Anda</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
