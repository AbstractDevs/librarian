import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { toast } from "sonner";
import { CopyButton } from "../ui/copy-button";
import { ClipboardCopyIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export const CopyScriptJsonButton = ({
  jsonString,
  size = "default",
}: {
  jsonString: string;
  size?: "default" | "icon";
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CopyButton
            content={jsonString}
            onSuccess={() => {
              toast.success("JSON copied to clipboard", {
                description: "You can paste it into botc.app to play",
              });
            }}
            variant="outline"
            size={size}
          >
            <ClipboardCopyIcon />
            <span className={cn("", size === "icon" && "sr-only")}>Copy JSON</span>
            {size === "icon" && (
              <TooltipContent>
                <p>Copy JSON</p>
              </TooltipContent>
            )}
          </CopyButton>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
