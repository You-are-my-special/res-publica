import { BookMarked, CircleDashed, CircleDot, EarthIcon, Github } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { Icon } from "@acme/ui/icon";
import UserNavbar from "./user-navbar";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="relative">
          <Badge className="absolute -top-2 -left-4 w-12 h-4">Beta</Badge>
          <p className="text-xl font-semibold tracking-tight">Res Publica</p>
        </Link>
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" className="gap-1">
              <Icon as={CircleDashed} />
              Issues
            </Button>
          </Link>
          <Link href="/repo">
            <Button variant="ghost" className="gap-1">
              <Icon as={BookMarked} />
              Repos
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/blog">
          <Button variant="outline" className="gap-1 rounded-full">
            <Icon as={EarthIcon} />
            Blog
          </Button>
        </Link>
        <Suspense>
          <UserNavbar />
        </Suspense>
      </div>
    </div>
  );
};

export default Navbar;
