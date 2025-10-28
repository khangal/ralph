"use client";

import { ChallengeListingItem } from "@/components/challenge/ChallengeListingItem";
import GitHubIcon from "@/components/icons/github";
import TaskList from "@/components/task/TaskList";
import { UserList } from "@/components/user/UserList";
import { useChallenges } from "@/query-hooks/useChallenges";
import { usePrivateChallenges } from "@/query-hooks/usePrivateChallenges";
import Link from "next/link";

export default function DashboardUsersPage() {
  const { data: challenges } = useChallenges();
  const { data: privateChallenges } = usePrivateChallenges();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold">Battle arena</h1>
            <p className="text-sm opacity-70">
              Challenges are the heart of progress
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* <input */}
            {/*   type="search" */}
            {/*   value={query} */}
            {/*   onChange={(e) => setQuery(e.target.value)} */}
            {/*   placeholder="Search users..." */}
            {/*   className="input input-bordered w-full md:w-64" */}
            {/* /> */}
            <Link href="/challenge/new" className="btn btn-primary">
              New Challenge
            </Link>
          </div>
        </header>

        <div className="mb-8">
          <TaskList
            tasks={[
              ...(challenges || [])
                .filter(
                  (c) =>
                    new Date() >= new Date(c.startAt) &&
                    new Date() <= new Date(c.endAt),
                )
                .map((c) => ({
                  challengeId: c.id,
                  text: c.title,
                })),
              ...(privateChallenges || [])
                .filter(
                  (c) =>
                    new Date() >= new Date(c.startAt) &&
                    new Date() <= new Date(c.endAt),
                )
                .map((c) => ({ challengeId: c.id, text: c.title })),
            ]}
          />
        </div>

        <div className="flex flex-col gap-6">
          {privateChallenges && privateChallenges.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl">For only me</h2>
              {/* 2. Challenge List */}
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
                {(privateChallenges || []).map((c) => (
                  <ChallengeListingItem
                    className="col-span-1"
                    key={c.id}
                    {...c}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-xl">Group challenges</h2>
            {/* 2. Challenge List */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
              {(challenges || []).map((c) => (
                <ChallengeListingItem
                  className="col-span-1"
                  key={c.id}
                  {...c}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="divider py-6">Challengers</div>

        {/* 3. Users Table */}
        <UserList className="mt-4 max-w-md mx-auto w-full" />

        <footer className="mt-8 text-center text-xs opacity-60">
          <a
            href="https://github.com/khangal/ralph"
            target="_blank"
            rel="noopener noreferrer"
          >
            ❤️ To contribute, visit on GitHub.
            <GitHubIcon size={16} className="inline mb-0.5 mx-1" />
          </a>
        </footer>
      </div>
    </div>
  );
}
