import type { CharacterName } from "@/data/characters/registry";

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
  scriptJsonString: string;
  characters: CharacterName[];
};
