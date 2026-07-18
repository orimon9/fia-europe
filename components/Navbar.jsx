"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ─── Icon set (inline SVG, brand-colored) ─── */
const Ic = {
  permit: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/></svg>,
  student: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/></svg>,
  gold: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M12 2l3 6 6 .5-4.5 4 1.5 6L12 15l-6 3.5 1.5-6L3 8.5 9 8z"/></svg>,
  biz: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  chart: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>,
  home: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M3 21V9l9-6 9 6v12M9 21v-7h6v7"/></svg>,
  legal: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M12 3v18M5 8h14M7 8l-3 7a4 4 0 008 0zM17 8l-3 7a4 4 0 008 0z"/></svg>,
  grid: (c) => <svg viewBox="0 0 24 24" fill={c}><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>,
  person: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  family: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 1.5-3.5 4-3.5"/></svg>,
  check: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>,
  passport: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M3 8l9-5 9 5"/><path d="M3 8v8l9 5 9-5V8"/></svg>,
  trend: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/></svg>,
  book: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M2 5h8a3 3 0 013 3v11a2.5 2.5 0 00-2.5-2.5H2zM22 5h-8a3 3 0 00-3 3v11a2.5 2.5 0 012.5-2.5H22z"/></svg>,
  cal: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  info: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>,
  msg: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M3 5h18v12H7l-4 4z"/></svg>,
  shield: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  star: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M12 2l2.5 7H22l-6 4.5 2.3 7L12 16l-6.3 4.5L8 13.5 2 9h7.5z"/></svg>,
  smile: (c) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>,
};

const RED = "#e8503a", GREEN = "#1a6b3a", TEAL = "#16a8a0", ROYAL = "#3b6fd4", VIOLET = "#8b5cf6";

/* ─── Mega menu data ─── */
const MENUS = {
  Services: {
    cols: [
      { title: "Visa Services", items: [
        { ic: Ic.permit(RED), h: "Work Permit Visa", p: "EU work authorization & employer liaison", href: "/services#work" },
        { ic: Ic.student(RED), h: "Student Visa", p: "University placement & study permits", href: "/services#student" },
        { ic: Ic.gold(RED), h: "Golden Visa", p: "Romania investment residency pathway", href: "/services#golden" },
        { ic: Ic.biz(RED), h: "Business Visa", p: "For entrepreneurs & investors", href: "/services#business" },
      ]},
      { title: "Beyond Visas", items: [
        { ic: Ic.chart(RED), h: "Accounting & Finance", p: "EU tax, payroll & bookkeeping", href: "/services#accounting" },
        { ic: Ic.home(RED), h: "Real Estate Investment", p: "Property buy, sell & management", href: "/services#realestate" },
        { ic: Ic.legal(RED), h: "Legal Aid & TRC", p: "Lawyers, residency & PR services", href: "/services#legal" },
        { ic: Ic.grid(RED), h: "All Features", p: "Explore every service FIA Europe offers", href: "/features" },
      ]},
    ],
  },
  Solutions: {
    cols: [
      { title: "Solutions", items: [
        { ic: Ic.person(TEAL), h: "For Individuals", p: "Start your move to Europe solo", href: "/apply" },
        { ic: Ic.family(TEAL), h: "For Families", p: "Family reunification & relocation", href: "/apply" },
        { ic: Ic.home(TEAL), h: "For Investors", p: "Golden Visa & property investment", href: "/services#golden" },
        { ic: Ic.student(TEAL), h: "For Students", p: "Study abroad & scholarship support", href: "/services#student" },
      ]},
      { title: "By Profile", items: [
        { ic: Ic.person(ROYAL), h: "Workers", p: "Job placement & work permits", href: "/apply" },
        { ic: Ic.biz(ROYAL), h: "Entrepreneurs", p: "Company formation & business visas", href: "/services#business" },
        { ic: Ic.home(ROYAL), h: "Property Buyers", p: "Real estate & investment residency", href: "/services#realestate" },
      ]},
      { title: "Use Cases", items: [
        { ic: Ic.check(VIOLET), h: "Relocation", p: "Complete move-to-Europe support", href: "/services" },
        { ic: Ic.passport(VIOLET), h: "PR & Citizenship", p: "Permanent residency pathways", href: "/services#legal" },
        { ic: Ic.trend(VIOLET), h: "Investment Migration", p: "Citizenship by investment", href: "/services#golden" },
      ]},
    ],
  },
  Resources: {
    cols: [
      { title: "Resources", items: [
        { ic: Ic.book(VIOLET), h: "Content Hub", p: "Guides, articles & immigration news", href: "/#resources" },
        { ic: Ic.cal(VIOLET), h: "Events & Webinars", p: "Join our live information sessions", href: "/#resources" },
        { ic: Ic.info(VIOLET), h: "Knowledge Base", p: "Help center & FAQs", href: "/track" },
      ]},
    ],
    cert: true,
  },
  Company: {
    cols: [
      { title: "FIA Europe", items: [
        { ic: Ic.home(RED), h: "About Us", p: "Who we are and our mission", href: "/#about" },
        { ic: Ic.msg(RED), h: "Contact Us", p: "Get in touch with our team", href: "/#contact" },
        { ic: Ic.biz(RED), h: "Careers", p: "Join the team building futures", href: "/#about" },
      ]},
      { title: "Why Us", items: [
        { ic: Ic.star(GREEN), h: "Why FIA Europe", p: "What sets us apart", href: "/#about" },
        { ic: Ic.shield(GREEN), h: "Trusted & Secure", p: "GDPR-compliant, EU licensed", href: "/#about" },
        { ic: Ic.person(GREEN), h: "Human-Centered Service", p: "Real people, real support 24/7", href: "/#contact" },
      ]},
      { title: "Customers", items: [
        { ic: Ic.smile(RED), h: "Success Stories", p: "12,400+ happy clients in Europe", href: "/#about" },
      ]},
    ],
  },
};

export default function Navbar({ user }) {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mmGroup, setMmGroup] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const logout = async () => {
    await supabase().auth.signOut();
    router.refresh();
    router.push("/login");
  };

  const initials = (user?.user_metadata?.full_name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <>
      <nav className="fixed top-0 inset-x-0 h-[72px] bg-bg/90 backdrop-blur-md border-b border-line z-[1000] flex items-center px-5 md:px-7">
        <div className="max-w-[1280px] mx-auto w-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(null)}>
            <img src="/logo.png" alt="FIA Europe Network" className="w-[42px] h-[42px] rounded-[11px] object-cover" />
            <div className="font-display font-extrabold text-[18px] leading-none tracking-tight">
              FIA Europe
              <span className="block font-light text-[9px] text-ink3 tracking-wider mt-[3px]">NETWORK</span>
            </div>
          </Link>

          {/* Desktop center menu */}
          <div className="hidden lg:flex items-center gap-1.5 mx-auto" onMouseLeave={() => setOpen(null)}>
            {Object.keys(MENUS).map((key) => (
              <div key={key} className="relative" onMouseEnter={() => setOpen(key)}>
                <button
                  className={`flex items-center gap-1.5 font-display text-[14px] font-semibold px-3.5 py-2.5 rounded-lg transition ${open === key ? "text-red" : "text-ink hover:text-red"}`}
                >
                  {key}
                  <span className={`text-[10px] transition-transform ${open === key ? "rotate-180" : ""}`}>▾</span>
                </button>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto lg:ml-0">
            <Link href="/track" className="hidden md:inline-flex font-display text-[13px] font-semibold px-4 py-2 rounded-[10px] border border-line text-ink2 hover:border-brand hover:text-brand transition">Track Visa</Link>
            <Link href="/apply" className="hidden sm:inline-flex font-display text-[13px] font-semibold px-[18px] py-2 rounded-[10px] bg-red text-white hover:bg-red-dark transition">Apply Now</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="hidden md:flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-brand-soft rounded-full">
                  <span className="w-[30px] h-[30px] rounded-full bg-brand text-white flex items-center justify-center text-[13px] font-bold font-display">{initials}</span>
                  <span className="font-display text-[12px] font-semibold text-brand leading-tight">
                    {(user.user_metadata?.full_name || user.email.split("@")[0])}
                    <small className="block text-[9px] text-ink3">Applicant</small>
                  </span>
                </Link>
                <button onClick={logout} title="Logout" className="bg-surface2 border border-line rounded-[9px] px-2.5 py-1.5 text-[13px] hover:bg-line transition">⏻</button>
              </>
            ) : (
              <Link href="/login" className="hidden md:inline-flex font-display text-[13px] font-semibold px-4 py-2 rounded-[10px] bg-brand text-white hover:bg-brand-dark transition">Sign In</Link>
            )}
            {/* Hamburger */}
            <button className="lg:hidden flex flex-col gap-[5px] p-1.5" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
              <span className="block w-6 h-0.5 bg-ink rounded" />
              <span className="block w-6 h-0.5 bg-ink rounded" />
              <span className="block w-6 h-0.5 bg-ink rounded" />
            </button>
          </div>
        </div>
      </nav>

      {/* MEGA PANELS (desktop) */}
      {open && (
        <div
          className="hidden lg:block fixed top-[72px] inset-x-0 bg-surface border-b border-line shadow-lift z-[999] px-7 py-9 animate-megaIn"
          onMouseEnter={() => setOpen(open)}
          onMouseLeave={() => setOpen(null)}
        >
          <div className={`max-w-[1280px] mx-auto grid gap-12 ${MENUS[open].cols.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {MENUS[open].cols.map((col, i) => (
              <div key={i}>
                <div className="font-display text-[13px] font-extrabold mb-[18px]">{col.title}</div>
                {col.items.map((it, j) => (
                  <Link key={j} href={it.href} onClick={() => setOpen(null)} className="flex items-start gap-3.5 p-2.5 -mx-2.5 mb-1 rounded-[11px] hover:bg-surface2 transition group">
                    <span className="w-[30px] h-[30px] shrink-0 [&>svg]:w-6 [&>svg]:h-6">{it.ic}</span>
                    <span>
                      <span className="block font-display text-[15px] font-bold">{it.h}</span>
                      <span className="block text-[13px] text-ink2 leading-snug">{it.p}</span>
                    </span>
                  </Link>
                ))}
              </div>
            ))}
            {MENUS[open].cert && (
              <div>
                <div className="font-display text-[13px] font-extrabold mb-[18px]">EU Licensed & Certified</div>
                <div className="flex items-center gap-[18px]">
                  <div className="w-[90px] h-[90px] border-[3px] border-royal rounded-full flex flex-col items-center justify-center text-center shrink-0">
                    <small className="text-[8px] font-bold text-royal leading-tight">EU LICENSED</small>
                    <small className="text-[11px] text-royal mt-0.5">✓</small>
                    <small className="text-[8px] text-royal mt-0.5">IMMIGRATION</small>
                  </div>
                  <div>
                    <div className="font-display text-[26px] font-extrabold text-royal tracking-tight">GDPR</div>
                    <p className="text-[13px] text-ink2 mt-1">Fully compliant data handling & privacy protection across all EU operations.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-[72px] inset-x-0 bottom-0 bg-surface z-[1001] p-5 overflow-y-auto">
          {Object.entries(MENUS).map(([key, menu]) => (
            <div key={key} className="border-b border-line">
              <button className="w-full flex items-center justify-between py-4 font-display text-[16px] font-bold" onClick={() => setMmGroup(mmGroup === key ? null : key)}>
                {key} <span className={`text-red transition-transform ${mmGroup === key ? "rotate-180" : ""}`}>▾</span>
              </button>
              {mmGroup === key && (
                <div className="pb-4">
                  {menu.cols.flatMap((c) => c.items).map((it, j) => (
                    <Link key={j} href={it.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2.5 text-[14px] text-ink2">
                      <span className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5">{it.ic}</span>
                      <strong className="font-display font-semibold text-ink">{it.h}</strong>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2.5 mt-5">
            <Link href="/track" onClick={() => setMobileOpen(false)} className="text-center font-display font-semibold py-3 rounded-[10px] border border-line">Track Visa</Link>
            <Link href="/apply" onClick={() => setMobileOpen(false)} className="text-center font-display font-semibold py-3 rounded-[10px] bg-red text-white">Apply Now</Link>
            {user
              ? <button onClick={logout} className="font-display font-semibold py-3 rounded-[10px] border border-line">⏻ Logout</button>
              : <Link href="/login" onClick={() => setMobileOpen(false)} className="text-center font-display font-semibold py-3 rounded-[10px] bg-brand text-white">Sign In</Link>}
          </div>
        </div>
      )}
    </>
  );
}
