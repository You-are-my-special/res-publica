import { Building, GithubIcon, Sparkle, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

import { auth, signIn } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { Icon } from "@acme/ui/icon";
import { ThemeToggle } from "@acme/ui/theme";

const UserNavbar = async () => {
  const session = await auth();

  if (!session)
    return (
      <div className="flex gap-2">
        {" "}
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button variant="secondary" className="gap-1">
            <Icon as={GithubIcon} />
            Sign in
          </Button>
        </form>
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      {/* <Link href="/senate" className="hidden md:flex">
        <Button className="gap-2 rounded-full" variant="outline">
          <Icon as={Sparkles} />
          Senate
        </Button>
      </Link> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer rounded-full">
            {session?.user.image && <AvatarImage src={session?.user.image} />}
            <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col px-2">
              <p className="font-semibold tracking-tight">{session.user.name}</p>

              <p className="text-xs text-muted-foreground">{session.user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href="/join" className="md:hidden">
              <DropdownMenuItem className="gap-2">
                {/* <Building className="size-4" /> */}
                Business
              </DropdownMenuItem>
            </Link>

            <div className="flex items-center justify-between">
              <DropdownMenuItem className="focus:bg-transparent">Theme</DropdownMenuItem>
              <ThemeToggle />
            </div>

            <DropdownMenuSeparator />
            <Link className="w-full" href={session ? "/api/auth/signout" : "/signin"}>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

export default UserNavbar;
