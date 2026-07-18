"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "./Navbar";
import SocialBar from "./SocialBar";
import Footer from "./Footer";

export default function Shell({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  /*useEffect(() => {
    const sb = supabase();
    sb.auth.getUser().then(({ data }) => { setUser(data.user); setReady(true); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []); */

  return (
    <>
      <Navbar user={user} />
      <SocialBar />
      <main className="pt-[34px]">{children}</main>
      <Footer />
    </>
  );
}
