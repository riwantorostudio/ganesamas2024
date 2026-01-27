
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, Facebook, Instagram, Youtube, CheckCircle2 } from 'lucide-react';
import { SEO_DEFAULTS } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `Hubungi Kami | ${SEO_DEFAULTS.siteName}`;
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi integrasi Sender Email API (seperti EmailJS atau Laravel Backend API)
    try {
      // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status sukses setelah 5 detik
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#2D5A27] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F58220]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                Hubungi <span className="text-[#F58220]">Ganesa Mas</span>
            </h1>
            <p className="text-emerald-100 text-lg sm:text-xl max-w-2xl mx-auto font-medium opacity-90">
                Kami siap mendengarkan kebutuhan literasi dan perlengkapan edukasi Anda. Partner terpercaya sejak 2009.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12 sm:-translate-y-20 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact & Address Information */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Contact Information Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Informasi Kontak</h3>
                
                <div className="space-y-8">
                    <a href="mailto:info@ganesamas.co.id" className="flex items-center space-x-5 group">
                        <div className="p-4 bg-emerald-50 text-[#2D5A27] rounded-2xl group-hover:bg-[#2D5A27] group-hover:text-white transition-all shadow-sm">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Resmi</p>
                            <p className="font-bold text-slate-900 group-hover:text-[#2D5A27] transition-colors">info@ganesamas.co.id</p>
                        </div>
                    </a>

                    <a href="tel:+6281234567890" className="flex items-center space-x-5 group">
                        <div className="p-4 bg-emerald-50 text-[#2D5A27] rounded-2xl group-hover:bg-[#F58220] group-hover:text-white transition-all shadow-sm">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telepon Kantor</p>
                            <p className="font-bold text-slate-900 group-hover:text-[#2D5A27] transition-colors">(0361) 123-4567</p>
                        </div>
                    </a>

                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-5 group">
                        <div className="p-4 bg-emerald-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Support</p>
                            <p className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">+62 812-3456-7890</p>
                        </div>
                    </a>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-50 flex space-x-4 justify-center">
                    {[Facebook, Instagram, Youtube].map((Icon, i) => (
                        <button key={i} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2D5A27] hover:text-white transition-all">
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Address Information & Hours */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Lokasi & Jam Operasional</h3>
                
                <div className="space-y-6">
                    <div className="flex items-start space-x-5">
                        <div className="p-4 bg-orange-50 text-[#F58220] rounded-2xl shadow-sm mt-1">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kantor Pusat</p>
                            <p className="font-bold text-slate-900 leading-relaxed">
                                Jl. Ganesa No. 101, Pusat Literasi<br />
                                Denpasar, Bali 80234, Indonesia
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-5">
                        <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl shadow-sm mt-1">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Waktu Pelayanan</p>
                            <div className="font-bold text-slate-900 space-y-1">
                                <p>Senin - Jumat: 08.00 - 17.00</p>
                                <p>Sabtu: 09.00 - 15.00</p>
                                <p className="text-[#F58220]">Minggu: Tutup (Hanya Online)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Connected Maps (Responsive iframe) */}
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white h-[350px] relative group">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.40226490807!2d115.2285!3d-8.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23f99e3a39e97%3A0x7d65370425e361!2sDenpasar%2C%20Bali!5e0!3m2!1sid!2sid!4v1709123456789!5m2!1sid!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center">
                        <Globe size={12} className="mr-2 text-[#2D5A27]" />
                        Denpasar, Bali HQ
                    </span>
                </div>
            </div>

          </div>

          {/* Right Side: Contact Form (Simulated Email API) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-14 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50 relative sticky top-28">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F58220]/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="mb-12 relative z-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Kirim Pesan</h2>
                    <p className="text-slate-500 font-medium">Tim sales Ganesa Mas akan merespon dalam waktu maksimal 1x24 jam.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Nama Lengkap</label>
                            <input 
                                required
                                type="text" 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="E.g. Nyoman Lisnawa" 
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] transition-all text-slate-900 font-bold placeholder:font-normal"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Alamat Email</label>
                            <input 
                                required
                                type="email" 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                placeholder="email@contoh.com" 
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] transition-all text-slate-900 font-bold placeholder:font-normal"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Topik Pesan</label>
                        <select 
                            required
                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] transition-all text-slate-900 font-bold appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={e => setFormData({...formData, subject: e.target.value})}
                        >
                            <option value="">Pilih Subjek...</option>
                            <option value="pengadaan">Pengadaan Buku Sekolah</option>
                            <option value="order">Status Pesanan Katalog</option>
                            <option value="atk">Kebutuhan ATK Kantor</option>
                            <option value="kerjasama">Penawaran Kerjasama</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Detail Pesan</label>
                        <textarea 
                            required
                            rows={6}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            placeholder="Tuliskan kebutuhan atau pertanyaan Anda di sini..." 
                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#2D5A27] transition-all text-slate-900 font-bold placeholder:font-normal resize-none"
                        ></textarea>
                    </div>

                    <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className={`w-full py-5 rounded-[1.5rem] font-black text-white shadow-xl shadow-emerald-100 transition-all flex items-center justify-center space-x-3 uppercase tracking-widest text-xs ${submitted ? 'bg-green-600' : 'bg-[#2D5A27] hover:bg-emerald-900'}`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : submitted ? (
                            <>
                                <CheckCircle2 size={18} />
                                <span>Pesan Terkirim</span>
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                <span>Kirim Sekarang</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#2D5A27]">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Email API Enabled</h4>
                        <p className="text-xs text-slate-400 font-medium">Secure SSL 256-bit Encryption Active</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
