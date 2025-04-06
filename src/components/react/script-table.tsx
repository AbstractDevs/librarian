import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import type { Script } from "@/utils/script";
import { Button } from "../ui/button";
import { ClipboardCopyIcon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { JSONDownloadButton } from "../ui/download-button";

export const ScriptTable = ({ scripts }: { scripts: Script[] }) => {
  return (
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
        {scripts.map(({ id, author, name, characterBreakdown, scriptJsonString }) => (
          <TableRow
            key={id}
            onClick={() => (window.location.href = `/scripts/${id}`)}
            className="cursor-pointer"
          >
            <TableCell>{name}</TableCell>
            <TableCell>{author}</TableCell>
            <TableCell>
              {characterBreakdown.townsfolkCount} / {characterBreakdown.outsiderCount} /{" "}
              {characterBreakdown.minionCount} / {characterBreakdown.demonCount}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard
                          .writeText(scriptJsonString)
                          .then(() => {
                            toast.success("JSON copied to clipboard", {
                              description: "You can paste it into botc.app to play",
                            });
                          })
                          .catch(() => {
                            toast.error("Something went wrong", {
                              description: "Please try again or refresh the page",
                            });
                          });
                      }}
                      variant="outline"
                    >
                      <ClipboardCopyIcon />
                      <span className="sr-only">Copy Script JSON</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy JSON</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <JSONDownloadButton
                      jsonString={scriptJsonString}
                      fileName={`${id.replaceAll("/", "-")}.json`}
                    >
                      <DownloadIcon />
                      <span className="sr-only">Download Script JSON</span>
                    </JSONDownloadButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download JSON</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
