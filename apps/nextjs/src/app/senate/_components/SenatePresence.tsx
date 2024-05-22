"use client";
import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import React, { use } from "react";
import { api } from "~/trpc/react";
import UserPresence from "./UserPresence";

type SenatePresenceProps = {
  presence: Promise<RouterOutputs["senate"]["presence"]>;
  auth: Promise<Session | null>;
};
const SenatePresence = (props: SenatePresenceProps) => {
  const initialData = use(props.presence);
  const session = use(props.auth);
  const { data: presence } = api.senate.presence.useQuery(undefined, {
    initialData,
  });
  return (
    <div>
      <h1>Senate Presence</h1>
      <UserPresence presence={presence} session={session} />
      {presence.map(({ user }) => (
        <div key={user.name} className="flex flex-col gap-2">
          <Avatar>
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            {user.image && <AvatarImage src={user.image} />}
          </Avatar>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SenatePresence;
