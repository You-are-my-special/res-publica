import { Button } from "@acme/ui/button";
import { Github } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col py-12 items-center text-muted-foreground">
      <a href={"https://github.com/You-are-my-special/res-publica"}>
        <Button variant="ghost">
          <Github />
          open source on GitHub
        </Button>
      </a>
      <p>
        <a className="text-primary" href="https://x.com/andrewdorobantu">
          @andrewdorobantu
        </a>{" "}
        <a className="text-primary" href="https://x.com/cristian_rdum">
          @cristian_rdum
        </a>
      </p>
    </div>
  );
};

export default Footer;
