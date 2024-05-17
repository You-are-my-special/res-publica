import React from "react";
import { Github } from "lucide-react";

import { Button } from "@acme/ui/button";
import { ThemeToggle } from "@acme/ui/theme";

const Navbar = () => {
  return (
    <div className="flex justify-between py-4">
      <Button size="icon" variant="outline">
        <Github />
      </Button>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
