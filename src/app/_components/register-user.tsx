"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/trpc/react";

interface registerProps {
  setChangeComp: React.Dispatch<React.SetStateAction<any>>;
}

export function RegisterUser({ setChangeComp }: registerProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = api.user.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setEmail("");
      setPassword("");
      setChangeComp("otp");
    },
  });

  useEffect(() => {
    if (registerUser.isError) {
      try {
        const errorMessage = JSON?.parse(registerUser.error.message);
        toast.error(
          errorMessage?.map((m: any) => "- " + m?.message).join("\n"),
        );
      } catch (error) {
        toast.error(registerUser.error.message);
      }
    }
  }, [registerUser.isError]);

  return (
    <div className="w-2/6 rounded-3xl border px-14 py-10">
      <h1 className="pb-9 text-center text-3xl font-semibold">
        Create your account
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem("email", email);
          registerUser.mutate({ name, email, password });
        }}
        className="flex flex-col"
      >
        <div className="pb-8">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-black"
          />
        </div>
        <div className="pb-8">
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-black"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-black"
          />
        </div>
        <button
          type="submit"
          className="mt-10 rounded-md bg-black px-10 py-4 font-normal uppercase text-white transition hover:bg-black"
          disabled={registerUser.isPending}
        >
          {registerUser.isPending ? "REGISTERING USER..." : "CREATE ACCOUNT"}
        </button>
        <span
          className="mt-12 text-center text-sm font-light text-gray-600"
          onClick={() => setChangeComp("login")}
        >
          Have an Account?{" "}
          <b className="font-normal tracking-wide text-black">LOGIN</b>
        </span>
      </form>
    </div>
  );
}
