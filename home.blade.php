
@extends('layouts.app')

@section('title', 'Beranda | Ganesa Mas - Pusat Buku & Alat Tulis')

@section('content')
<!-- Hero Section -->
<section class="relative overflow-hidden bg-slate-50 py-12 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-8">
                <div class="animate-in fade-in slide-in-from-left-8 duration-1000">
                    <img src="https://i.imgur.com/e2VIuxo.png" alt="Logo Ganesa Mas" class="h-16 sm:h-20 w-auto object-contain mb-6">
                </div>
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-bold">
                    <i data-lucide="star" class="w-3.5 h-3.5 mr-2 fill-[#F58220] text-[#F58220]"></i>
                    Koleksi Terbaru: Alat Tulis Kantor & Sekolah
                </div>
                <h1 class="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                    Cerdas Bersama <span class="text-emerald-800">Ganesa</span> <span class="text-[#F58220]">Mas</span>.
                </h1>
                <p class="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                    Temukan koleksi buku terbaik, perlengkapan kantor berkualitas, dan pelayanan prima hanya di Ganesa Mas.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="{{ url('/books') }}" class="px-8 py-4 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-100">
                        Lihat Katalog
                    </a>
                    <a href="{{ url('/contact') }}" class="px-8 py-4 bg-white text-emerald-800 border-2 border-emerald-800 rounded-xl font-bold hover:bg-emerald-50 transition-all">
                        Hubungi Kami
                    </a>
                </div>
            </div>
            <div class="relative group">
                <div class="absolute -inset-2 bg-gradient-to-r from-emerald-800 to-amber-500 rounded-2xl blur opacity-20"></div>
                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800&h=600" class="relative rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]" alt="Ganesa Mas Books">
            </div>
        </div>
    </div>
</section>

<!-- Featured Books -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
        <div>
            <h2 class="text-3xl font-black text-emerald-800 uppercase tracking-tight">Rekomendasi Utama</h2>
            <p class="text-slate-500 font-medium">Buku pilihan terbaik untuk wawasan Anda</p>
        </div>
        <a href="{{ url('/books') }}" class="text-emerald-800 font-black text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Lihat Semua</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        @php
            $sampleBooks = [
                ['id' => '1', 'title' => 'Mengenal Diri', 'img' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600'],
                ['id' => '2', 'title' => 'Filosofi Teras', 'img' => 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600'],
                ['id' => '3', 'title' => 'Atomic Habits', 'img' => 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400&h=600'],
                ['id' => '4', 'title' => 'Psychology of Money', 'img' => 'https://images.unsplash.com/photo-1592492159418-39f319320569?auto=format&fit=crop&q=80&w=400&h=600'],
            ];
        @endphp
        @foreach ($sampleBooks as $book)
            @include('components.book-card', [
                'id' => $book['id'],
                'title' => $book['title'],
                'author' => 'Penulis Ganesa',
                'price' => '85.000',
                'rating' => '4.9',
                'category' => 'Buku',
                'customImg' => $book['img']
            ])
        @endforeach
    </div>
</section>

<!-- Stats Section -->
<section class="bg-emerald-800 text-white py-20 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
        <h2 class="text-3xl sm:text-5xl font-black uppercase">Pusat Literasi Terlengkap</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                <p class="text-4xl font-black text-amber-500">15th</p>
                <p class="text-xs text-emerald-100 uppercase tracking-widest font-bold mt-2">Pengalaman</p>
            </div>
            <div class="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                <p class="text-4xl font-black text-amber-500">50k+</p>
                <p class="text-xs text-emerald-100 uppercase tracking-widest font-bold mt-2">Produk</p>
            </div>
            <div class="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                <p class="text-4xl font-black text-amber-500">100%</p>
                <p class="text-xs text-emerald-100 uppercase tracking-widest font-bold mt-2">Kepuasan</p>
            </div>
            <div class="p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                <p class="text-4xl font-black text-amber-500">24h</p>
                <p class="text-xs text-emerald-100 uppercase tracking-widest font-bold mt-2">Order Online</p>
            </div>
        </div>
    </div>
</section>
@endsection