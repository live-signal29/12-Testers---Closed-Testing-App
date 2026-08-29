import React, { useEffect } from 'react';

export default function AdSlot({ slotId }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="w-full bg-slate-900/40 border border-blue-500/20 rounded-2xl p-2 flex flex-col items-center justify-center my-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Sponsored Banner</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '60px' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={slotId}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
