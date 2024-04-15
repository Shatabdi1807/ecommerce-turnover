"use client";
import React, { useState } from "react";
import { LoginUser } from "./login-user";
import { RegisterUser } from "./register-user";
import { OtpEnter } from "./otp-enter";
import { SelectInterest } from "./select-interests";

const AuthUser = () => {
  const [changeComp, setChangeComp] = useState<string>("login");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      {changeComp === "login" && <LoginUser setChangeComp={setChangeComp} />}
      {changeComp === "register" && (
        <RegisterUser setChangeComp={setChangeComp} />
      )}
      {changeComp === "otp" && <OtpEnter setChangeComp={setChangeComp} />}
      {changeComp === "interest" && <SelectInterest />}
      {/* <SelectInterest /> */}
    </div>
  );
};

export default AuthUser;
