import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Script } from "@/utils/script";
import type { ColumnDef } from "@tanstack/react-table";
import { CopyScriptJsonButton } from "../copy-script-json-button";
import { DownloadScriptJsonButton } from "../download-script-json-button";

export const columns: ColumnDef<Script>[] = [
  {
    accessorKey: "name",
    header: "Script",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    header: "Characters",
    cell: ({ row }) => {
      const characterBreakdown = row.original.characterBreakdown;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {characterBreakdown.townsfolkCount} / {characterBreakdown.outsiderCount} /{" "}
              {characterBreakdown.minionCount} / {characterBreakdown.demonCount}
            </TooltipTrigger>
            <TooltipContent>
              <p>{characterBreakdown.townsfolkCount} Townsfolk</p>
              <p>{characterBreakdown.outsiderCount} Outsiders</p>
              <p>{characterBreakdown.minionCount} Minions</p>
              <p>{characterBreakdown.demonCount} Demons</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableGlobalFilter: false,
  },
  {
    id: "quick-actions",
    header: "Quick Actions",
    cell: ({ row }) => {
      const script = row.original;

      return (
        <div className="flex items-center gap-2">
          <CopyScriptJsonButton jsonString={script.scriptJsonString} size="icon" />
          <DownloadScriptJsonButton
            jsonString={script.scriptJsonString}
            scriptId={script.id}
            size="icon"
          />
        </div>
      );
    },
    enableGlobalFilter: false,
  },
];
