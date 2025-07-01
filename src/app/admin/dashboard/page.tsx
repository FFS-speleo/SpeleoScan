import { FileText, Users, QrCode } from "lucide-react";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div className="hero bg-base-200 rounded-lg">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Dashboard</h1>
            <p className="py-6">
              Bienvenue dans le tableau de bord administrateur. Gérez vos
              ressources QR et utilisateurs facilement.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title">Ressources QR</h2>
                <p className="text-2xl font-bold text-primary">24</p>
              </div>
              <QrCode size={48} className="text-primary" />
            </div>
            <p className="text-sm opacity-70">Codes QR générés</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title">Documents</h2>
                <p className="text-2xl font-bold text-secondary">12</p>
              </div>
              <FileText size={48} className="text-secondary" />
            </div>
            <p className="text-sm opacity-70">Documents référencés</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title">Utilisateurs</h2>
                <p className="text-2xl font-bold text-accent">156</p>
              </div>
              <Users size={48} className="text-accent" />
            </div>
            <p className="text-sm opacity-70">Utilisateurs actifs</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Activité récente</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg">
              <div>
                <p className="font-medium">Nouvelle ressource ajoutée</p>
                <p className="text-sm opacity-70">
                  Résistances des nœuds - Page 42
                </p>
              </div>
              <p className="text-sm opacity-70">Il y a 2 heures</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg">
              <div>
                <p className="font-medium">Utilisateur créé</p>
                <p className="text-sm opacity-70">marie.martin@example.com</p>
              </div>
              <p className="text-sm opacity-70">Il y a 5 heures</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg">
              <div>
                <p className="font-medium">Document modifié</p>
                <p className="text-sm opacity-70">
                  Techniques de progression - Page 156
                </p>
              </div>
              <p className="text-sm opacity-70">Hier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
