"use client";

// Status resto live dari Supabase (is_open + ready menu),
// digabung ke data lokal. Tanpa Supabase → data lokal apa adanya.

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Resto, RESTOS } from "@/lib/kuliner";

export function useLiveRestos(): { restos: Resto[]; live: boolean } {
  const [restos, setRestos] = useState<Resto[]>(RESTOS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("restos")
      .select("name, is_open, menu_items(name, ready)")
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        setRestos(
          RESTOS.map((local) => {
            const db = data.find((d) => d.name === local.name);
            if (!db) return local;
            return {
              ...local,
              isOpen: db.is_open,
              menu: local.menu.map((m) => {
                const dm = db.menu_items?.find((x) => x.name === m.name);
                return dm ? { ...m, ready: dm.ready } : m;
              }),
            };
          })
        );
        setLive(true);
      });
  }, []);

  return { restos, live };
}
