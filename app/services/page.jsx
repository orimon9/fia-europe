"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import { supabase } from "@/lib/supabase";

// Fallback list used if Supabase isn't configured yet (so the page still demos)
const FALLBACK = [
  { name: "Work Permit Visa", description: "Full EU work authorization processing with employer liaison.", category: "Visa & Immigration", icon: "🛂" },
  { name: "Student Visa", description: "University placement assistance and student visa processing.", category: "Visa & Immigration", icon: "🎓" },
  { name: "Golden Visa", description: "Romania investment-based residency pathway.", category: "Investment", icon: "🏡" },
  { name: "Accounting & Bookkeeping", description: "EU company accounting, VAT, and financial reporting.", category: "Accounting & Finance", icon: "📊" },
  { name: "Legal Aid & Lawyers", description: "Immigration lawyers and contract specialists.", category: "Business & Legal", icon: "⚖️" },
  { name: "Real-Time Tracking", description: "Track your visa application status live.", category: "Digital Tools", icon: "📍" },
];

export default function ServicesPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase().from("services").select("*").order("sort_order");
        if (error || !data || !data.length) setRows(FALLBACK);
        else setRows(data);
      } catch {
        setRows(FALLBACK);
      }
      setLoading(false);
    })();
  }, []);

  const cats = useMemo(() => ["All", ...Array.from(new Set(rows.map((r) => r.category)))], [rows]);
  const filtered = useMemo(() => rows.filter((r) => {
    const mc = cat === "All" || r.category === cat;
    const mq = !q || r.name.toLowerCase().includes(q.toLowerCase()) || (r.description || "").toLowerCase().includes(q.toLowerCase());
    return mc && mq;
  }), [rows, q, cat]);

  return (
    <Shell>
      <section className="px-5 md:px-7 py-[76px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-3">All Services</div>
          <h1 className="font-display text-[clamp(26px,4vw,42px)] font-extrabold leading-tight mb-3.5">Everything FIA Europe Offers</h1>
          <p className="text-[16px] text-ink2 max-w-[560px] leading-relaxed">Browse our complete catalog of immigration, financial, and relocation services.</p>

          {/* Search */}
          <div className="mt-8 mb-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Search services..."
              className="w-full md:max-w-md px-4 py-3 border-[1.5px] border-line rounded-xl text-[14px] bg-surface outline-none focus:border-brand transition" />
          </div>
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mb-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`font-display text-[12px] font-semibold px-4 py-1.5 rounded-full border-[1.5px] transition ${cat === c ? "bg-ink text-white border-ink" : "border-line text-ink2 hover:border-ink"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="font-display text-[12px] text-ink3 text-right mb-3.5">
            {loading ? "Loading…" : `${filtered.length} of ${rows.length} services`}
          </div>

          {/* List */}
          <div className="border-t border-line">
            {filtered.map((f, i) => (
              <div key={i} className="flex items-center gap-5 py-[18px] px-1.5 border-b border-line hover:bg-surface transition">
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  {f.icon && <span className="text-[22px] shrink-0">{f.icon}</span>}
                  <div className="min-w-0">
                    <h4 className="font-display text-[16px] font-semibold">{f.name}</h4>
                    <p className="text-[13px] text-ink2 leading-snug">{f.description}</p>
                  </div>
                </div>
                <span className="hidden sm:inline font-display text-[11px] px-2.5 py-1 rounded-md bg-surface2 text-ink2 whitespace-nowrap shrink-0">{f.category}</span>
                <Link href="/#contact" className="bg-ink text-white rounded-full px-[18px] py-2 font-display text-[12px] font-semibold flex items-center gap-1.5 shrink-0 hover:bg-black hover:translate-x-0.5 transition">Learn more ›</Link>
              </div>
            ))}
            {!loading && !filtered.length && <p className="py-10 text-center text-ink3">No services match your search.</p>}
          </div>
        </div>
      </section>
    </Shell>
  );
}
