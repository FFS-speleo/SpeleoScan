import { fetchRessources } from "@/api";
import { RessourcesListOrganism } from "@/organisms";

const Sommaire = async () => {
  const { resources } = await fetchRessources();

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <RessourcesListOrganism ressources={resources} />
      </div>
    </div>
  );
};

export default Sommaire;
