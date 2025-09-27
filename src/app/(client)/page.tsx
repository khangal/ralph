"use client"

import { ChallengeListingItem } from "@/components/challenge/ChallengeListingItem";
import { UserList } from "@/components/user/UserList";
import { useChallenges } from "@/query-hooks/useChallenges";
import Link from "next/link";
import React from "react";

export default function DashboardUsersPage() {
  const { data: challenges } = useChallenges();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Battle arena</h1>
            <p className="text-sm opacity-70">Challenges are the heart of progress</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* <input */}
            {/*   type="search" */}
            {/*   value={query} */}
            {/*   onChange={(e) => setQuery(e.target.value)} */}
            {/*   placeholder="Search users..." */}
            {/*   className="input input-bordered w-full md:w-64" */}
            {/* /> */}
            <Link href="/challenge/new" className="btn btn-primary">New Challenge</Link>
          </div>
        </header>

        <main>
          {/* 1. Selected Challenge */}
          {/* <section> */}
          {/*   <div className="card bg-base-100 shadow-xl"> */}
          {/*     <div className="card-body"> */}
          {/*       <h2 className="card-title">Participating Challenge</h2> */}
          {/*       <div className="text-xl font-bold">{c.title}</div> */}
          {/*       <div className="text-sm opacity-70 mb-1">by {c.owner}</div> */}
          {/*       <Countdown start={c.start} end={c.end} /> */}
          {/*       <p className="mt-2 text-sm">{c.description}</p> */}
          {/*       <div className="card-actions justify-end mt-4"> */}
          {/*         <button className="btn btn-outline btn-primary">View Leaderboard</button> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </section> */}

          {/* 2. Challenge List */}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
            {(challenges || []).map((c) => (
              <ChallengeListingItem className="col-span-1" key={c.id} {...c} />
            ))}
          </div>
        </main>

        <div className="divider">Challengers</div>

        {/* 3. Users Table */}
        <UserList className="mt-4 max-w-md mx-auto w-full" />

        <footer className="mt-8 text-center text-xs opacity-60">
          Built with ❤️ — Tailwind + DaisyUI
        </footer>
      </div>
    </div>
  );
}
