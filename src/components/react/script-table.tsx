import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Script } from "@/utils/script";
import { CopyScriptJsonButton } from "./copy-script-json-button";
import { DownloadScriptJsonButton } from "./download-script-json-button";
import { useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export const ScriptTable = ({ scripts }: { scripts: Script[] }) => {
  const [query, setQuery] = useState("");

  const filteredScripts = scripts.filter((script) => {
    return (
      script.name.toLowerCase().includes(query.toLowerCase()) ||
      script.author.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <SearchIcon
          className={cn("absolute left-3 h-4 w-4 shrink-0 opacity-50", query !== "" && "hidden")}
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, author"
          className="placeholder:pl-5"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Script</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Characters</TableHead>
            <TableHead>Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredScripts.map(({ id, author, name, characterBreakdown, scriptJsonString }) => (
            <TableRow
              key={id}
              onClick={() => {
                window.location.href = `/scripts/${id}`;
              }}
              className="cursor-pointer"
            >
              <TableCell>{name}</TableCell>
              <TableCell>{author}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <CopyScriptJsonButton jsonString={scriptJsonString} size="icon" />
                <DownloadScriptJsonButton jsonString={scriptJsonString} scriptId={id} size="icon" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
