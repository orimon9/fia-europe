const SOCIALS = [
  { href: "https://www.facebook.com/fiaglobalnetwork/", label: "📘 Facebook" },
  { href: "https://www.youtube.com/@fia_global", label: "▶️ YouTube" },
  { href: "https://www.tiktok.com/@fiaglobal.fi", label: "🎵 TikTok" },
  { href: "https://t.me/fia_network", label: "✈️ Telegram" },
  { href: "https://wa.me/358413114204", label: "💬 +358 41 311 4204" },
];

export default function SocialBar() {
  return (
    <div className="bg-ink h-[34px] flex items-center px-5 md:px-7 sticky top-[72px] z-[998]">
      <div className="max-w-[1280px] mx-auto w-full flex items-center">
        <span className="font-display text-[9px] font-bold text-white/30 uppercase tracking-widest mr-2 shrink-0">Follow:</span>
        <div className="flex items-center gap-0.5 overflow-x-auto flex-1 [&::-webkit-scrollbar]:hidden">
          {SOCIALS.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              className="font-display text-[10px] font-semibold text-white/50 hover:text-white hover:bg-white/10 px-2.5 py-[3px] rounded-md whitespace-nowrap shrink-0 transition">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
