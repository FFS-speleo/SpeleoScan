"use client";
import React, { useState } from "react";
import { InputWithIconAtom } from "@/atoms";
import { useSetCookie } from "cookies-next";
import Toastify from "toastify-js";
import { useRouter } from "next/navigation";

const LoginFormMolecule: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setCookie = useSetCookie();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Login failed");
      }

      const { token } = await res.json();
      setCookie(
        process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME ?? "FFS-QR-CODE-ADMIN-TOKEN",
        token,
      );
      router.push("/admin/dashboard");
    } catch (e) {
      Toastify({
        text: e?.message,
        duration: 3000,
        style: { background: "#ff000d" },
      }).showToast();
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8  from-base-200 to-base-300">
      <div className="w-full max-w-md">
        <form
          className="card bg-base-100 shadow-2xl border border-base-200 backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <div className="card-body p-8">
            {/* Header avec icône */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-base-content mb-2">
                Connexion
              </h2>
              <p className="text-base-content/60 text-sm">
                Accédez à votre espace d&apos;administration
              </p>
            </div>

            {/* Formulaire */}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium mb-1">
                    Adresse email
                  </span>
                </label>
                <InputWithIconAtom
                  type="email"
                  placeholder="exemple@domaine.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value as string)
                  }
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70 text-primary"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium mb-1">
                    Mot de passe
                  </span>
                </label>
                <InputWithIconAtom
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value as string)
                  }
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Bouton de connexion */}
            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full text-black font-semibold py-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114L8.704 10.75H18.25A.75.75 0 0019 10z"
                    clipRule="evenodd"
                  />
                </svg>
                Se connecter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormMolecule;
