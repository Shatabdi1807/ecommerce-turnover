// "use client";
import Link from "next/link";

// import { api } from "~/trpc/server";
// import { RegisterUser } from "./_components/register-user";
// import { LoginUser } from "./_components/login-user";
// import { useState } from "react";
import AuthUser from "./_components/auth-user";

export default async function Home() {
  return (
    <main>
      <AuthUser />
    </main>
  );
}
