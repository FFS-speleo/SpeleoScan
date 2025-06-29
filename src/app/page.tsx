"use server";
import { fetchRessources } from "@/api";

export default async function Page() {
  const { resources } = await fetchRessources();

  return (
    resources && (
      <div className="flex flex-col h-full justify-center items-center p-4">
        {resources.map((r) => (
          <div key={r.id}>{r.title}</div>
        ))}
      </div>
    )
  );
}
