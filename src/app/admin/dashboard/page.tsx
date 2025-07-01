import { fetchRessources, fetchUsers } from "@/api";
import { Users, QrCode } from "lucide-react";

const DashboardHomePage = async () => {
  const { users } = await fetchUsers();
  const { resources } = await fetchRessources();

  return (
    <div className="space-y-6">
      <div className="hero bg-base-200 rounded-lg">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Dashboard</h1>
            <p className="py-6">Bienvenue dans le tableau de bord administrateur. Gérez vos ressources QR et utilisateurs facilement.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title">Ressources QR</h2>
                <p className="text-2xl font-bold text-primary">{resources.length}</p>
              </div>
              <QrCode size={48} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title">Utilisateurs</h2>
                <p className="text-2xl font-bold text-accent">{users.length}</p>
              </div>
              <Users size={48} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
