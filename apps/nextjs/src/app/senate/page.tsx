import { auth } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import React, { Suspense } from "react";
import { api } from "~/trpc/server";
import SenatePresence from "./_components/SenatePresence";

const SenatePage = async () => {
  const presence = api.senate.presence();
  const session = auth();
  return (
    <div className="flex flex-col">
      <Suspense>
        <SenatePresence auth={session} presence={presence} />
      </Suspense>
      {/* <div className="flex flex-wrap"></div> */}
    </div>
  );
};

export default SenatePage;
