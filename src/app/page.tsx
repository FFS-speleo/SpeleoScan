"use server";
import { fetchRessources } from "@/api";

export default async function Page() {
  const ressources = await fetchRessources();

  return (
    ressources && (
      <div className="flex flex-col h-full justify-center items-center p-4">
        {ressources.map((r) => (
          <div key={r.id}>{r.title}</div>
        ))}
      </div>
    )
  );
}
