
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO_DEFAULTS } from '../constants';
import { Book as BookIcon, CheckCircle2, Star, Search, ArrowRight, ShoppingBag } from 'lucide-react';
import BookCard from '../components/BookCard';
import { Book } from '../types';

interface BookDetailProps {
  books: Book[];
  addToCart: (book: Book) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ books, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const book = books.find(b => b.id === id);

  useEffect(() => {
    if (book) { document.title = `${book.title} | ${SEO_DEFAULTS.siteName}`; }
    window.scrollTo(0, 0);
  }, [book, id]);

  if (!book) return <div className="py-40 text-center uppercase font-black">Buku Tidak Ditemukan</div>;

  const relatedBooks = books.filter(b => b.id !== id && b.category === book.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"><img src={book.coverImage} className="w-full h-full object-cover" /></div>
            <div className="bg-[#2D5A27] rounded-[2.5rem] p-10 text-white shadow-2xl"><h4 className="text-4xl font-black">Rp{book.price.toLocaleString('id-ID')}</h4><button onClick={() => addToCart(book)} className="w-full py-5 bg-[#F58220] hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 mt-8 shadow-xl"><span>Masukkan ke Keranjang</span></button></div>
          </div>
          <div className="lg:col-span-7 space-y-16">
            <section><h1 className="text-4xl font-black uppercase mb-6 tracking-tighter">{book.title}</h1><div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm"><p className="text-xl text-slate-600 italic">"{book.description}"</p></div></section>
            <section><h2 className="text-xl font-black text-slate-800 mb-8 uppercase">Detail Teknis</h2><div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-50 font-bold">
                    {[
                        ['Penulis', book.author], ['Penerbit', book.publisher], ['Thn Terbit', book.publishedDate], 
                        ['Halaman', `${book.pages} Hal`], ['ISBN', book.isbn], ['Tipe Cover', book.type]
                    ].map(([label, value], idx) => (
                        <div key={idx} className="grid grid-cols-12 hover:bg-slate-50/50"><div className="col-span-5 p-5 text-slate-400 text-[10px] uppercase font-black border-r border-slate-50">{label}</div><div className="col-span-7 p-5 text-slate-700 text-sm">{value}</div></div>
                    ))}
                </div>
            </div></section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
