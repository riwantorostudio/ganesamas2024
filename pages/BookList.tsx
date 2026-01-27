
import React, { useState, useEffect } from 'react';
import { SEO_DEFAULTS } from '../constants';
import BookCard from '../components/BookCard';
import { 
  Search, 
  ChevronDown, 
  BookOpen, 
  PenTool, 
  Truck, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Share2,
  Tag
} from 'lucide-react';
import { Book, Category } from '../types';

interface BookListProps {
  books: Book[];
  categories: Category[];
  addToCart: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, categories: dbCategories, addToCart }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Terbaru');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.title = `Katalog Produk | ${SEO_DEFAULTS.siteName}`;
    window.scrollTo(0, 0);
  }, []);

  const sliderImages = [
    {
      url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600&h=600',
      title: 'Koleksi Buku Premium',
      subtitle: 'Literasi terbaik untuk masa depan gemilang'
    },
    {
      url: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=1600&h=600',
      title: 'Alat Tulis Kantor & Sekolah',
      subtitle: 'Perlengkapan lengkap untuk kreativitas tanpa batas'
    }
  ];

  const handleSharePage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Katalog Ganesa Mas',
          text: 'Lihat koleksi buku dan alat tulis premium di Ganesa Mas!',
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link katalog berhasil disalin!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Menggunakan data kategori dari database
  const categoriesList = ['All', ...dbCategories.map(c => c.name)];
  const types = ['All', 'Paperback', 'Hardcover', 'E-Book'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                         book.author.toLowerCase().includes(search.toLowerCase()) ||
                         book.category.toLowerCase().includes(search.toLowerCase());
                         
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesType = selectedType === 'All' || book.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="relative h-[300px] sm:h-[450px] overflow-hidden bg-slate-900">
        {sliderImages.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
          >
            <img src={slide.url} className="w-full h-full object-cover opacity-60" alt={slide.title} />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-4">{slide.title}</h2>
              <p className="text-sm sm:text-xl font-medium text-emerald-100 tracking-widest uppercase opacity-90">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="-translate-y-12 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: BookOpen, title: 'Buku Literasi', color: 'bg-[#2D5A27]' },
            { icon: PenTool, title: 'Alat Tulis', color: 'bg-[#F58220]' },
            { icon: Award, title: 'Kualitas Premium', color: 'bg-slate-800' },
            { icon: Truck, title: 'Kirim Seluruh Bali', color: 'bg-emerald-900' }
          ].map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
              <div className={`${service.color} p-4 rounded-xl text-white mb-4 shadow-lg`}>
                <service.icon size={24} />
              </div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">{service.title}</h3>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
             <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Filter size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Saring Koleksi</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Temukan kebutuhan literasi Anda</p>
                </div>
             </div>
             <button 
              onClick={handleSharePage}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
             >
               <Share2 size={16} className="text-[#F58220]" />
               <span>Bagikan Katalog</span>
             </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 mb-12 shadow-sm sticky top-24 z-30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 relative">
                <input
                  type="text"
                  placeholder="Cari Judul, Penulis, atau ISBN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] font-bold text-slate-900 placeholder:font-normal"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
              
              <div className="lg:col-span-4 relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-none rounded-2xl pl-12 pr-10 py-4 text-xs font-black text-slate-700 uppercase tracking-widest focus:ring-2 focus:ring-[#2D5A27] cursor-pointer"
                >
                  {categoriesList.map(c => <option key={c} value={c}>{c === 'All' ? 'Semua Kategori' : c}</option>)}
                </select>
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D5A27]" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>

              <div className="lg:col-span-4 relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-none rounded-2xl px-6 py-4 text-xs font-black text-slate-700 uppercase tracking-widest focus:ring-2 focus:ring-[#2D5A27] cursor-pointer"
                >
                  <option>Terbaru</option>
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Hasil Tidak Ditemukan</h3>
              <p className="text-slate-500 font-medium">Coba gunakan kata kunci lain atau reset filter.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="mt-8 px-10 py-4 bg-[#2D5A27] text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BookList;
