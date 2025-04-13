import { CharacterNameSchema, CharacterTypeSchema } from "@/data/characters/registry";
import { z } from "astro/zod";

export const CharacterSchema = z.discriminatedUnion("scriptType", [
  z.object({
    scriptType: z.literal("official"),
    name: CharacterNameSchema,
    team: CharacterTypeSchema,
  }),
  // There are more properties here, but we can leave them off until we need them for simplicity
  z.object({
    scriptType: z.literal("homebrew"),
    name: z.string(),
    team: CharacterTypeSchema,
    ability: z.string(),
  }),
]);

export type Character = z.infer<typeof CharacterSchema>;

export const ScriptTypeSchema = z.enum(["official", "homebrew"]);

export type ScriptType = z.infer<typeof ScriptTypeSchema>;

export const ScriptSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  type: ScriptTypeSchema,
  characterBreakdown: z.object({
    townsfolkCount: z.number(),
    outsiderCount: z.number(),
    minionCount: z.number(),
    demonCount: z.number(),
  }),
  scriptJsonString: z.string(),
  characters: z.array(CharacterSchema),
});

export type Script = z.infer<typeof ScriptSchema>;
