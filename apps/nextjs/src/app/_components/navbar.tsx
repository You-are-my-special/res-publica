import { BookMarked, CircleDot, Github } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

import { Button } from "@acme/ui/button";
import UserNavbar from "./user-navbar";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        {/* <Github className="h-4" /> */}

        <p className="text-xl font-semibold tracking-tight">Atlantis</p>
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" className="gap-1">
              <CircleDot className="h-4" />
              Issues
            </Button>
          </Link>
          <Link href="/repo">
            <Button variant="ghost" className="gap-1">
              <BookMarked className="h-4" />
              Repos
            </Button>
          </Link>
        </div>
      </div>
      <Suspense>
        <UserNavbar />
      </Suspense>
    </div>
  );
};

export default Navbar;
