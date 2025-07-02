## Prérequis

- Node.js >= 21
- npm
- Un repository GitHub contenant le fichier JSON

### Variables d'environnement

Créer un fichier `.env` à la racine du projet avec :

```env
GITHUB_API_URL=https://api.github.com
GITHUB_REPO_OWNER=FFS-speleo
GITHUB_REPO_DATABASE_NAME=database
GITHUB_RESOURCES_PATH=ressources.json
GITHUB_USERS_PATH=users.json
GITHUB_API_TOKEN=your_token
JWT_SECRET=jwt_secret
NEXT_PUBLIC_COOKIE_TOKEN_NAME=FFS-QR-CODE-ADMIN-TOKEN
```

Le token GitHub doit avoir les droits de lecture et d'ecriture sur le repository.

### Installation

```
npm install
```

Lancer le projet en développement

```
npm run dev
```

Accès au projet sur http://localhost:3000

### Cache

Le projet utilise le cache serveur natif de Next.js (revalidate + tags) pour limiter les appels à l’API GitHub.

Une API d’invalidation par les webhooks de github est disponible pour forcer la mise à jour du cache :  
suivre [documentation officiel](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries) pour la configuration des webhooks. La route sur laquelle doit tapé le webhook est `/api/webhook`
