"use client";

import Button from "./Button";

export default function Header() {
  return (
    <nav className="w-full bg-redNCS p-8 flex flex-row justify-between">
      <h1
        id="header-title"
        className="text-4xl select-none font-bold text-white"
      >
        TaskMaster+
      </h1>
      <div className="w-1/12">
        <Button
          id="header-login-button"
          text="Login"
          textColor="text-white"
          borderColor="border-white"
          onClick={() => {}}
        />
      </div>
    </nav>
  );
}
