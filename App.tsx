
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Contact from './pages/Contact';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import CMSPage from './pages/CMS';
import LoginPage from './pages/Login';
import { supabase } from './lib/supabase';
import { CartItem, Book, Category } from './types';
import { BOOKS as INITIAL_BOOKS } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC<{
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  session: any;
  books: Book[];
  categories: Category[];
  isLoading: boolean;
  cart: CartItem[];
  addToCart: (b: Book) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, d: number) => void;
  clearCart: () => void;
  handleAddBook: (b: Book) => Promise<void>;
  handleUpdateBook: (b: Book) => Promise<void>;
  handleDeleteBook: (id: string) => Promise<void>;
  handleAddCategory: (n: string) => Promise<void>;
  handleUpdateCategory: (id: string, n: string) => Promise<void>;
  handleDeleteCategory: (id: string) => Promise<void>;
}> = (props) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isAdminPage && (
        <Navbar 
          searchQuery={props.searchQuery} 
          setSearchQuery={props.setSearchQuery} 
          cartCount={props.cartCount} 
          user={props.session?.user || null}
        />
      )}
      
      <main className="flex-grow">
        {props.isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D5A27]"></div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home books={props.books} addToCart={props.addToCart} />} />
            <Route path="/login" element={props.session ? <Navigate to="/admin" /> : <LoginPage />} />
            <Route path="/books" element={<BookList books={props.books} categories={props.categories} addToCart={props.addToCart} />} />
            <Route path="/book/:id" element={<BookDetail books={props.books} addToCart={props.addToCart} />} />
            <Route path="/cart" element={<CartPage cart={props.cart} removeFromCart={props.removeFromCart} updateQuantity={props.updateQuantity} />} />
            <Route path="/checkout" element={<CheckoutPage cart={props.cart} clearCart={props.clearCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/admin" 
              element={
                props.session ? (
                  <CMSPage 
                    books={props.books} 
                    categories={props.categories}
                    onAdd={props.handleAddBook} 
                    onUpdate={props.handleUpdateBook} 
                    onDelete={props.handleDeleteBook}
                    onAddCategory={props.handleAddCategory}
                    onUpdateCategory={props.handleUpdateCategory}
                    onDeleteCategory={props.handleDeleteCategory}
                    user={props.session.user}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        )}
      </main>
      
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (supabase) {
        const { data: booksData } = await supabase.from('books').select('*').order('created_at', { ascending: false });
        const { data: catData } = await supabase.from('categories').select('*').order('name', { ascending: true });
        if (booksData) setBooks(booksData);
        if (catData) setCategories(catData);
      } else {
        const savedBooks = localStorage.getItem('ganesa_books');
        setBooks(savedBooks ? JSON.parse(savedBooks) : INITIAL_BOOKS);
        setCategories([{id: '1', name: 'Literasi'}, {id: '2', name: 'Self-Help'}, {id: '3', name: 'Finance'}]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddBook = async (book: Book) => {
    if (supabase) {
      // Perbaikan: Karena kolom 'id' di database adalah TEXT PRIMARY KEY tanpa DEFAULT value,
      // kita harus meng-generate ID unik (UUID) secara manual di frontend.
      const newId = crypto.randomUUID();
      const { id, created_at, ...insertData } = book as any;
      
      // Masukkan ID yang baru di-generate ke dalam payload
      const finalPayload = { ...insertData, id: newId };
      
      const { data, error } = await supabase.from('books').insert([finalPayload]).select();
      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      if (data) setBooks(prev => [data[0], ...prev]);
    } else {
      const newBook = { ...book, id: Date.now().toString() };
      setBooks(prev => [newBook, ...prev]);
    }
  };

  const handleUpdateBook = async (book: Book) => {
    if (supabase) {
      const { id, created_at, ...updateData } = book as any;
      const { error } = await supabase.from('books').update(updateData).eq('id', id);
      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }
      setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updateData } : b));
    } else {
      setBooks(prev => prev.map(b => b.id === book.id ? book : b));
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
      setBooks(prev => prev.filter(b => b.id !== id));
    } else {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleAddCategory = async (name: string) => {
    if (supabase) {
      const { data, error } = await supabase.from('categories').insert([{ name }]).select();
      if (error) throw error;
      if (data) setCategories(prev => [...prev, data[0]]);
    }
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    if (supabase) {
      const { error } = await supabase.from('categories').update({ name }).eq('id', id);
      if (error) throw error;
      setCategories(prev => prev.map(c => c.id === id ? { ...c, name } : c));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (supabase) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        session={session}
        books={books}
        categories={categories}
        isLoading={isLoading}
        cart={cart}
        addToCart={(b) => setCart(prev => {
          const ex = prev.find(i => i.id === b.id);
          return ex ? prev.map(i => i.id === b.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...b, quantity: 1}];
        })}
        removeFromCart={(id) => setCart(cart.filter(i => i.id !== id))}
        updateQuantity={(id, d) => setCart(cart.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))}
        clearCart={() => setCart([])}
        handleAddBook={handleAddBook}
        handleUpdateBook={handleUpdateBook}
        handleDeleteBook={handleDeleteBook}
        handleAddCategory={handleAddCategory}
        handleUpdateCategory={handleUpdateCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    </HashRouter>
  );
};

export default App;
