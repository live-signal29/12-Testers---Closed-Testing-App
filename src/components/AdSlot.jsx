import React, { useEffect } from 'react';

export default function AdSlot({ slotId = '1234567890' }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log('AdSense error', e);
    }
  }, []);

  return (
    <div className="my-6 p-4 border border-dashed border-slate-700 rounded-xl bg-slate-900/50 text-center text-xs text-slate-500">
      <div className="mb-1 uppercase tracking-wider font-semibold">Advertisement</div>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
