"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";


export default function PendingPage() {
  const tasks = useQuery(api.tasks.get);
  return (

    <div className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}

    </div>
  );
}