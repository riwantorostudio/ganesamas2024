
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md border border-slate-100">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-[#2D5A27]">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Keranjang Kosong</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">Sepertinya Anda belum memilih buku atau alat tulis apapun untuk menemani produktivitas Anda.</p>
          <Link to="/books" className="inline-flex items-center space-x-3 px-10 py-5 bg-[#2D5A27] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-100 hover:bg-emerald-900 transition-all">
            <ArrowLeft size={16} />
            <span>Mulai Belanja</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-8 flex-grow space-y-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Keranjang Belanja</h1>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{cart.length} Item Terpilih</span>
            </div>
            
            <div className="space-y-6">
                {cart.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xl transition-all">
                        <div className="w-24 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                            <img src={item.coverImage} className="w-full h-full object-cover" alt={item.title} />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-400 font-medium mb-4">{item.author}</p>
                            <div className="flex items-center justify-center sm:justify-start space-x-1">
                                <span className="text-lg font-black text-[#2D5A27]">Rp{(item.price).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-2xl">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-white hover:text-[#2D5A27] rounded-xl transition-all text-slate-400"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="font-black text-slate-700 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-white hover:text-[#2D5A27] rounded-xl transition-all text-slate-400"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <Link to="/books" className="inline-flex items-center space-x-2 text-[#2D5A27] font-black uppercase tracking-widest text-xs hover:underline mt-8">
              <Plus size={14} />
              <span>Tambah Produk Lainnya</span>
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:w-96 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-28">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">Ringkasan Pesanan</h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-500 text-sm font-medium">
                        <span>Subtotal</span>
                        <span className="text-slate-900 font-black">Rp{subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-sm font-medium">
                        <span>Estimasi Ongkir</span>
                        <span className="text-slate-900 font-black">Rp{shipping.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="pt-4 border-t border-slate-50 flex justify-between">
                        <span className="text-lg font-black text-slate-900">Total</span>
                        <span className="text-lg font-black text-[#2D5A27]">Rp{total.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <Link 
                  to="/checkout"
                  className="w-full py-5 bg-[#F58220] hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-100 flex items-center justify-center space-x-3 transition-all active:scale-95"
                >
                    <CreditCard size={18} />
                    <span>Lanjut ke Pembayaran</span>
                </Link>

                <div className="mt-8 flex items-center justify-center space-x-4 opacity-30 grayscale pointer-events-none">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" className="h-4" alt="BCA" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Bank_Mandiri.svg" className="h-4" alt="Mandiri" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg" className="h-4" alt="OVO" />
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
