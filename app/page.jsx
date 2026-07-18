import Shell from "@/components/Shell";
import Link from "next/link";

const SERVICES = [
  { ic: "🛂", bg: "bg-red-soft", h: "Work Permit Visa", p: "Full EU work authorization, employer liaison, document support.", tags: ["Romania", "Fast Track"] },
  { ic: "🎓", bg: "bg-brand-soft", h: "Student Visa", p: "University placement, student visa processing, scholarships.", tags: ["All Universities"] },
  { ic: "🏡", bg: "bg-gold-soft", h: "Golden Visa", p: "Romania Golden Visa, property investment, residency pathway.", tags: ["Investment"] },
  { ic: "📊", bg: "bg-red-soft", h: "Accounting & Finance", p: "Company accounting, payroll, tax compliance in EU.", tags: ["Tax", "Payroll"] },
  { ic: "⚖️", bg: "bg-brand-soft", h: "Legal Aid", p: "Immigration lawyers, TRC extension, PR services.", tags: ["Legal", "PR"] },
  { ic: "🏘️", bg: "bg-gold-soft", h: "Real Estate", p: "Property search, buy/sell, investment guidance.", tags: ["Property"] },
];

const MARQUEE = ["FIA Europe Network", "Immigration", "Golden Visa", "Accounting", "Real Estate", "Work Permit", "Student Visa", "Business Visa", "Family Reunification", "TRC Extension", "PR & Citizenship", "Legal Aid", "Airport Pickup", "Money Transfer"];

export default function Home() {
  return (
    <Shell>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 md:px-7 py-16 md:py-24"
        style={{ background: "linear-gradient(160deg,#fdfbf7,#fdece9 55%,#e4f0e9)" }}>
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center relative z-10">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-3.5 py-1.5 mb-5 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
              <span className="font-display text-[11px] font-semibold">EU Licensed Immigration Agency</span>
            </span>
            <h1 className="font-display text-[clamp(30px,5vw,56px)] font-extrabold leading-[1.06] tracking-tight mb-5">
              Your Gateway to <span className="text-red">Europe</span> Starts Here
            </h1>
            <p className="text-[17px] text-ink2 leading-relaxed mb-7 max-w-[480px]">
              End-to-end <strong>Immigration</strong>, <strong>Golden Visa</strong>, <strong>Accounting</strong>, and <strong>Real Estate Investment</strong> services across Europe — all in one trusted platform.
            </p>
            <div className="flex flex-wrap gap-3 mb-9">
              <Link href="/apply" className="font-display font-semibold text-[15px] px-7 py-3.5 rounded-xl bg-red text-white hover:bg-red-dark transition shadow-soft">Start Application</Link>
              <Link href="/track" className="font-display font-semibold text-[15px] px-7 py-3.5 rounded-xl border-2 border-line text-ink2 hover:border-brand hover:text-brand transition">Track My Visa</Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {[["12,400+", "Applications Processed"], ["98.2%", "Success Rate"], ["24/7", "Support Available"]].map(([n, l]) => (
                <div key={l}><div className="font-display text-[24px] font-extrabold">{n}</div><div className="text-[12px] text-ink3 mt-0.5">{l}</div></div>
              ))}
            </div>
          </div>
          {/* Tracker card */}
          <div className="hidden lg:block">
            <div className="bg-surface border border-line rounded-[20px] p-6 shadow-lift">
              <h3 className="font-display text-[14px] font-bold">Real-Time Application Tracking</h3>
              <p className="text-[12px] text-ink3 mb-4">Enter your application ID to track status</p>
              {[
                ["✓", "Documents Received", "Verified", "done"],
                ["✓", "Embassy Submission", "Submitted", "done"],
                ["⟳", "Under Review", "Processing...", "active"],
                ["◷", "Decision", "Awaiting", "wait"],
              ].map(([ic, h, s, st], i) => (
                <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-line last:border-0">
                  <div className={`w-[30px] h-[30px] rounded-[9px] flex items-center justify-center text-[12px] ${st === "done" ? "bg-brand-soft" : st === "active" ? "bg-brand-soft" : "bg-surface2"}`}>{ic}</div>
                  <div className="flex-1"><strong className="block font-display text-[12px]">{h}</strong><span className="text-[10px] text-ink3">{s}</span></div>
                  <span className={`font-display text-[9px] font-bold px-2 py-0.5 rounded-full ${st === "done" ? "bg-brand-soft text-brand" : st === "active" ? "bg-brand-soft text-brand" : "bg-surface2 text-ink3"}`}>
                    {st === "done" ? "Done" : st === "active" ? "Active" : "Pending"}
                  </span>
                </div>
              ))}
              <Link href="/track" className="mt-4 block text-center font-display text-[13px] font-semibold px-4 py-2.5 rounded-[10px] bg-brand text-white">Open Full Tracker →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-surface border-y border-line py-3.5 overflow-hidden">
        <div className="flex gap-10 animate-marquee w-max">
          {[...MARQUEE, ...MARQUEE].map((x, i) => (
            <span key={i} className="flex items-center gap-2 font-display text-[13px] font-semibold text-ink2 whitespace-nowrap">
              <span className="w-[5px] h-[5px] rounded-full bg-red" />{x}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="px-5 md:px-7 py-[76px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-3">What We Offer</div>
          <h2 className="font-display text-[clamp(26px,4vw,42px)] font-extrabold leading-tight mb-3.5">Complete Immigration &amp; Life Services</h2>
          <p className="text-[16px] text-ink2 max-w-[560px] leading-relaxed">From visa application to accommodation, job placement, accounting, and legal support — we handle everything.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-11">
            {SERVICES.map((s) => (
              <Link key={s.h} href="/services" className="group relative bg-surface border border-line rounded-[14px] p-6 overflow-hidden hover:-translate-y-1 hover:shadow-lift transition">
                <div className={`w-[46px] h-[46px] rounded-xl flex items-center justify-center text-[21px] mb-4 ${s.bg}`}>{s.ic}</div>
                <h3 className="font-display text-[15px] font-bold mb-1.5">{s.h}</h3>
                <p className="text-[13px] text-ink2 leading-relaxed">{s.p}</p>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {s.tags.map((t) => <span key={t} className="font-display text-[9px] font-semibold px-2.5 py-1 rounded-full bg-surface2 text-ink2">{t}</span>)}
                </div>
                <span className="absolute bottom-0 inset-x-0 h-[3px] bg-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-8"><Link href="/services" className="inline-flex font-display font-semibold text-[13px] px-5 py-2.5 rounded-[10px] bg-brand text-white hover:bg-brand-dark transition">View All Services →</Link></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-surface px-5 md:px-7 py-[76px]">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-3">About Us</div>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-extrabold leading-tight mb-3.5">Connecting People to Their European Dream</h2>
            <p className="text-[14px] text-ink2 leading-relaxed">FIA Europe Network is a licensed EU immigration and visa services agency. We help thousands navigate moving to Europe — from visa applications to full life support after arrival.</p>
            <div className="flex flex-col gap-3 mt-6">
              {[["🎯", "Our Mission", "Make European immigration transparent and stress-free"], ["🔒", "Data Security", "Encrypted, GDPR compliant"], ["🌐", "Pan-European", "Active in 15+ EU countries"]].map(([ic, h, p]) => (
                <div key={h} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-red-soft flex items-center justify-center text-[15px] shrink-0">{ic}</div>
                  <div><h4 className="font-display text-[13px] font-bold">{h}</h4><p className="text-[12px] text-ink2">{p}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-bg border border-line rounded-[18px] p-7 grid grid-cols-2 gap-5">
            {[["12K+", "Visas Processed", "text-red"], ["98%", "Success Rate", "text-brand"], ["15+", "EU Countries", "text-gold"], ["24/7", "Support", "text-brand"]].map(([n, l, c]) => (
              <div key={l}><div className={`font-display text-[28px] font-extrabold ${c}`}>{n}</div><div className="text-[11px] text-ink3">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="px-5 md:px-7 py-[76px]">
        <div className="max-w-[1280px] mx-auto text-center bg-red-soft rounded-[22px] p-12">
          <h2 className="font-display text-[clamp(22px,3vw,34px)] font-extrabold mb-3">Ready to start your European journey?</h2>
          <p className="text-ink2 mb-7 max-w-[520px] mx-auto">Book a free 30-minute consultation with our visa experts, or start your application online today.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/apply" className="font-display font-semibold text-[15px] px-7 py-3.5 rounded-xl bg-red text-white hover:bg-red-dark transition">Apply Now</Link>
            <a href="https://wa.me/358413114204" target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-[15px] px-7 py-3.5 rounded-xl border-2 border-line text-ink2 hover:border-brand hover:text-brand transition">💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
