"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [sign, setSign] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState({});

  const pwStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strColor = ["", "#e05555", "#e8b84b", "#4caf88", "#1a9e5c"];
  const strLabel = ["", "Weak", "Fair", "Good", "Strong"];

  async function doLogin() {
    const e = {};
    if (!/\S+@\S+\.\S+/.test(login.email)) e.email = "Invalid email";
    if (login.password.length < 6) e.password = "Min 6 characters";
    setErr(e); if (Object.keys(e).length) return;
    setLoading(true); setMsg(null);
    const { error } = await supabase().auth.signInWithPassword({ email: login.email, password: login.password });
    setLoading(false);
    if (error) { setMsg({ type: "error", text: error.message }); return; }
    router.push("/dashboard");
    router.refresh();
  }

  async function doSignup() {
    const e = {};
    if (!sign.name.trim()) e.name = "Name required";
    if (!/\S+@\S+\.\S+/.test(sign.email)) e.email = "Invalid email";
    if (sign.password.length < 8) e.password = "Min 8 characters";
    if (sign.password !== sign.confirm) e.confirm = "Passwords do not match";
    setErr(e); if (Object.keys(e).length) return;
    setLoading(true); setMsg(null);
    const { error } = await supabase().auth.signUp({
      email: sign.email,
      password: sign.password,
      options: { data: { full_name: sign.name } },
    });
    setLoading(false);
    if (error) { setMsg({ type: "error", text: error.message }); return; }
    setMsg({ type: "success", text: "Account created! Check your email to confirm, then sign in." });
    setTab("login");
  }

  const field = (label, value, onChange, type = "text", key, placeholder, eye) => (
    <div className="mb-3.5">
      <label className="block font-ui text-[10px] font-bold tracking-wider uppercase text-white/45 mb-1.5">{label}</label>
      <div className="relative">
        <input type={eye ? (show ? "text" : "password") : type} value={value} onChange={onChange} placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 bg-white/5 border-[1.5px] rounded-[11px] text-white text-[13px] outline-none transition font-ui ${err[key] ? "border-red" : "border-gold/25 focus:border-gold/70"}`} />
        {eye && <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 text-[15px]">{show ? "🙈" : "👁"}</button>}
      </div>
      {err[key] && <div className="text-[10px] text-[#ff8070] mt-1">⚠ {err[key]}</div>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: "#0f1a12" }}>
      {/* bg orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 15% 10%,rgba(26,107,58,.28) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 85% 90%,rgba(200,148,42,.16) 0%,transparent 60%)" }} />
      <div className="absolute w-[360px] h-[360px] rounded-full blur-[60px] animate-float" style={{ background: "rgba(26,107,58,.13)", top: "8%", left: "5%" }} />
      <div className="absolute w-[220px] h-[220px] rounded-full blur-[60px] animate-float" style={{ background: "rgba(200,148,42,.09)", top: "60%", left: "75%" }} />

      <div className="relative z-10 w-full max-w-[420px] bg-white/5 border border-gold/20 rounded-[22px] backdrop-blur-2xl shadow-2xl overflow-hidden animate-fadeUp">
        {/* Brand */}
        <div className="flex items-center gap-3 px-7 pt-7">
          <img src="/logo.png" alt="FIA" className="w-12 h-12 rounded-[13px] object-cover" />
          <div>
            <div className="font-ui font-extrabold text-white text-[15px] leading-tight">FIA Europe Network</div>
            <div className="text-[10px] text-gold/80">Immigration · Golden Visa · Real Estate</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gold/15 mt-5">
          {["login", "signup"].map((t) => (
            <button key={t} onClick={() => { setTab(t); setErr({}); setMsg(null); }}
              className={`flex-1 py-4 font-ui font-bold text-[13px] transition border-b-2 ${tab === t ? "text-gold border-gold" : "text-white/30 border-transparent"}`}>
              {t === "login" ? "🔑 Sign In" : "✨ Create Account"}
            </button>
          ))}
        </div>

        <div className="p-7">
          {msg && (
            <div className={`mb-4 text-[12px] px-3.5 py-2.5 rounded-[10px] ${msg.type === "error" ? "bg-red/15 text-[#ff8070]" : "bg-brand/20 text-[#7fe0a8]"}`}>{msg.text}</div>
          )}

          {tab === "login" ? (
            <>
              <div className="font-ui text-[21px] font-extrabold text-white mb-1">Welcome back</div>
              <div className="text-[13px] text-white/40 mb-5">Sign in to your FIA account</div>
              {field("Email Address", login.email, (e) => setLogin({ ...login, email: e.target.value }), "email", "email", "you@example.com")}
              {field("Password", login.password, (e) => setLogin({ ...login, password: e.target.value }), "password", "password", "••••••••", true)}
              <button disabled={loading} onClick={doLogin}
                className="w-full mt-1 py-3.5 rounded-xl font-ui font-extrabold text-[14px] text-white flex items-center justify-center gap-2 transition disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#1a6b3a,#c8942a)" }}>
                {loading ? "Signing in…" : "→ Sign In to Dashboard"}
              </button>
              <div className="text-center mt-4 text-[12px] text-white/30 font-ui">
                No account? <button onClick={() => setTab("signup")} className="text-gold font-bold">Create one →</button>
              </div>
            </>
          ) : (
            <>
              <div className="font-ui text-[21px] font-extrabold text-white mb-1">Start your journey</div>
              <div className="text-[13px] text-white/40 mb-5">Create your free FIA Europe account</div>
              {field("Full Name", sign.name, (e) => setSign({ ...sign, name: e.target.value }), "text", "name", "John Smith")}
              {field("Email Address", sign.email, (e) => setSign({ ...sign, email: e.target.value }), "email", "email", "you@example.com")}
              {field("Password", sign.password, (e) => setSign({ ...sign, password: e.target.value }), "password", "password", "Min 8 characters", true)}
              {sign.password && (
                <div className="mb-3.5 -mt-1.5">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex-1 h-[3px] rounded" style={{ background: i <= pwStrength(sign.password) ? strColor[pwStrength(sign.password)] : "rgba(255,255,255,.1)" }} />
                    ))}
                  </div>
                  <div className="text-[10px] font-bold" style={{ color: strColor[pwStrength(sign.password)] }}>{strLabel[pwStrength(sign.password)]}</div>
                </div>
              )}
              {field("Confirm Password", sign.confirm, (e) => setSign({ ...sign, confirm: e.target.value }), "password", "confirm", "Repeat password", true)}
              <button disabled={loading} onClick={doSignup}
                className="w-full mt-1.5 py-3.5 rounded-xl font-ui font-extrabold text-[14px] text-white flex items-center justify-center gap-2 transition disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#1a6b3a,#c8942a)" }}>
                {loading ? "Creating account…" : "✨ Create My Account"}
              </button>
              <div className="text-center mt-4 text-[12px] text-white/30 font-ui">
                Have an account? <button onClick={() => setTab("login")} className="text-gold font-bold">Sign in →</button>
              </div>
            </>
          )}

          <div className="text-center mt-5">
            <Link href="/" className="text-[12px] text-white/35 hover:text-white/60 font-ui">← Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
