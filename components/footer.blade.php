
<footer class="bg-white border-t border-slate-100 pt-16 pb-10 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <!-- Brand Identity -->
            <div class="space-y-6">
                <a href="{{ url('/') }}" class="flex items-center">
                    <img src="https://i.imgur.com/e2VIuxo.png" alt="Ganesa Mas Logo" class="h-12 object-contain" onerror="this.outerHTML='<span class=\'font-black text-emerald-800\'>GANESA MAS</span>'">
                </a>
                <p class="text-slate-500 text-sm leading-relaxed font-medium">Solusi terlengkap untuk kebutuhan literasi, alat tulis kantor, dan perlengkapan sekolah berkualitas di Bali sejak 2009.</p>
                <div class="flex space-x-3">
                    <a href="#" class="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all duration-300"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                    <a href="#" class="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all duration-300"><i data-lucide="instagram" class="w-4 h-4"></i></a>
                    <a href="#" class="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all duration-300"><i data-lucide="youtube" class="w-4 h-4"></i></a>
                </div>
            </div>

            <!-- Quick Navigation -->
            <div>
                <h4 class="font-black text-[#2D5A27] mb-6 text-[10px] uppercase tracking-[0.2em]">Navigasi Utama</h4>
                <ul class="space-y-4 text-sm text-slate-500 font-bold">
                    <li><a href="{{ url('/') }}" class="hover:text-[#F58220] transition-colors">Beranda</a></li>
                    <li><a href="{{ url('/books') }}" class="hover:text-[#F58220] transition-colors">Katalog Produk</a></li>
                    <li><a href="{{ url('/contact') }}" class="hover:text-[#F58220] transition-colors">Hubungi Kami</a></li>
                </ul>
            </div>

            <!-- Operating Hours -->
            <div>
                <h4 class="font-black text-[#2D5A27] mb-6 text-[10px] uppercase tracking-[0.2em]">Jam Operasional</h4>
                <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                        <i data-lucide="clock" class="w-4 h-4 text-[#F58220] mt-0.5"></i>
                        <div class="text-sm font-medium text-slate-500">
                            <p class="font-bold text-slate-900">Senin - Jumat</p>
                            <p>08.00 - 17.00 WITA</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <i data-lucide="clock" class="w-4 h-4 text-[#F58220] mt-0.5"></i>
                        <div class="text-sm font-medium text-slate-500">
                            <p class="font-bold text-slate-900">Sabtu</p>
                            <p>09.00 - 15.00 WITA</p>
                        </div>
                    </div>
                    <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mt-2">Minggu & Libur: Tutup</p>
                </div>
            </div>

            <!-- Contact Summary -->
            <div>
                <h4 class="font-black text-[#2D5A27] mb-6 text-[10px] uppercase tracking-[0.2em]">Kontak & Lokasi</h4>
                <ul class="space-y-4">
                    <li class="flex items-start space-x-3">
                        <i data-lucide="map-pin" class="w-4 h-4 text-[#F58220] mt-0.5"></i>
                        <p class="text-xs font-bold text-slate-500 leading-relaxed">Jl. Ganesa No. 101, Denpasar, Bali 80234</p>
                    </li>
                    <li class="flex items-center space-x-3">
                        <i data-lucide="phone" class="w-4 h-4 text-[#F58220]"></i>
                        <p class="text-xs font-bold text-slate-500">(0361) 123-4567</p>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] space-y-4 md:space-y-0">
            <p>&copy; {{ date('Y') }} GANESA MAS GLOBAL. ALL RIGHTS RESERVED.</p>
            <div class="flex space-x-6">
                <a href="#" class="hover:text-[#2D5A27]">Privacy Policy</a>
                <a href="#" class="hover:text-[#2D5A27]">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>