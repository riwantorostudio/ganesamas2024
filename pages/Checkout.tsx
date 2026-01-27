
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, CreditCard, Truck, MapPin, ArrowLeft, Send, 
  Zap, ShieldCheck, Bell
} from 'lucide-react';
import { CartItem, PaymentMethod } from '../types';
import { supabase } from '../lib/supabase';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BankTransfer);
  const [apiStep, setApiStep] = useState<string>('');
  const [showNotification, setShowNotification] = useState(false);
  
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15000;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return alert('Koneksi database tidak tersedia.');
    
    setIsSubmitting(true);
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    try {
      setApiStep('Memvalidasi Keranjang...');
      await new Promise(r => setTimeout(r, 600));

      setApiStep('Menyimpan Detail Pesanan...');
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          id: orderId,
          customer_name: customerName,
          customer_whatsapp: whatsapp,
          address: address,
          total_amount: total,
          status: 'Pending'
        }]);

      if (orderError) throw orderError;

      setApiStep('Mendaftarkan Item Belanja...');
      const orderItems = cart.map(item => ({
        order_id: orderId,
        book_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setApiStep('Menyelesaikan Transaksi...');
      await new Promise(r => setTimeout(r, 800));
      
      setShowNotification(true);
      setIsSubmitting(false);
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      console.error(err);
      alert('Gagal: ' + err.message);
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white p-12 sm:p-20 rounded-[4rem] shadow-2xl text-center max-w-2xl border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 text-[#2D5A27]">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-6">Sukses Terkirim!</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">
            Halo {customerName}, pesanan Anda dengan ID <b>#{success && cart[0]?.id ? 'ORD-...' : 'BARU'}</b> telah kami terima. Tim Admin Ganesa Mas akan segera menghubungi Anda via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books" className="px-10 py-5 bg-[#2D5A27] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
                Katalog Lainnya
            </Link>
            <Link to="/" className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs">
                Kembali Ke Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-20">
      {isSubmitting && (
        <div className="fixed inset-0 z-[300] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-[#2D5A27] rounded-full animate-spin mb-6"></div>
          <p className="text-[#2D5A27] font-black text-xs uppercase tracking-widest animate-pulse">{apiStep}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
            <Link to="/cart" className="p-3 bg-white rounded-xl shadow-sm hover:bg-slate-50">
                <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Konfirmasi Pesanan</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="flex items-center space-x-4 mb-10 border-b border-slate-50 pb-6">
                    <MapPin size={24} className="text-[#2D5A27]" />
                    <h2 className="text-xl font-black text-slate-900 uppercase">Informasi Pengiriman</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Nama Lengkap</label>
                        <input required type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] font-bold" placeholder="Contoh: I Wayan Ganesa" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">WhatsApp</label>
                        <input required type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] font-bold" placeholder="0812..." />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Alamat Lengkap</label>
                        <textarea required rows={4} value={address} onChange={e => setAddress(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] font-bold resize-none" placeholder="Jalan, No Rumah, Kelurahan, Kota..."></textarea>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="flex items-center space-x-4 mb-8">
                    <CreditCard size={24} className="text-[#F58220]" />
                    <h2 className="text-xl font-black text-slate-900 uppercase">Metode Bayar</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Virtual Account', 'E-Wallet', 'Bank Transfer'].map(m => (
                      <button key={m} type="button" onClick={() => setPaymentMethod(m as any)} className={`p-6 rounded-2xl border-2 text-left transition-all ${paymentMethod === m ? 'border-[#2D5A27] bg-emerald-50' : 'border-slate-50 bg-slate-50/50'}`}>
                        <p className="font-black text-[10px] uppercase tracking-widest text-slate-900">{m}</p>
                        <p className="text-[9px] text-slate-400 font-bold mt-1">Proses Cepat & Aman</p>
                      </button>
                    ))}
                </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 sticky top-28">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Ringkasan</h3>
                <div className="space-y-4 mb-8 max-h-48 overflow-y-auto custom-scrollbar">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-xs font-bold">
                            <span className="text-slate-400 flex-grow pr-4">{item.quantity}x {item.title}</span>
                            <span className="text-slate-900">Rp{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-3 pt-6 border-t border-slate-50 mb-8">
                    <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Ongkir (Estimasi)</span>
                        <span>Rp{shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="text-lg font-black text-slate-900 uppercase">Total</span>
                        <span className="text-2xl font-black text-[#2D5A27]">Rp{total.toLocaleString()}</span>
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-[#2D5A27] hover:bg-emerald-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl transition-all flex items-center justify-center space-x-3">
                    <Send size={16} />
                    <span>Pesan Sekarang</span>
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
