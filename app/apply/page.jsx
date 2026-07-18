"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Shell from "@/components/Shell";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    first: "", last: "", email: "", phone: "", nationality: "Bangladesh",
    visa_type: "Work Permit", destination: "Romania", notes: "",
  });
  const [status, setStatus] = useState(null); // {type, text, ref}
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase().auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) setForm((f) => ({ ...f, email: data.user.email }));
    });
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit() {
    if (!form.first || !form.email) { setStatus({ type: "error", text: "Please fill in your name and email." }); return; }
    setLoading(true); setStatus(null);

    if (!user) {
      // Not signed in → store appointment-style lead instead
      const { error } = await supabase().from("appointments").insert({
        full_name: `${form.first} ${form.last}`, email: form.email, phone: form.phone,
        service: form.visa_type, message: form.notes,
      });
      setLoading(false);
      if (error) { setStatus({ type: "error", text: error.message }); return; }
      setStatus({ type: "success", text: "Request received! Sign in to track it in your dashboard. We'll contact you within 24 hours." });
      return;
    }

    const { data, error } = await supabase().from("applications").insert({
      user_id: user.id, visa_type: form.visa_type, destination: form.destination, notes: form.notes,
    }).select().single();
    setLoading(false);
    if (error) { setStatus({ type: "error", text: error.message }); return; }
    setStatus({ type: "success", text: `Application submitted! Reference: ${data.reference}`, ref: data.reference });
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  const inp = "px-3 py-2.5 border-[1.5px] border-line rounded-[10px] text-[13px] bg-bg outline-none focus:border-brand transition";

  return (
    <Shell>
      <section className="px-5 md:px-7 py-[76px]">
        <div className="max-w-[660px] mx-auto">
          <div className="font-display text-[11px] font-bold tracking-[2px] uppercase text-red mb-3">Apply Now</div>
          <h1 className="font-display text-[clamp(26px,4vw,42px)] font-extrabold leading-tight mb-3.5">Start Your Application</h1>
          <p className="text-[15px] text-ink2 mb-8">{user ? "Your application will be saved to your dashboard." : "Fill in your details — our team will contact you within 24 hours."}</p>

          {status && (
            <div className={`mb-5 px-4 py-3 rounded-xl text-[13px] ${status.type === "error" ? "bg-red-soft text-red-dark" : "bg-brand-soft text-brand-dark"}`}>{status.text}</div>
          )}

          <div className="bg-surface border border-line rounded-[18px] p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">First Name</label><input className={inp} value={form.first} onChange={set("first")} placeholder="John" /></div>
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Last Name</label><input className={inp} value={form.last} onChange={set("last")} placeholder="Smith" /></div>
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Email</label><input className={inp} type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" /></div>
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Phone / WhatsApp</label><input className={inp} value={form.phone} onChange={set("phone")} placeholder="+358 xxx xxx xxxx" /></div>
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Nationality</label>
                <select className={inp} value={form.nationality} onChange={set("nationality")}><option>Bangladesh</option><option>Pakistan</option><option>India</option><option>Nepal</option><option>Sri Lanka</option><option>Other</option></select></div>
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Visa Type</label>
                <select className={inp} value={form.visa_type} onChange={set("visa_type")}><option>Work Permit</option><option>Student Visa</option><option>Business Visa</option><option>Golden Visa</option><option>Family Reunification</option></select></div>
              <div className="flex flex-col gap-1.5"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Destination</label>
                <select className={inp} value={form.destination} onChange={set("destination")}><option>Romania</option><option>Germany</option><option>Poland</option><option>Finland</option><option>Other EU</option></select></div>
              <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="font-display text-[10px] font-semibold text-ink3 uppercase tracking-wide">Notes</label><textarea rows={3} className={`${inp} resize-none`} value={form.notes} onChange={set("notes")} placeholder="Any specific requirements..." /></div>
            </div>
            <button disabled={loading} onClick={submit} className="w-full mt-5 py-3.5 rounded-xl font-display font-bold text-[15px] text-white bg-red hover:bg-red-dark transition disabled:opacity-60">
              {loading ? "Submitting…" : "Submit Application →"}
            </button>
            {!user && <p className="text-center text-[11px] text-ink3 mt-3"><a href="/login" className="text-brand font-semibold">Sign in</a> first to track your application in real time.</p>}
          </div>
        </div>
      </section>
    </Shell>
  );
}
