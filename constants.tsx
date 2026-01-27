
import { Book, Testimonial } from './types';

export const LOGO_URL = "https://i.imgur.com/e2VIuxo.png";

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Mengenal Diri',
    author: 'Nyoman Lisnawa',
    category: 'Literasi',
    price: 85000,
    rating: 5.0,
    // Fix: Changed cover_image to coverImage to match Book interface definition
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600',
    description: 'Buku ini merupakan kumpulan tulisan tentang pengalaman, perjalanan, dan rasa yang didapat penulis dalam proses mengenal diri.',
    publisher: 'PT. Percetakan Bali',
    // Fix: Changed published_date to publishedDate to match Book interface definition
    publishedDate: '2024',
    pages: 121,
    isbn: '978-623-0000-00-0',
    type: 'Paperback'
  },
  {
    id: '2',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    category: 'Self-Help',
    price: 98000,
    rating: 4.9,
    // Fix: Changed cover_image to coverImage to match Book interface definition
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600',
    description: 'Sebuah buku yang memperkenalkan Stoisisme kepada pembaca Indonesia.',
    publisher: 'Kompas Penerbit Buku',
    // Fix: Changed published_date to publishedDate to match Book interface definition
    publishedDate: '2019',
    pages: 320,
    isbn: '978-602-412-518-9',
    type: 'Paperback'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Budi Santoso',
    role: 'Pustakawan',
    content: 'Ganesa Mas selalu menyediakan koleksi buku terlengkap dengan pelayanan yang sangat ramah.',
    avatar: 'https://i.pravatar.cc/150?u=budi'
  }
];

export const SEO_DEFAULTS = {
  title: 'Ganesa Mas - Pusat Buku & Alat Tulis Premium',
  description: 'Temukan koleksi buku dan perlengkapan sekolah terlengkap di Ganesa Mas.',
  siteName: 'Ganesa Mas'
};
