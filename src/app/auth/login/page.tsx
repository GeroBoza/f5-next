"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { UserIcon, PasswordIcon } from "@/lib/icons";

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const res = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      console.log("error");
      return;
    }

    router.push("/friends");
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      <div>
        <Image
          width={1000}
          height={1000}
          style={{ objectFit: "cover", height: "100vh" }}
          src="/img/messi.webp"
          alt="Login Image"
        />
      </div>
      <div className="grid gap-5 self-center">
        <div className="grid justify-center gap-3">
          <div className="flex justify-center">
            <Image
              width={150}
              height={150}
              style={{
                objectFit: "contain",
                borderRadius: "10px",
              }}
              src="/img/logo.webp"
              alt="App Logo"
            />
          </div>
          <h1 className="text-center">SIGN INTO YOUR ACCOUNT</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-auto grid w-96 gap-5">
            <label className="input input-bordered flex items-center gap-2">
              {UserIcon}
              <input
                type="text"
                required
                className="grow"
                placeholder="Username"
                value={userName}
                onChange={(evt) => setUserName(evt.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              {PasswordIcon}
              <input
                type="password"
                required
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
            <small className="text-center">
              You don&apos;t have an account yet? <u>Register</u>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
