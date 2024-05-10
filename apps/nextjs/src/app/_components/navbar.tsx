import React from "react";

import { ThemeToggle } from "@acme/ui/theme";

const Navbar = () => {
  return (
    <div className="flex justify-between py-4">
      <p>Repo Radar</p>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
