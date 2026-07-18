"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Shell from "@/components/Shell";
import { supabase } from "@/lib/supabase";

const STATUS_STYLE = {
  submitted: "bg-surface2 text-ink2", documents: "bg-gold-soft text-gold",
  review: "bg-brand-soft text-brand", biometrics: "bg-royal/10 text-royal",
  decision: "bg-gold-soft text-gold", collected: "bg-brand-soft text-brand-dark",
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sb = supabase();
    sb.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      setUser(data.user);
      const { data: rows } = await sb.from("applications").select("*").order("created_at", { ascending: false });
      setApps(rows || []);
      setLoading(false);
    });

    // realtime: refresh when this user's applications change
    const ch = sb.channel("apps-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "applications" }, async () => {
        const { data: rows } = await sb.from("applications").select("*").order("created_at", { ascending: false });
        setApps(rows || []);
      }).subscribe();
    return () => { sb.removeChannel(ch); };
  }, [router]);

  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  return (
    <Shell>
      <section className="px-5 md:px-7 py-[60px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-2">Dashboard</div>
          <h1 className="font-display text-[clamp(24px,4vw,38px)] font-extrabold mb-1">Welcome back, {name} 👋</h1>
          <p className="text-ink2 mb-8">Track your applications, appointments, and documents in one place.</p>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              ["Applications", apps.length, "text-red"],
              ["In Review", apps.filter((a) => a.status === "review").length, "text-brand"],
              ["Approved", apps.filter((a) => a.status === "collected").length, "text-gold"],
              ["Support", "24/7", "text-brand"],
            ].map(([l, n, c]) => (
              <div key={l} className="bg-surface border border-line rounded-[14px] p-5">
                <div className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide mb-1.5">{l}</div>
                <div className={`font-display text-[26px] font-extrabold ${c}`}>{n}</div>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div className="bg-surface border border-line rounded-[18px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-[15px] font-bold">Your Applications</h3>
              <Link href="/apply" className="font-display text-[12px] font-semibold px-4 py-2 rounded-[10px] bg-red text-white hover:bg-red-dark transition">+ New Application</Link>
            </div>
            {loading ? (
              <p className="py-8 text-center text-ink3">Loading…</p>
            ) : apps.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-3xl mb-3">📋</div>
                <p className="text-ink2 mb-4">You have no applications yet.</p>
                <Link href="/apply" className="inline-flex font-display text-[13px] font-semibold px-5 py-2.5 rounded-[10px] bg-brand text-white">Start your first application →</Link>
              </div>
            ) : (
              <div>
                {apps.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 py-3.5 border-b border-line last:border-0">
                    <div className="w-9 h-9 rounded-[9px] bg-brand-soft flex items-center justify-center text-[14px]">🛂</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[13px] font-bold">{a.visa_type} — {a.destination}</div>
                      <div className="font-mono text-[11px] text-ink3">{a.reference} · Step {a.current_step}/6</div>
                    </div>
                    <span className={`font-display text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[a.status] || "bg-surface2 text-ink2"}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
