
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import { TESTIMONIALS, SEO_DEFAULTS } from '../constants';
import { Link } from 'react-router-dom';
import { Shield, CreditCard, Headphones, Truck, ArrowRight, BookOpen } from 'lucide-react';
import { Book } from '../types';

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center space-y-3 p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
    <div className="p-4 bg-emerald-50 rounded-2xl text-[#2D5A27] shadow-sm">
      <Icon size={28} />
    </div>
    <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const Home: React.FC<{ books: Book[], addToCart: (book: Book) => void }> = ({ books, addToCart }) => {
  useEffect(() => {
    document.title = `${SEO_DEFAULTS.title}`;
  }, []);

  const featuredBooks = books.slice(0, 4);

  return (
    <div className="space-y-20 pb-20 bg-slate-50">
      <Hero />

      {/* Fitur Utama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureItem 
            icon={Shield} 
            title="Pembayaran Aman" 
            desc="Integrasi bank multi-channel dengan enkripsi 256-bit untuk setiap transaksi." 
          />
          <FeatureItem 
            icon={Truck} 
            title="Pengiriman Cepat" 
            desc="Jaringan logistik terpercaya menjangkau seluruh pelosok Nusantara tepat waktu." 
          />
          <FeatureItem 
            icon={Headphones} 
            title="Dukungan 24/7" 
            desc="Spesialis literasi kami siap membantu Anda menemukan bacaan yang tepat." 
          />
          <FeatureItem 
            icon={CreditCard} 
            title="Garansi Retur" 
            desc="Kebijakan pengembalian 30 hari jika produk tidak sesuai dengan ekspektasi." 
          />
        </div>
      </section>

      {/* Katalog Pilihan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-3xl font-black text-[#2D5A27] uppercase tracking-tighter mb-2">Pilihan Editor</h2>
            <p className="text-slate-500 font-medium">Kurasi literasi terbaik untuk wawasan masa depan Anda</p>
          </div>
          <Link to="/books" className="hidden sm:flex items-center text-[#2D5A27] font-black uppercase tracking-widest text-sm hover:text-[#F58220] transition-colors">
            Lihat Semua <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="bg-slate-900 text-white py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5A27]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000&h=800" 
                alt="Ganesa Mas Experience" 
                className="rounded-[3rem] shadow-2xl border-8 border-white/5"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#F58220] p-10 rounded-[2.5rem] hidden md:block shadow-2xl">
                <span className="text-5xl font-black italic tracking-tighter">15th</span>
                <p className="text-xs font-black uppercase tracking-[0.2em] mt-2 opacity-80">Dedikasi Literasi</p>
              </div>
            </div>
            <div className="space-y-10">
                <div className="space-y-4">
                    <span className="text-[#F58220] font-black uppercase tracking-[0.3em] text-xs">Visi Kami</span>
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-tight">
                        Membangun Negeri Melalui <span className="text-emerald-400">Literasi Berkualitas</span>.
                    </h2>
                </div>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Sejak 2009, Ganesa Mas telah menjadi pionir dalam menyediakan akses literasi berkualitas bagi masyarakat Bali dan sekitarnya. Kami tidak hanya menjual buku, tapi menyediakan jembatan menuju pengetahuan.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="text-3xl font-black text-white mb-2">50k+</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Koleksi Judul</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white mb-2">100k+</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Pelanggan Puas</p>
                </div>
              </div>
              <Link to="/contact" className="inline-flex items-center space-x-3 px-10 py-5 bg-[#2D5A27] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#F58220] transition-all shadow-xl">
                <span>Pelajari Selengkapnya</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl font-black text-[#2D5A27] uppercase tracking-tighter">Suara Pembaca</h2>
          <div className="w-24 h-2 bg-[#F58220] mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 items-center sm:items-start hover:shadow-2xl transition-all">
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 shadow-sm" />
              <div>
                <p className="text-slate-600 italic mb-6 leading-relaxed font-medium text-lg">"{t.content}"</p>
                <div className="flex flex-col">
                    <h4 className="font-black text-slate-900 uppercase tracking-tight">{t.name}</h4>
                    <span className="text-xs text-[#2D5A27] font-black uppercase tracking-widest mt-1">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
