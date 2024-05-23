"use client";
import type { RouterOutputs } from "@acme/api";
import type { Session } from "@acme/auth";
import { differenceInMinutes } from "date-fns";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { api } from "~/trpc/react";
interface UserPresenceProps {
  presence: RouterOutputs["senate"]["presence"];
  session: Session | null;
}

const UserPresence = ({ presence, session }: UserPresenceProps) => {
  const utils = api.useUtils();
  const update = api.senate.updatePresence.useMutation({
    onSuccess: () => utils.senate.presence.invalidate(),
  });

  const updatePresence = useDebouncedCallback(() => {
    update.mutate();
  }, 200);
  useEffect(() => {
    if (!session) return;
    const userPresence = presence.find((p) => p.user.id === session?.user.id);

    const updatedAt = userPresence?.updatedAt;
    if (!updatedAt) return updatePresence();

    const expired = differenceInMinutes(new Date(), updatedAt) > 5;
    if (expired) updatePresence();
  }, [session, presence]);
  return null;
};

export default UserPresence;
