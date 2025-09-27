"use client"


import React, { useMemo, useState, useEffect } from "react";

// DashboardUsersPage.jsx
// Layout rearranged: Selected Challenge emphasized first, Challenge List second, Users third.

function Countdown({ start, end }: {
  start: string;
  end: string;
}) {
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
    return <span className="text-xs text-orange-600">Starts in {d}d</span>;
  }
  if (now > endTime) {
    return <span className="text-xs text-slate-500">Ended</span>;
  }
  const diff = endTime - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  return (
    <span className="text-xs text-emerald-600">{d}d {h}h {m}m left</span>
  );
}

export default function DashboardUsersPage() {
  const initialUsers = [
    {
      id: "u1",
      name: "Aya Nakamura",
      avatar: "https://i.pravatar.cc/150?img=32",
      email: "aya@example.com",
      streak: 12,
    },
    {
      id: "u2",
      name: "Liam O'Connor",
      avatar: "https://i.pravatar.cc/150?img=12",
      email: "liam@example.com",
      streak: 28,
    },
    {
      id: "u3",
      name: "Sofia Rossi",
      avatar: "https://i.pravatar.cc/150?img=45",
      email: "sofia@example.com",
      streak: 5,
    },
  ];

  const initialChallenges = [
    {
      id: "c1",
      title: "100 Pushups — 30 Days",
      description:
        "Do 100 pushups every day for 30 days. Track daily progress and compete with friends.",
      owner: "Liam O'Connor",
      start: "2025-09-25T00:00:00Z",
      end: "2025-10-25T00:00:00Z",
    },
    {
      id: "c2",
      title: "Read 20 Pages",
      description: "Read at least 20 pages every day for 21 days.",
      owner: "Sofia Rossi",
      start: "2025-09-20T00:00:00Z",
      end: "2025-10-11T00:00:00Z",
    },
  ];

  const [users] = useState(initialUsers);
  const [challenges] = useState(initialChallenges);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || (u.email && u.email.toLowerCase().includes(q))
    );
  }, [users, query]);

  const c = challenges[0]

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-500">Challenges are the heart of progress</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users by name or email..."
              className="px-3 py-2 rounded-md border border-slate-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm shadow hover:bg-indigo-700">
              New Challenge
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. Selected Challenge emphasized */}
          <section>
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Participating challenge</h2>
              <div>
                <div className="text-xl font-bold text-slate-800">{c.title}</div>
                <div className="text-sm text-slate-500 mb-2">by {c.owner}</div>
                <Countdown start={c.start} end={c.end} />
                <p className="mt-3 text-sm text-slate-600">{c.description}</p>

                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
                    View Leaderboard
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Challenge List */}
          <aside>
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-base font-semibold text-slate-800 mb-3">All Challenges</h3>
              <div className="space-y-3">
                {challenges.map((c) => (
                  <button
                    key={c.id}
                    className={`w-full text-left p-4 rounded-xl border transition-shadow hover:shadow-md border-slate-200 bg-white`}
                    // className={`w-full text-left p-4 rounded-xl border transition-shadow hover:shadow-md border-slate-200 ${
                    //   selectedChallenge === c.id ? "bg-indigo-50 border-indigo-200" : "bg-white"
                    // }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{c.title}</div>
                        <div className="text-xs text-slate-500">by {c.owner}</div>
                      </div>
                      <Countdown start={c.start} end={c.end} />
                    </div>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3">{c.description}</p>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          <div>
            <div className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-slate-800">Users</h2>
                <span className="text-sm text-slate-500">{filtered.length} found</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-sm text-slate-500 border-b border-slate-100">
                      <th className="py-3 pl-3">User</th>
                      <th className="py-3">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="py-3 pl-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={`avatar of ${u.name}`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-sm font-medium text-slate-800">{u.name}</div>
                              <div className="text-xs text-slate-500">Member</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-sm">
                          <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                            🔥 {u.streak} days
                          </span>
                        </td>
                      </tr>
                    ))}

                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-500">
                          No users match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-8 text-center text-xs text-slate-400">
          Built with ❤️ — Tailwind + React
        </footer>
      </div>
    </div>
  );
}
