import { toast } from "sonner";
import { Button, type ButtonProps } from "./button";

interface CopyButtonProps extends ButtonProps {
  content: string;
  successMessage?: string;
  successDescription?: string;
}

export const CopyButton = ({
  content,
  children,
  successMessage,
  successDescription,
  ...props
}: CopyButtonProps) => {
  return (
    <Button
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard
          .writeText(content)
          .then(() => {
            if (successMessage) {
              toast.success(successMessage, {
                description: successDescription,
              });
            }
          })
          .catch(() => {
            toast.error("Something went wrong", {
              description: "Please try again or refresh the page",
            });
          });
      }}
    >
      {children}
    </Button>
  );
};
