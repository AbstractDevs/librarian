import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const scripts = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/scripts" }),
  schema: z
    .tuple([
      z.object({
        id: z.literal("_meta"),
        author: z.string(),
        name: z.string(),
      }),
    ])
    .rest(z.string()),
});

export const collections = { scripts };
