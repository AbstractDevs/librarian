import { Button, type ButtonProps } from "./button";

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

export const ButtonLink = ({ href, children, ...props }: ButtonLinkProps) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
};
