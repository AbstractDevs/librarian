import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { Script } from "@/types/script";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Check, SearchIcon, UserIcon, XIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Typography } from "../typography";
import { Button } from "@/components/ui/button";
import { characterRegistry, type CharacterName } from "@/data/characters/registry";

const characterEntries = Object.entries(characterRegistry);

const townsfolkOptions = characterEntries.filter(
  ([_, character]) => character.type === "townsfolk",
);

const outsiderOptions = characterEntries.filter(([_, character]) => character.type === "outsider");

const minionOptions = characterEntries.filter(([_, character]) => character.type === "minion");

const demonOptions = characterEntries.filter(([_, character]) => character.type === "demon");

const characterAutocompleteOptions = [
  { label: "Townsfolk", options: townsfolkOptions },
  { label: "Outsiders", options: outsiderOptions },
  { label: "Minions", options: minionOptions },
  { label: "Demons", options: demonOptions },
];

export const ScriptTable = ({ scripts }: { scripts: Script[] }) => {
  const [globalFilter, setGlobalFilter] = useState<{
    selectedCharacters: CharacterName[];
    filterText: string;
  }>({
    selectedCharacters: [],
    filterText: "",
  });

  const table = useReactTable({
    data: scripts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
    globalFilterFn: (row, _, { filterText, selectedCharacters }: typeof globalFilter) => {
      const name = row.getValue("name") as string;
      const author = row.getValue("author") as string;

      const matchesName =
        filterText === "" || name.toLowerCase().includes(filterText.toLowerCase());
      const matchesAuthor =
        filterText === "" || author.toLowerCase().includes(filterText.toLowerCase());

      const matchesCharacters =
        selectedCharacters.length === 0 ||
        selectedCharacters.every((character) => row.original.characters.includes(character));

      return (matchesName || matchesAuthor) && matchesCharacters;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex flex-1 items-center">
          <SearchIcon
            className={cn(
              "absolute left-3 h-4 w-4 shrink-0 opacity-50",
              globalFilter.filterText !== "" && "hidden",
            )}
          />
          <Input
            type="text"
            onChange={(event) =>
              setGlobalFilter({
                ...globalFilter,
                filterText: String(event.target.value),
              })
            }
            placeholder="Search by name, author"
            className="placeholder:pl-5"
          />
        </div>
        <div className="flex items-center gap-0.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="justify-between">
                <UserIcon />
                {globalFilter.selectedCharacters.length > 0
                  ? `${globalFilter.selectedCharacters.length} Character${globalFilter.selectedCharacters.length > 1 ? "s" : ""}`
                  : "Filter by Character"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search characters..." />
                <CommandList>
                  <CommandEmpty>No characters found</CommandEmpty>
                  {characterAutocompleteOptions.map(({ label, options }) => (
                    <CommandGroup key={label} heading={label}>
                      {options.map(([key, character]) => (
                        <CommandItem
                          key={key}
                          value={key}
                          onSelect={() => {
                            if (!globalFilter.selectedCharacters.includes(key as CharacterName)) {
                              setGlobalFilter((prev) => ({
                                ...prev,
                                selectedCharacters: [
                                  ...prev.selectedCharacters,
                                  key as CharacterName,
                                ],
                              }));
                            } else {
                              setGlobalFilter((prev) => ({
                                ...globalFilter,
                                selectedCharacters: prev.selectedCharacters.filter(
                                  (character) => character !== key,
                                ),
                              }));
                            }
                          }}
                        >
                          {character.displayName}
                          <Check
                            className={cn(
                              "ml-auto",
                              globalFilter.selectedCharacters.includes(key as CharacterName)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              setGlobalFilter({
                ...globalFilter,
                selectedCharacters: [],
              })
            }
          >
            <XIcon />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  window.location.href = `/scripts/${row.original.id}`;
                }}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Typography variant="caption">No results.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
