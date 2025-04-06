import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Script } from "@/utils/script";

export const ScriptTable = ({ scripts }: { scripts: Script[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Script</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Characters</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scripts.map(({ id, author, name, characterBreakdown }) => (
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
            <TableCell>TODO</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
