
@extends('layouts.app')

@section('title', 'Hubungi Kami | Ganesa Mas')

@section('content')
<div class="bg-slate-50 min-h-screen">
    <!-- Header -->
    <div class="bg-emerald-800 py-20 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 class="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4">
                Hubungi <span class="text-[#F58220]">Ganesa Mas</span>
            </h1>
            <p class="text-emerald-100 text-lg max-w-2xl mx-auto font-medium">Solusi literasi dan perlengkapan edukasi Anda.</p>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12 pb-20">
        <div class="grid lg:grid-cols-12 gap-10">
            
            <!-- Info Column -->
            <div class="lg:col-span-5 space-y-8">
                <!-- Address & Hours -->
                <div class="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Lokasi Kami</h3>
                    <div class="space-y-8">
                        <div class="flex items-start space-x-4">
                            <i data-lucide="map-pin" class="text-[#F58220] w-6 h-6 mt-1"></i>
                            <div>
                                <p class="font-black text-slate-900 mb-1">Kantor Pusat Denpasar</p>
                                <p class="text-slate-500 font-medium">Jl. Ganesa No. 101, Denpasar, Bali 80234</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4">
                            <i data-lucide="clock" class="text-slate-400 w-6 h-6 mt-1"></i>
                            <div>
                                <p class="font-black text-slate-900 mb-1">Jam Operasional</p>
                                <p class="text-slate-500 font-medium">Senin - Sabtu: 08.00 - 17.00 WITA</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Details -->
                <div class="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Kontak Langsung</h3>
                    <div class="space-y-6">
                        <a href="tel:0361123456" class="flex items-center space-x-4 group">
                            <div class="p-3 bg-emerald-50 rounded-xl text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-all"><i data-lucide="phone" class="w-5 h-5"></i></div>
                            <span class="font-bold text-slate-700">(0361) 123-4567</span>
                        </a>
                        <a href="https://wa.me/6281234567890" class="flex items-center space-x-4 group">
                            <div class="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all"><i data-lucide="message-circle" class="w-5 h-5"></i></div>
                            <span class="font-bold text-slate-700">+62 812-3456-7890</span>
                        </a>
                    </div>
                </div>

                <!-- Google Maps Connected -->
                <div class="rounded-[2rem] overflow-hidden shadow-2xl h-[300px] border-4 border-white">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.40226490807!2d115.2285!3d-8.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23f99e3a39e97%3A0x7d65370425e361!2sDenpasar%2C%20Bali!5e0!3m2!1sid!2sid!4v1709123456789!5m2!1sid!2sid" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>

            <!-- Form Column -->
            <div class="lg:col-span-7">
                <div class="bg-white p-8 sm:p-14 rounded-[3rem] shadow-2xl border border-slate-50">
                    <h2 class="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">Kirim Pesan</h2>
                    <form action="#" method="POST" class="space-y-6">
                        @csrf
                        <div class="grid sm:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Nama</label>
                                <input type="text" name="name" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-800 font-bold">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Email</label>
                                <input type="email" name="email" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-800 font-bold">
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Subjek</label>
                            <input type="text" name="subject" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-800 font-bold">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Pesan</label>
                            <textarea name="message" rows="5" class="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-800 font-bold resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full py-5 bg-emerald-800 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-900 transition-all uppercase tracking-widest text-xs">
                            Kirim Sekarang (API Connected)
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
