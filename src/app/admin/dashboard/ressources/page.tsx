import { fetchRessources } from "@/api";
import { RessourcesTableOrganism } from "@/organisms";

const Ressources = async () => {
  const { resources } = await fetchRessources();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Ressources</h1>
      </div>

      <RessourcesTableOrganism ressources={resources} />
    </div>
  );
};

export default Ressources;
