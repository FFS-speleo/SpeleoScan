import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-base-content">
      <div className="text-center space-y-6 p-8">
        {/* Icône 404 */}
        <div className="text-8xl font-bold text-primary mb-4">404</div>

        {/* Message principal */}
        <h1 className="text-3xl font-bold mb-2">Ressource introuvable</h1>

        {/* Message secondaire */}
        <p className="text-lg text-base-content/70 mb-8 max-w-md">
          Désolé, la ressource que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>

        {/* Bouton de retour */}
        <div className="space-y-4">
          <Link href="/" className="btn btn-secondary btn-lg">
            Sommaire{" "}
          </Link>
        </div>

        {/* Illustration optionnelle */}
        <div className="mt-8">
          <svg
            aria-hidden="true"
            className="w-32 h-32 mx-auto text-primary/30"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
