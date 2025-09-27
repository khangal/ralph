import { useEffect, useState } from "react";

export function Countdown({ start, end }: { start: string; end: string }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (now < startTime) {
    const diff = startTime - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    return <span className="badge badge-warning badge-sm">Starts in {d}d</span>;
  }
  if (now > endTime) {
    return <span className="badge badge-ghost badge-sm">Ended</span>;
  }
  const diff = endTime - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  return <span className="badge badge-success badge-sm">{d}d {h}h {m}m left</span>;
}

