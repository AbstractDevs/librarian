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
              <CopyScriptJsonButton jsonString={scriptJsonString} size="icon" />
              <DownloadScriptJsonButton jsonString={scriptJsonString} scriptId={id} size="icon" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
