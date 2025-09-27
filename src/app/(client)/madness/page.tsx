"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type UserCompletion = {
  id: string;
  name: string;
  completions: boolean[]; // one entry per day
};

const totalDays = 7; // demo
const today = 6;

const mockData: UserCompletion[] = [
  { id: "me", name: "You", completions: [true, true, true, false, true, false, false] },
  { id: "alice", name: "Alice", completions: [true, true, true, true, false, true, false] },
  { id: "bob", name: "Bob", completions: [true, false, true, false, true, false, false] },
  { id: "charlie", name: "Charlie", completions: [true, true, false, false, false, true, false] },
];

export default function ChallengePage() {
  const [users, setUsers] = useState(mockData);

  const markComplete = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === "me"
          ? {
              ...u,
              completions: u.completions.map((c, i) =>
                i === today - 1 ? true : c
              ),
            }
          : u
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Challenge header */}
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold">30-Day Coding Challenge</h1>
          <p className="text-gray-600">
            Solve at least one coding problem every day for 30 days.
          </p>
        </CardContent>
      </Card>

      {/* Completion Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">User</th>
                  {Array.from({ length: totalDays }, (_, i) => (
                    <th key={i} className="p-2 border">
                      {i + 1}
                      {i + 1 === today && <span className="ml-1 text-blue-500">(Today)</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border">
                    <td className="p-2 border font-medium">{user.name}</td>
                    {user.completions.map((done, i) => (
                      <td key={i} className="p-2 border">
                        {done ? "✅" : i + 1 < today ? "❌" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Button onClick={markComplete} disabled={users[0].completions[today - 1]}>
              {users[0].completions[today - 1] ? "Completed ✅" : "Mark Today Complete"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
