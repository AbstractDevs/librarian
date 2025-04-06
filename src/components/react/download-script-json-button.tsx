import { DownloadIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { cn } from "@/utils/cn";
import { DownloadButton } from "../ui/download-button";

export const DownloadScriptJsonButton = ({
  jsonString,
  scriptId,
  size = "default",
}: {
  jsonString: string;
  scriptId: string;
  size?: "default" | "icon";
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DownloadButton
            content={jsonString}
            fileName={`${scriptId.replaceAll("/", "-")}.json`}
            size={size}
          >
            <DownloadIcon />
            <span className={cn("", size === "icon" && "sr-only")}>Download JSON</span>
            {size === "icon" && (
              <TooltipContent>
                <p>Download JSON</p>
              </TooltipContent>
            )}
          </DownloadButton>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
