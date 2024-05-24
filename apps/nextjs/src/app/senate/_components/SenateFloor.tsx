"use client";
import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { H1 } from "@acme/ui/typography";
import { differenceInMinutes } from "date-fns";
import React, { use } from "react";
import { api } from "~/trpc/react";
import UserPresence from "./UserPresence";

type SenateFloorProps = {
  presence: Promise<RouterOutputs["senate"]["presence"]>;
  auth: Promise<Session | null>;
};

const users = Array.from({ length: 10 }, (_, i) => ({
  user: {
    name: `User ${i}`,
  },
}));
const SenateFloor = (props: SenateFloorProps) => {
  const initialData = use(props.presence);
  const session = use(props.auth);
  const { data: presence } = api.senate.presence.useQuery(undefined, {
    initialData,
  });

  const filtered = presence.filter(({ updatedAt }) => updatedAt && differenceInMinutes(new Date(), updatedAt) < 6);
  return (
    <div className="flex flex-col gap-2">
      <H1>Senate Floor</H1>
      <div className="flex gap-2">
        <UserPresence presence={presence} session={session} />
        {users.map(({ user }) => (
          <Avatar key={user.name}>
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            {/* {user.image && <AvatarImage src={user.image} />} */}
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default SenateFloor;
