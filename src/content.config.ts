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

const scriptChangelogs = defineCollection({
  loader: glob({ pattern: "**/CHANGELOG.md", base: "./src/data/scripts" }),
});

const scriptReadmes = defineCollection({
  loader: glob({ pattern: "**/README.md", base: "./src/data/scripts" }),
  schema: ({ image }) =>
    z.object({
      frontImage: image().optional(),
      backImage: image().optional(),
    }),
});

export const collections = { scripts, scriptChangelogs, scriptReadmes };
