"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { api } from "~/trpc/react";

interface loginProps {
  setChangeComp: React.Dispatch<React.SetStateAction<any>>;
}

export function LoginUser({ setChangeComp }: loginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = api.user.login.useMutation({
    onSuccess: () => {
      //   router.refresh();
      setEmail("");
      setPassword("");
    },
  });

  useEffect(() => {
    if (loginUser?.isSuccess) {
      toast.success(loginUser?.data?.message);
      setChangeComp("interest");
    }
  }, [loginUser.isSuccess]);

  useEffect(() => {
    if (loginUser.isError) {
      try {
        const errorMessage = JSON?.parse(loginUser.error.message);
        console.log(
          "loginUser",
          // errorMessage.map((m: any) => m?.message).join(", "),
          loginUser.error.message,
        );
        toast.error(errorMessage.map((m: any) => "- " + m?.message).join("\n"));
      } catch (error) {
        toast.error(loginUser.error.message);
      }
    }
  }, [loginUser.isError]);

  return (
    <div className="w-2/6 rounded-3xl border px-14 py-10">
      <h1 className="pb-9 text-center text-3xl font-semibold">Login</h1>
      <p className="pb-3 text-center text-xl">Welcome back to ECOMMERCE</p>
      <p className="pb-8 text-center text-sm font-light">
        The next gen business marketplace
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser.mutate({ email, password });
          // console.log(loginUser?.data?.message);
          // if(loginUser.data){

          // }
        }}
        className="flex flex-col"
      >
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
          className="mt-10 rounded-md bg-black px-10 py-4 font-extralight text-white transition hover:bg-black"
          disabled={loginUser.isPending}
        >
          {loginUser.isPending ? "LOGGING IN..." : "LOGIN"}
        </button>
        <hr className="my-7" />
        <span
          className="text-center text-sm font-light text-gray-600"
          onClick={() => setChangeComp("register")}
        >
          Don't have an Account?{" "}
          <b className="font-normal tracking-wide text-black">SIGN UP</b>
        </span>
      </form>
    </div>
  );
}
