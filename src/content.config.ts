import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const scripts = defineCollection({
  loader: glob({ pattern: "src/scripts/**/*.json" }),
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
