
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Search, X, Save, Package, LogOut, 
  RefreshCw, LayoutDashboard, ShoppingBag, TrendingUp, 
  Activity, Eye, User, MapPin, Phone, ChevronRight, Tag, BookOpen, Layers,
  Upload, Image as ImageIcon, Lock, ShieldCheck, AlertCircle, CheckCircle2,
  FileText, Hash, Calendar, Layers3, Palette, Ruler, Star
} from 'lucide-react';
import { Book, Category, Order, OrderStatus } from '../types';
import { supabase } from '../lib/supabase';
import { LOGO_URL } from '../constants';

interface CMSProps {
  books: Book[];
  categories: Category[];
  onAdd: (book: Book) => Promise<void>;
  onUpdate: (book: Book) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onAddCategory: (name: string) => Promise<void>;
  onUpdateCategory: (id: string, newName: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  user: any;
}

type AdminTab = 'dashboard' | 'catalog' | 'orders' | 'categories' | 'password';

const CMS: React.FC<CMSProps> = ({ 
  books, categories, onAdd, onUpdate, onDelete, 
  onAddCategory, onUpdateCategory, onDeleteCategory, user 
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [search, setSearch] = useState('');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{id: string, name: string} | null>(null);
  const [newCatName, setNewCatName] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, books(*))')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingBook(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;
    
    setLoading(true);
    try {
        // Hanya kirim field yang ada di skema SQL database user
        const bookData: any = {
          title: editingBook.title || '',
          author: editingBook.author || '',
          category: editingBook.category || (categories.length > 0 ? categories[0].name : ''),
          price: Number(editingBook.price) || 0,
          rating: Number(editingBook.rating) || 5.0,
          coverImage: editingBook.coverImage || '',
          description: editingBook.description || '',
          publisher: editingBook.publisher || '',
          publishedDate: String(editingBook.publishedDate) || new Date().getFullYear().toString(),
          pages: Number(editingBook.pages) || 0,
          isbn: editingBook.isbn || '',
          type: editingBook.type || 'Paperback'
        };

        if (editingBook.id) {
          bookData.id = editingBook.id;
          await onUpdate(bookData as Book);
        } else {
          await onAdd(bookData as Book);
        }
        setIsBookModalOpen(false);
        setEditingBook(null);
    } catch (err) {
        console.error("Error saving book:", err);
        alert('Gagal menyimpan buku ke database. Periksa koneksi Supabase.');
    } finally {
        setLoading(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingCategory) {
      await onUpdateCategory(editingCategory.id, newCatName);
    } else {
      await onAddCategory(newCatName);
    }
    setLoading(false);
    setIsCategoryModalOpen(false);
    setNewCatName('');
    setEditingCategory(null);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok.');
      return;
    }
    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordSuccess(true);
      setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    if (!supabase) return;
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.isbn?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalSales = orders.reduce((acc, curr) => acc + curr.total_amount, 0);

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans">
      <aside className="w-72 bg-slate-950 border-r border-white/5 p-8 flex flex-col space-y-8 sticky top-0 h-screen">
        <div className="flex flex-col items-center">
            <img src={LOGO_URL} alt="Ganesa Mas" className="h-12 brightness-0 invert opacity-80 mb-4" />
        </div>
        <nav className="flex-grow space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Panel Kontrol' },
              { id: 'catalog', icon: Package, label: 'Katalog Buku' },
              { id: 'categories', icon: Layers, label: 'Kategori' },
              { id: 'orders', icon: ShoppingBag, label: 'Penjualan' },
              { id: 'password', icon: Lock, label: 'Ganti Password' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as AdminTab)} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#2D5A27] text-white' : 'text-slate-500 hover:bg-white/5'}`}>
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
              </button>
            ))}
        </nav>
        <div className="pt-6 border-t border-white/5">
            <button onClick={() => navigate('/')} className="w-full flex items-center space-x-4 px-6 py-3 text-emerald-400 hover:bg-emerald-400/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <ChevronRight size={16} />
                <span>Lihat Website</span>
            </button>
            <button onClick={() => supabase?.auth.signOut().then(() => navigate('/login'))} className="w-full flex items-center space-x-4 px-6 py-3 text-red-400 hover:bg-red-400/10 rounded-xl text-[10px] font-black uppercase tracking-widest mt-2">
                <LogOut size={16} />
                <span>Logout</span>
            </button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <header><h1 className="text-4xl font-black text-white uppercase tracking-tighter">Ringkasan Bisnis</h1></header>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-white/5"><TrendingUp className="text-emerald-400 mb-4" size={28} /><h3 className="text-xl font-black text-white mt-1">Rp{totalSales.toLocaleString()}</h3></div>
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-white/5"><ShoppingBag className="text-orange-400 mb-4" size={28} /><h3 className="text-xl font-black text-white mt-1">{orders.length} Transaksi</h3></div>
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-white/5"><BookOpen className="text-blue-400 mb-4" size={28} /><h3 className="text-xl font-black text-white mt-1">{books.length} Judul</h3></div>
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-white/5"><Activity className="text-purple-400 mb-4" size={28} /><h3 className="text-xl font-black text-white mt-1">Online</h3></div>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Katalog Produk</h2>
                <div className="flex items-center space-x-4">
                    <input type="text" placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} className="bg-white/5 border-none rounded-xl px-10 py-3 text-xs font-bold w-64 focus:ring-2 focus:ring-[#2D5A27]" />
                    <button onClick={() => { setEditingBook({ type: 'Paperback', rating: 5.0, publishedDate: new Date().getFullYear().toString() }); setIsBookModalOpen(true); }} className="flex items-center space-x-2 px-6 py-3 bg-[#2D5A27] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"><Plus size={16} /><span>Tambah Buku</span></button>
                </div>
            </header>
            <div className="bg-slate-800/30 rounded-[2.5rem] border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead><tr className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest"><th className="px-8 py-6">Produk</th><th className="px-8 py-6">Kategori</th><th className="px-8 py-6">Harga</th><th className="px-8 py-6 text-right">Aksi</th></tr></thead>
                    <tbody className="divide-y divide-white/5">{filteredBooks.map(book => (
                        <tr key={book.id} className="hover:bg-white/5 text-sm"><td className="px-8 py-6 flex items-center space-x-4"><img src={book.coverImage} className="w-10 h-14 object-cover rounded shadow-lg" /><div><p className="font-black text-white uppercase">{book.title}</p></div></td><td className="px-8 py-6">{book.category}</td><td className="px-8 py-6 font-black">Rp{book.price.toLocaleString()}</td><td className="px-8 py-6 text-right space-x-2"><button onClick={() => { setEditingBook(book); setIsBookModalOpen(true); }} className="p-2 bg-white/5 rounded-lg hover:bg-blue-500"><Edit size={16} /></button><button onClick={() => onDelete(book.id)} className="p-2 bg-white/5 rounded-lg hover:bg-red-500"><Trash2 size={16} /></button></td></tr>
                    ))}</tbody>
                </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <header className="flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Manajemen Kategori</h2>
                <button 
                  onClick={() => { setEditingCategory(null); setNewCatName(''); setIsCategoryModalOpen(true); }}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#2D5A27] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                >
                    <Plus size={16} />
                    <span>Tambah Kategori</span>
                </button>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-slate-800/50 p-8 rounded-[2rem] border border-white/5 flex justify-between items-center group">
                      <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category Name</p>
                          <h4 className="text-lg font-black text-white mt-1 uppercase">{cat.name}</h4>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => { setEditingCategory(cat); setNewCatName(cat.name); setIsCategoryModalOpen(true); }} className="p-2 bg-white/5 rounded-lg hover:bg-blue-500"><Edit size={16} /></button>
                          <button onClick={() => { if(confirm('Hapus kategori ini?')) onDeleteCategory(cat.id); }} className="p-2 bg-white/5 rounded-lg hover:bg-red-500"><Trash2 size={16} /></button>
                      </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <header className="flex justify-between items-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Data Penjualan</h2>
                <button onClick={fetchOrders} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </header>

            <div className="bg-slate-800/30 rounded-[2.5rem] border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <th className="px-8 py-6">Order ID</th>
                            <th className="px-8 py-6">Customer</th>
                            <th className="px-8 py-6">Total</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors group text-sm">
                                <td className="px-8 py-6 font-mono text-xs text-slate-500">{order.id}</td>
                                <td className="px-8 py-6">
                                    <p className="font-black text-white uppercase">{order.customer_name}</p>
                                    <p className="text-[10px] font-bold text-emerald-400">{order.customer_whatsapp}</p>
                                </td>
                                <td className="px-8 py-6 font-black">Rp{order.total_amount.toLocaleString()}</td>
                                <td className="px-8 py-6">
                                    <select 
                                      value={order.status} 
                                      onChange={e => updateOrderStatus(order.id, e.target.value as any)} 
                                      className="bg-slate-900 border-none rounded-lg px-3 py-1 text-[9px] font-black uppercase text-emerald-400 cursor-pointer"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Dibayar">Dibayar</option>
                                        <option value="Dikirim">Dikirim</option>
                                        <option value="Selesai">Selesai</option>
                                    </select>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button onClick={() => setSelectedOrder(order)} className="p-2 bg-white/5 rounded-lg hover:bg-[#2D5A27]">
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
            <div className="max-w-xl space-y-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Ganti Password</h2>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <input type="password" placeholder="Password Baru" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold" />
                    <input type="password" placeholder="Konfirmasi" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold" />
                    <button type="submit" className="w-full py-5 bg-[#2D5A27] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Simpan Password Baru</button>
                </form>
            </div>
        )}
      </main>

      {isBookModalOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <form onSubmit={handleSaveBook} className="bg-slate-900 w-full max-w-5xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
            <header className="p-8 bg-white/5 flex justify-between items-center"><h3 className="text-xl font-black uppercase tracking-widest">Formulir Buku</h3><button type="button" onClick={() => setIsBookModalOpen(false)}><X size={20} /></button></header>
            <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-h-[70vh] overflow-y-auto">
                <div className="md:col-span-1 space-y-6">
                    <div onClick={() => fileInputRef.current?.click()} className="aspect-[3/4] bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                        {editingBook?.coverImage ? <img src={editingBook.coverImage} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-slate-500" />}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Judul</label><input required value={editingBook?.title || ''} onChange={e => setEditingBook({...editingBook, title: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Penulis</label><input required value={editingBook?.author || ''} onChange={e => setEditingBook({...editingBook, author: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Kategori</label><select required value={editingBook?.category || ''} onChange={e => setEditingBook({...editingBook, category: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm">{categories.map(c => <option key={c.id} value={c.name} className="bg-slate-900">{c.name}</option>)}</select></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Harga</label><input required type="number" value={editingBook?.price || ''} onChange={e => setEditingBook({...editingBook, price: Number(e.target.value)})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Rating (1.0 - 5.0)</label><input required type="number" step="0.1" value={editingBook?.rating || ''} onChange={e => setEditingBook({...editingBook, rating: Number(e.target.value)})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">ISBN</label><input required value={editingBook?.isbn || ''} onChange={e => setEditingBook({...editingBook, isbn: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Penerbit</label><input required value={editingBook?.publisher || ''} onChange={e => setEditingBook({...editingBook, publisher: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Thn Terbit</label><input required value={editingBook?.publishedDate || ''} onChange={e => setEditingBook({...editingBook, publishedDate: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Jml Halaman</label><input required type="number" value={editingBook?.pages || ''} onChange={e => setEditingBook({...editingBook, pages: Number(e.target.value)})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black uppercase text-slate-500">Tipe</label>
                      <select required value={editingBook?.type || 'Paperback'} onChange={e => setEditingBook({...editingBook, type: e.target.value as any})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm">
                        <option value="Paperback" className="bg-slate-900">Paperback</option>
                        <option value="Hardcover" className="bg-slate-900">Hardcover</option>
                        <option value="E-Book" className="bg-slate-900">E-Book</option>
                      </select>
                    </div>
                    <div className="space-y-2 sm:col-span-2"><label className="text-[9px] font-black uppercase text-slate-500">Deskripsi</label><textarea required rows={4} value={editingBook?.description || ''} onChange={e => setEditingBook({...editingBook, description: e.target.value})} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm resize-none" /></div>
                </div>
            </div>
            <footer className="p-8 bg-black/20 flex justify-end space-x-4"><button type="submit" disabled={loading} className="px-12 py-4 bg-[#2D5A27] text-white rounded-2xl font-black uppercase text-[10px]">
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} className="inline mr-2" />}
              {editingBook?.id ? 'Simpan Perubahan' : 'Tambah Buku'}
            </button></footer>
          </form>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <form onSubmit={handleSaveCategory} className="bg-slate-900 w-full max-w-md rounded-[3rem] border border-white/10 overflow-hidden animate-in zoom-in duration-300">
            <header className="p-8 bg-white/5 flex justify-between items-center border-b border-white/5">
                <h3 className="text-xl font-black uppercase tracking-widest">{editingCategory ? 'Edit Kategori' : 'Kategori Baru'}</h3>
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
            </header>
            <div className="p-10 space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Kategori</label>
                  <input required type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="w-full bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#2D5A27]" placeholder="Contoh: Literasi Digital" />
                </div>
            </div>
            <footer className="p-8 bg-black/20 flex justify-end space-x-4">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-8 py-3 bg-white/5 text-slate-400 rounded-xl font-black uppercase text-[9px] tracking-widest">Batal</button>
                <button type="submit" className="px-10 py-3 bg-[#2D5A27] text-white rounded-xl font-black uppercase text-[9px] tracking-widest">Simpan</button>
            </footer>
          </form>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <div className="bg-slate-900 w-full max-w-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                <header className="p-8 bg-white/5 flex justify-between items-center border-b border-white/5">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-widest">Detail Pesanan</h3>
                        <p className="text-[10px] font-bold text-slate-500">ID: {selectedOrder.id}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
                </header>
                <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-slate-500"><User size={14} /><span className="text-[9px] font-black uppercase">Penerima</span></div>
                            <p className="font-black text-white uppercase">{selectedOrder.customer_name}</p>
                            <p className="text-emerald-400 font-bold text-xs">{selectedOrder.customer_whatsapp}</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-slate-500"><MapPin size={14} /><span className="text-[9px] font-black uppercase">Alamat</span></div>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{selectedOrder.address}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Item Belanja</h4>
                        <div className="space-y-3">
                            {selectedOrder.order_items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-400"><ShoppingBag size={20} /></div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase">{item.books?.title || 'Produk Ganesa'}</p>
                                            <p className="text-[9px] text-slate-500 font-bold">{item.quantity} Unit</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-emerald-400 text-sm">Rp{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="p-8 bg-black/20 text-center">
                    <button onClick={() => setSelectedOrder(null)} className="px-12 py-4 bg-[#2D5A27] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-800 transition-all">Tutup</button>
                </footer>
            </div>
        </div>
      )}
    </div>
  );
};

export default CMS;
