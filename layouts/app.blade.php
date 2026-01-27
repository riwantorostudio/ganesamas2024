
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Ganesa Mas - Katalog Buku Premium')</title>
    
    <meta name="description" content="@yield('meta_description', 'Jelajahi koleksi buku lengkap di Ganesa Mas.')">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            -webkit-user-select: none;
            user-select: none;
        }
        input, textarea {
            user-select: text;
        }
        /* Custom Brand Colors based on Logo */
        .text-ganesa-green { color: #2D5A27; }
        .bg-ganesa-green { background-color: #2D5A27; }
        .text-ganesa-orange { color: #F58220; }
        .bg-ganesa-orange { background-color: #F58220; }
        .border-ganesa-orange { border-color: #F58220; }
    </style>
    @stack('styles')
</head>
<body class="bg-slate-50 text-slate-900 flex flex-col min-h-screen">
    
    @include('components.navbar')

    <main class="flex-grow">
        @yield('content')
    </main>

    @include('components.footer')

    <!-- WhatsApp CTA in Ganesa Orange -->
    <a href="https://wa.me/1234567890" target="_blank" class="fixed bottom-6 right-6 bg-[#F58220] text-white p-4 rounded-full shadow-2xl hover:bg-[#e0761d] transition-all z-50 group">
        <div class="flex items-center space-x-2">
            <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold">Hubungi Ganesa Mas</span>
            <i data-lucide="message-circle" class="w-6 h-6"></i>
        </div>
    </a>

    <script>
        lucide.createIcons();
        document.addEventListener('contextmenu', e => e.preventDefault());
    </script>
    @stack('scripts')
</body>
</html>
