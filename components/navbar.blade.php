
<nav class="bg-white border-b border-slate-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-20">
            <!-- Ganesa Mas Logo -->
            <a href="{{ url('/') }}" class="flex items-center">
                <div class="h-10 sm:h-12 flex items-center">
                    <img src="https://i.imgur.com/e2VIuxo.png" alt="Ganesa Mas Logo" class="h-full object-contain" onerror="this.outerHTML='<div class=\'bg-emerald-800 p-2 rounded text-white font-black text-xs\'>GANESA MAS</div>'">
                </div>
            </a>

            <!-- Search Bar -->
            <div class="hidden md:flex flex-1 max-w-lg mx-8">
                <form action="{{ url('/books') }}" method="GET" class="relative w-full">
                    <input type="text" name="search" placeholder="Cari buku, alat tulis..." class="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-[#2D5A27] text-sm">
                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5"></i>
                </form>
            </div>

            <!-- Nav Links -->
            <div class="hidden lg:flex items-center space-x-8">
                <a href="{{ url('/') }}" class="text-sm font-bold text-slate-600 hover:text-[#2D5A27] transition-colors">Beranda</a>
                <a href="{{ url('/books') }}" class="text-sm font-bold text-slate-600 hover:text-[#2D5A27] transition-colors">Katalog</a>
                <a href="{{ url('/contact') }}" class="text-sm font-bold text-slate-600 hover:text-[#2D5A27] transition-colors">Kontak</a>
                <div class="flex items-center space-x-4 pl-4 border-l border-slate-200">
                    <button class="text-slate-500 hover:text-[#2D5A27] relative">
                        <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                        <span class="absolute -top-1 -right-1 bg-[#F58220] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                    </button>
                    <button class="text-slate-500 hover:text-[#2D5A27]">
                        <i data-lucide="user" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Toggle -->
            <div class="lg:hidden">
                <button class="text-slate-600">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
    </div>
</nav>