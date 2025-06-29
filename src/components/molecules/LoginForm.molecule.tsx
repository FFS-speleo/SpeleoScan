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
    <form
      className="card w-96 bg-base-100 shadow-xl mt-20 mb-20"
      onSubmit={handleSubmit}
    >
      <div className="card-body">
        <h2 className="card-title">Login!</h2>
        <div className="items-center mt-2">
          <InputWithIconAtom
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value as string)
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            }
          />
          <InputWithIconAtom
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value as string)
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
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
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary w-full">
            Se connecter
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginFormMolecule;
