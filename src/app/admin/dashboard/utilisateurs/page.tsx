import { fetchUsers } from "@/api/fetchUsers";
import { UsersTableOrganism } from "@/organisms";

const UtilisateursPage = async () => {
  const { users } = await fetchUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
      </div>

      <UsersTableOrganism users={users} />
    </div>
  );
};

export default UtilisateursPage;
