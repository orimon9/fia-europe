import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-5 md:px-7 pt-14 pb-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-11">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="FIA" className="w-[38px] h-[38px] rounded-[9px] object-cover" />
              <div className="font-display font-extrabold text-[16px] leading-none">
                FIA Europe<span className="block font-light text-[9px] text-white/35 tracking-wider mt-[3px]">NETWORK</span>
              </div>
            </Link>
            <p className="text-[12px] text-white/45 mt-3.5 leading-relaxed max-w-[270px]">
              Your trusted partner for EU immigration, Golden Visa, accounting, and real estate. Licensed &amp; GDPR compliant.
            </p>
          </div>
          <div>
            <h5 className="font-display text-[11px] font-bold uppercase tracking-widest text-white/35 mb-3">Services</h5>
            {["Work Permit Visa", "Student Visa", "Golden Visa", "Accounting", "All Features"].map((x) => (
              <Link key={x} href={x === "All Features" ? "/features" : "/services"} className="block text-[12px] text-white/60 hover:text-white mb-2 transition">{x}</Link>
            ))}
          </div>
          <div>
            <h5 className="font-display text-[11px] font-bold uppercase tracking-widest text-white/35 mb-3">Company</h5>
            <Link href="/#about" className="block text-[12px] text-white/60 hover:text-white mb-2 transition">About Us</Link>
            <Link href="/#contact" className="block text-[12px] text-white/60 hover:text-white mb-2 transition">Contact</Link>
            <Link href="/apply" className="block text-[12px] text-white/60 hover:text-white mb-2 transition">Apply Now</Link>
            <Link href="/track" className="block text-[12px] text-white/60 hover:text-white mb-2 transition">Track Visa</Link>
          </div>
          <div>
            <h5 className="font-display text-[11px] font-bold uppercase tracking-widest text-white/35 mb-3">Connect</h5>
            <a href="https://www.facebook.com/fiaglobalnetwork/" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-white/60 hover:text-white mb-2">📘 Facebook</a>
            <a href="https://www.youtube.com/@fia_global" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-white/60 hover:text-white mb-2">▶️ YouTube</a>
            <a href="https://www.tiktok.com/@fiaglobal.fi" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-white/60 hover:text-white mb-2">🎵 TikTok</a>
            <a href="https://t.me/fia_network" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-white/60 hover:text-white mb-2">✈️ Telegram</a>
            <a href="https://wa.me/358413114204" target="_blank" rel="noopener noreferrer" className="block text-[12px] text-white/60 hover:text-white mb-2">💬 WhatsApp</a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-wrap items-center justify-between gap-2.5">
          <p className="text-[11px] text-white/30">© 2026 FIA Europe Network SRL. EU Licensed. Registered in Romania.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[11px] text-white/30 hover:text-white/65">Privacy</a>
            <a href="#" className="text-[11px] text-white/30 hover:text-white/65">Terms</a>
            <a href="#" className="text-[11px] text-white/30 hover:text-white/65">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
