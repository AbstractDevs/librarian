import React from "react";
import { Button, type ButtonProps } from "./button";

export interface ButtonLinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
}

export const ButtonLink = ({ href, children, ...props }: ButtonLinkProps) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
};
