"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import { FEATURES, FEATURE_CATEGORIES } from "@/lib/features";

export default function FeaturesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const cats = ["All", ...FEATURE_CATEGORIES];
  const filtered = useMemo(() => FEATURES.filter((f) => {
    const mc = cat === "All" || f.cat === cat;
    const mq = !q || f.name.toLowerCase().includes(q.toLowerCase()) || f.desc.toLowerCase().includes(q.toLowerCase());
    return mc && mq;
  }), [q, cat]);

  return (
    <Shell>
      <section className="px-5 md:px-7 py-[60px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-3">All Features</div>
          <h1 className="font-display text-[clamp(26px,4vw,42px)] font-extrabold leading-tight mb-3.5">
            Explore everything FIA Europe Hire offers
          </h1>
          <p className="text-[16px] text-ink2 max-w-[600px] leading-relaxed">
            From visa processing to accounting, residency, and relocation — every service in one platform, organized by category.
          </p>

          {/* Search + filters */}
          <div className="mt-8 mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="🔍 Search features..."
              className="w-full md:max-w-md px-4 py-3 border-[1.5px] border-line rounded-xl text-[14px] bg-surface outline-none focus:border-brand transition"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`font-display text-[12px] font-semibold px-4 py-1.5 rounded-full border-[1.5px] transition ${cat === c ? "bg-ink text-white border-ink" : "border-line text-ink2 hover:border-ink"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="font-display text-[12px] text-ink3 text-right mb-2">
            {filtered.length} out of {FEATURES.length}
          </div>

          {/* Feature rows */}
          <div className="border-t border-line">
            {filtered.map((f, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] md:items-center gap-3 md:gap-6 py-[18px] px-1 border-b border-line hover:bg-surface transition">
                <div className="min-w-0">
                  <h4 className="font-display text-[17px] font-medium text-ink leading-snug">{f.name}</h4>
                  <p className="text-[13px] text-ink2 leading-snug mt-0.5">{f.desc}</p>
                </div>
                <span className="justify-self-start md:justify-self-center font-display text-[12px] text-ink2 bg-surface2 px-3 py-1.5 rounded-md whitespace-nowrap">
                  {f.cat}
                </span>
                <Link
                  href="/#contact"
                  className="justify-self-start md:justify-self-end inline-flex items-center gap-2 bg-ink text-white rounded-full px-5 py-2.5 font-display text-[12px] font-semibold hover:bg-black transition group"
                >
                  Help center
                  <span className="transition-transform group-hover:translate-x-0.5">›</span>
                </Link>
              </div>
            ))}
            {!filtered.length && (
              <p className="py-12 text-center text-ink3">No features match your search.</p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-red-soft rounded-[20px] p-10">
            <h2 className="font-display text-[24px] font-extrabold mb-2">Not sure which service you need?</h2>
            <p className="text-ink2 mb-6">Book a free consultation and we'll map out the right path for you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/apply" className="font-display font-semibold text-[14px] px-6 py-3 rounded-xl bg-red text-white hover:bg-red-dark transition">Apply Now</Link>
              <a href="https://wa.me/358413114204" target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-[14px] px-6 py-3 rounded-xl border-2 border-line text-ink2 hover:border-brand hover:text-brand transition">💬 WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
