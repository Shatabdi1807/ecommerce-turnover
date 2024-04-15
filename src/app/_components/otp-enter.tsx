"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { api } from "~/trpc/react";
import OtpInput from "./OtpInput";

interface otpProps {
  setChangeComp: React.Dispatch<React.SetStateAction<any>>;
}

export function OtpEnter({ setChangeComp }: otpProps) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const email = localStorage.getItem("email");

  const maskEmail = (email: any) => {
    const atIndex = email.indexOf("@");
    const username = email.substring(0, atIndex);
    const maskedUsername = username.substring(0, 3) + "*".repeat(3);
    const domain = email.substring(atIndex);
    return `${maskedUsername}${domain}`;
  };

  return (
    <div className="rounded-3xl border px-14 py-10">
      <h1 className="pb-9 text-center text-3xl font-semibold">
        Verify your email
      </h1>
      <p className="pb-3 text-center text-xl font-light">
        Enter the 8 digit code you have received on{" "}
      </p>
      <p className="pb-8 text-center text-lg font-semibold">
        {maskEmail(email)}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === "") {
            toast.error("Please enter otp!");
            return;
          }
          if (pin === "12345678") {
            toast.success("User registered successfully!");
            setChangeComp("login");
          } else {
            toast.error("Please enter valid otp!");
          }
        }}
        className="flex flex-col"
      >
        <div>
          <p className="pb-2">Code</p>
          <OtpInput onComplete={(pin) => setPin(pin)} />
        </div>
        <button
          type="submit"
          className="mt-10 rounded-md bg-black px-10 py-4 font-extralight text-white transition hover:bg-black"
          //   disabled={loginUser.isPending}
        >
          {"VERIFY"}
        </button>
      </form>
    </div>
  );
}
