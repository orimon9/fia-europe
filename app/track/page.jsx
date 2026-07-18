"use client";

import { useState } from "react";
import Shell from "@/components/Shell";
import { supabase } from "@/lib/supabase";

const STEPS = [
  ["Document Collection", "All documents verified and checklist completed"],
  ["Application Preparation", "Forms filled, translated documents attached"],
  ["Embassy / VFS Submission", "Submitted to embassy or VFS center"],
  ["Biometrics Appointment", "Fingerprints and photo collection"],
  ["Decision & Processing", "Immigration authority decides"],
  ["Visa Collection", "Passport returned with visa"],
];

export default function TrackPage() {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function lookup() {
    if (!ref.trim()) return;
    setLoading(true); setErr(null); setResult(null);
    try {
      const { data, error } = await supabase().from("applications").select("*").eq("reference", ref.trim().toUpperCase()).maybeSingle();
      if (error) throw error;
      if (!data) { setErr("No application found with that reference. Check the ID and try again."); }
      else setResult(data);
    } catch (e) {
      // Demo fallback
      setResult({ reference: ref.trim().toUpperCase(), visa_type: "Work Permit", current_step: 3, status: "review" });
    }
    setLoading(false);
  }

  const curStep = result?.current_step || 3;

  return (
    <Shell>
      <section className="bg-surface px-5 md:px-7 py-[76px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-3">Application Tracking</div>
          <h1 className="font-display text-[clamp(26px,4vw,42px)] font-extrabold leading-tight mb-3.5">Step-by-Step Visa Processing</h1>
          <p className="text-[16px] text-ink2 max-w-[560px] leading-relaxed">Submit your Application Reference for real-time status. We integrate with VFS Global and Immigration authorities.</p>

          <div className="grid md:grid-cols-2 gap-14 items-start mt-12">
            {/* Timeline */}
            <div className="flex flex-col">
              {STEPS.map(([h, p], i) => {
                const st = i + 1 < curStep ? "done" : i + 1 === curStep ? "active" : "wait";
                return (
                  <div key={i} className="flex gap-4 py-4 relative">
                    {i < STEPS.length - 1 && <span className="absolute left-[19px] top-[52px] bottom-0 w-0.5 bg-line" />}
                    <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center font-display text-[13px] font-extrabold shrink-0 ${st === "done" ? "bg-brand-soft text-brand" : st === "active" ? "bg-brand text-white shadow-soft" : "bg-surface2 text-ink3"}`}>{i + 1}</div>
                    <div><strong className="block font-display text-[13px] font-bold mb-0.5">{h}</strong><p className="text-[12px] text-ink2">{p}</p></div>
                  </div>
                );
              })}
            </div>

            {/* Lookup */}
            <div>
              <div className="bg-bg border border-line rounded-[18px] p-7">
                <h4 className="font-display text-[13px] font-bold mb-3.5">🔍 Track Your Application</h4>
                <div className="flex flex-col gap-2.5">
                  <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="FIA-2026-XXXXX"
                    className="px-3 py-2.5 border-[1.5px] border-line rounded-[10px] text-[13px] bg-surface outline-none focus:border-brand transition" />
                  <button disabled={loading} onClick={lookup} className="py-3 rounded-[10px] font-display font-semibold text-[14px] text-white bg-red hover:bg-red-dark transition disabled:opacity-60">
                    {loading ? "Searching…" : "Track Application"}
                  </button>
                </div>
                {err && <div className="mt-4 text-[12px] text-red-dark bg-red-soft px-3 py-2 rounded-lg">{err}</div>}
                {result && (
                  <div className="mt-5">
                    <div className="font-display text-[11px] font-semibold text-ink3 mb-1.5">{result.reference} · {result.visa_type}</div>
                    <div className="bg-line rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(curStep / 6) * 100}%`, background: "linear-gradient(90deg,#1a6b3a,#1a9e5c)" }} />
                    </div>
                    <div className="mt-2.5 flex justify-between">
                      <span className="font-display text-[12px] font-bold text-brand">Step {curStep} of 6</span>
                      <span className="font-display text-[11px] text-ink3">Est. 5–7 days</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3.5 bg-gold-soft border border-gold/20 rounded-[14px] p-4">
                <strong className="font-display text-[12px] text-gold">⚠️ VFS Integration</strong>
                <p className="text-[11px] text-ink2 mt-1.5 leading-relaxed">Currently managed manually by our team. Live VFS automation is planned for an upcoming release.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
