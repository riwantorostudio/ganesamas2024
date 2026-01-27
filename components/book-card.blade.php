
<div class="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <a href="{{ url('/book/' . $id) }}" class="block aspect-[3/4] overflow-hidden relative">
        <img src="{{ $customImg ?? 'https://images.unsplash.com/photo-1543003919-a995d52255c2?auto=format&fit=crop&q=80&w=400&h=600' }}" alt="{{ $title }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-3 left-3">
            <span class="px-2 py-1 bg-emerald-800 text-white text-[10px] font-black rounded uppercase tracking-widest">{{ $category }}</span>
        </div>
    </a>
    <div class="p-5">
        <div class="flex items-center space-x-1 mb-2">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i>
            <span class="text-xs font-bold text-slate-700">{{ $rating }}</span>
        </div>
        <a href="{{ url('/book/' . $id) }}">
            <h3 class="text-base font-black text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors line-clamp-1 uppercase">{{ $title }}</h3>
        </a>
        <p class="text-sm text-slate-500 mb-4 font-medium">{{ $author }}</p>
        <div class="flex items-center justify-between pt-3 border-t border-slate-50">
            <span class="text-lg font-black text-emerald-800">Rp{{ $price }}</span>
            <a href="{{ url('/book/' . $id) }}" class="p-2 bg-emerald-50 text-emerald-800 rounded-lg group-hover:bg-[#F58220] group-hover:text-white transition-all">
                <i data-lucide="shopping-bag" class="w-4.5 h-4.5"></i>
            </a>
        </div>
    </div>
</div>
