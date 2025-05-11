import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Script } from "@/types/script";
import type { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { CopyScriptJsonButton } from "../copy-script-json-button";
import { DownloadScriptJsonButton } from "../download-script-json-button";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { match } from "ts-pattern";
import { Badge } from "@/components/ui/badge";
import type { InferEntrySchema } from "astro:content";

export type ScriptColumn = Script & {
  readme: InferEntrySchema<"scriptReadmes">;
};

const SortButton = ({
  column,
  label,
}: HeaderContext<ScriptColumn, unknown> & {
  label: string;
}) => {
  return (
    <Button variant="neutralNoShadow" onClick={column.getToggleSortingHandler()}>
      {label}
      {match(column.getIsSorted())
        .with("asc", () => <ArrowUp className="ml-2 h-4 w-4" />)
        .with("desc", () => <ArrowDown className="ml-2 h-4 w-4" />)
        .with(false, () => <ArrowUpDown className="ml-2 h-4 w-4" />)
        .exhaustive()}
    </Button>
  );
};

export const columns: ColumnDef<ScriptColumn>[] = [
  {
    accessorKey: "name",
    sortingFn: "alphanumeric",
    header: (ctx) => <SortButton label="Script" {...ctx} />,
    cell: ({ row }) => {
      const script = row.original;
      return (
        <div className="flex items-center gap-2">
          <span>{script.name}</span>
          {script.type === "homebrew" && <Badge>Homebrew</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    sortingFn: "alphanumeric",
    header: (ctx) => <SortButton label="Author" {...ctx} />,
  },
  {
    id: "created-at",
    header: (ctx) => <SortButton label="Added" {...ctx} />,
    sortingFn: "datetime",
    accessorFn: (row) => (row.readme.createdAt ? format(row.readme.createdAt, "MM/dd/yyyy") : "-"),
    enableGlobalFilter: false,
  },
  {
    id: "updated-at",
    header: (ctx) => <SortButton label="Last Updated" {...ctx} />,
    sortingFn: "datetime",
    accessorFn: (row) => (row.readme.updatedAt ? format(row.readme.updatedAt, "MM/dd/yyyy") : "-"),
    enableGlobalFilter: false,
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
