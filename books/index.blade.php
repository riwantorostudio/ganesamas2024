
@extends('layouts.app')

@section('title', 'Katalog | Ganesa Mas')

@section('content')
<div class="py-12 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
            <h1 class="text-4xl font-black text-emerald-800 uppercase tracking-tight mb-4">Katalog Ganesa Mas</h1>
            <p class="text-slate-500 max-w-2xl font-medium text-lg">Temukan koleksi literasi terlengkap dan alat tulis berkualitas untuk menunjang aktivitas Anda.</p>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white p-6 rounded-3xl border border-slate-100 mb-10 flex flex-wrap gap-6 items-center shadow-sm">
            <div class="flex-grow max-w-md relative">
                <input type="text" placeholder="Cari di Ganesa Mas..." class="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-800 font-medium">
                <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"></i>
            </div>
            <select class="px-6 py-3 bg-slate-50 rounded-2xl border-none font-bold text-sm text-slate-700 focus:ring-2 focus:ring-emerald-800">
                <option>Semua Kategori</option>
                <option>Buku Sekolah</option>
                <option>Alat Tulis</option>
                <option>Buku Umum</option>
            </select>
            <select class="px-6 py-3 bg-slate-50 rounded-2xl border-none font-bold text-sm text-slate-700 focus:ring-2 focus:ring-emerald-800">
                <option>Terbaru</option>
                <option>Harga Terendah</option>
                <option>Rating Tertinggi</option>
            </select>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            @for ($i = 1; $i <= 8; $i++)
                @include('components.book-card', [
                    'id' => $i,
                    'title' => 'Produk Ganesa Unggulan ' . $i,
                    'author' => 'Tim Kreatif Ganesa',
                    'price' => '75.000',
                    'rating' => '5.0',
                    'category' => 'Premium'
                ])
            @endfor
        </div>
    </div>
</div>
@endsection
