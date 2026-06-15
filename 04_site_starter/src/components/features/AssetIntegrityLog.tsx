"use client";

import { useEffect } from "react";
import { requiredPublicAssets } from "@/lib/assetManifest";

export default function AssetIntegrityLog() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    let cancelled = false;

    const checkAssets = async () => {
      const results = await Promise.all(
        requiredPublicAssets.map(async (asset) => {
          try {
            const response = await fetch(asset, { method: "HEAD", cache: "no-store" });
            return response.ok ? null : `${asset} (${response.status})`;
          } catch (error) {
            return `${asset} (${error instanceof Error ? error.message : "request failed"})`;
          }
        }),
      );

      if (cancelled) return;

      const missing = results.filter(Boolean);
      if (missing.length > 0) {
        console.warn("[dtg asset check] Missing public assets:", missing);
        return;
      }

      console.info(`[dtg asset check] ${requiredPublicAssets.length} public assets found.`);
    };

    void checkAssets();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
