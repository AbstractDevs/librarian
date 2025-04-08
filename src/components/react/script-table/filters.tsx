import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Input } from "../../ui/input";
import { Check, SearchIcon, UserIcon, XIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { characterRegistry, type CharacterName } from "@/data/characters/registry";

export type TableFilter = {
  selectedCharacters: CharacterName[];
  filterText: string;
};

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

export const Filters = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: TableFilter;
  setGlobalFilter: React.Dispatch<React.SetStateAction<TableFilter>>;
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 md:flex-row">
      <div className="relative flex w-full flex-1 items-center md:w-auto">
        <SearchIcon className="absolute left-3 size-4 shrink-0 opacity-50" />
        <Input
          type="text"
          onChange={(event) =>
            setGlobalFilter({
              ...globalFilter,
              filterText: String(event.target.value),
            })
          }
          placeholder="Search by name, author"
          className="pl-8"
        />
      </div>
      <div className="flex w-full items-center gap-1.5 md:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="neutral" role="combobox" className="flex-1 md:flex-none">
              <UserIcon />
              {globalFilter.selectedCharacters.length > 0
                ? `${globalFilter.selectedCharacters.length} Character${globalFilter.selectedCharacters.length > 1 ? "s" : ""}`
                : "Filter by Character"}
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" avoidCollisions={false} className="p-0">
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
          variant="default"
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
  );
};
