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
import { ClipboardCopyIcon, DownloadIcon } from "lucide-react";
import { DownloadButton } from "../ui/download-button";
import { CopyButton } from "../ui/copy-button";

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
                    <CopyButton
                      content={scriptJsonString}
                      successMessage="JSON copied to clipboard"
                      successDescription="You can paste it into botc.app to play"
                      size="icon"
                      variant="outline"
                    >
                      <ClipboardCopyIcon />
                      <span className="sr-only">Copy Script JSON</span>
                    </CopyButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy JSON</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DownloadButton
                      content={scriptJsonString}
                      fileName={`${id.replaceAll("/", "-")}.json`}
                      size="icon"
                    >
                      <DownloadIcon />
                      <span className="sr-only">Download Script JSON</span>
                    </DownloadButton>
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
