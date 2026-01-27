
import React from 'react';
import { Star, ArrowRight, Share2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  addToCart?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, addToCart }) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: book.title,
          text: `Cek buku "${book.title}" karya ${book.author} di Ganesa Mas!`,
          url: `${window.location.origin}/#/book/${book.id}`,
        });
      }
    } catch (err) {}
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      <Link to={`/book/${book.id}`} className="block aspect-[3/4] overflow-hidden relative">
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          <span className="px-2 py-1 bg-[#2D5A27] text-white text-[10px] font-black rounded uppercase tracking-widest">{book.category}</span>
        </div>
        <button onClick={handleShare} className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-600 opacity-0 group-hover:opacity-100 shadow-lg"><Share2 size={16} /></button>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          <Star size={14} className="fill-[#F58220] text-[#F58220]" /><span className="text-xs font-bold text-slate-700">{book.rating}</span>
        </div>
        <h3 className="text-base font-black text-slate-900 mb-1 uppercase tracking-tight line-clamp-1">{book.title}</h3>
        <p className="text-sm text-slate-500 mb-4 font-medium">{book.author}</p>
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
            <span className="text-lg font-black text-[#2D5A27]">Rp{book.price.toLocaleString('id-ID')}</span>
            <button onClick={(e) => { e.preventDefault(); addToCart?.(book); }} className="p-3 bg-emerald-50 text-[#2D5A27] rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all"><ShoppingBag size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
