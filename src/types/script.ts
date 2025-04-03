import { z } from "astro:content";

export const ScriptSchema = z
  .tuple([
    z.object({
      id: z.literal("_meta"),
      author: z.string(),
      name: z.string(),
    }),
  ])
  .rest(z.string());

export type Script = z.infer<typeof ScriptSchema>;
