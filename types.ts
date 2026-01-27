
export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  coverImage: string; // Sesuai SQL: "coverImage"
  description: string;
  publisher: string;
  publishedDate: string; // Sesuai SQL: "publishedDate"
  pages: number;
  isbn: string;
  type: string;
  created_at?: string;
}

export type OrderStatus = 'Pending' | 'Dibayar' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export interface OrderItem {
  id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;
  books?: Book;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_whatsapp: string;
  address: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  order_items?: OrderItem[];
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export enum PaymentMethod {
  BankTransfer = 'Bank Transfer',
  CreditCard = 'Credit Card',
  EWallet = 'E-Wallet',
  VirtualAccount = 'Virtual Account'
}
