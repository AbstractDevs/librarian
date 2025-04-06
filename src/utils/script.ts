import { CharacterNameSchema, characterRegistry } from "@/data/characters/registry";
import type { CollectionEntry } from "astro:content";
import { match } from "ts-pattern";

export type Script = {
  id: string;
  name: string;
  author: string;
  characterBreakdown: {
    townsfolkCount: number;
    outsiderCount: number;
    minionCount: number;
    demonCount: number;
  };
};

export const parseScriptData = (script: CollectionEntry<"scripts">): Script => {
  const [meta, ...characters] = script.data;

  const characterBreakdown = characters.reduce(
    (acc, character) => {
      const parsedCharacter = CharacterNameSchema.parse(character);

      const entry = characterRegistry[parsedCharacter];

      match(entry.type)
        .with("townsfolk", () => {
          acc.townsfolkCount++;
        })
        .with("outsider", () => {
          acc.outsiderCount++;
        })
        .with("minion", () => {
          acc.minionCount++;
        })
        .with("demon", () => {
          acc.demonCount++;
        });

      return acc;
    },
    {
      demonCount: 0,
      minionCount: 0,
      outsiderCount: 0,
      townsfolkCount: 0,
    } as Script["characterBreakdown"],
  );

  return {
    id: script.id,
    name: meta.name,
    author: meta.author,
    characterBreakdown,
  };
};
