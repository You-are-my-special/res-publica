import React from "react";
import Link from "next/link";
import {
  BookAIcon,
  BookMarked,
  CircleAlert,
  CircleDot,
  Github,
} from "lucide-react";

import { Button } from "@acme/ui/button";
import { ThemeToggle } from "@acme/ui/theme";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <Github />
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-1">
            <CircleDot className="h-4" />
            Issues
          </Button>
        </Link>
        <Link href="/repo">
          <Button variant="outline" className="gap-1">
            <BookMarked className="h-4" />
            Repos
          </Button>
        </Link>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
