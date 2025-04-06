import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CollectionEntry } from "astro:content";

export const ScriptTable = ({ scripts }: { scripts: CollectionEntry<"scripts">[] }) => {
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
        {scripts.map(({ data, id }) => (
          <TableRow
            key={id}
            onClick={() => (window.location.href = `/scripts/${id}`)}
            className="cursor-pointer"
          >
            <TableCell>{data[0].name}</TableCell>
            <TableCell>{data[0].author}</TableCell>
            <TableCell>TODO</TableCell>
            <TableCell>TODO</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
