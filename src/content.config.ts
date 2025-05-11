import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";
import { CharacterTypeSchema } from "./data/characters/registry";

// The `almanac` property is used to determine if a script is homebrew or not
// Scripts using the official script tool have strings as character names
// Bloodstar uses more complex objects for characters
const ScriptDataSchema = z.union([
  z
    .tuple([
      z.object({
        id: z.literal("_meta"),
        author: z.string(),
        name: z.string(),
      }),
    ])
    .rest(
      z.string().or(
        // Whalebuffet/Fishbuffet choose your own character
        // Slightly different than homebrew format from Bloodstar
        z.object({
          id: z.enum([
            "choose_your_own_tf",
            "choose_your_own_out",
            "choose_your_own_min",
            "choose_your_own_dem",
          ]),
          name: z.string(),
          team: z.enum(["townsfolk", "outsider", "minion", "demon"]),
          ability: z.string(),
          special: z.array(
            z.object({
              name: z.literal("bag-duplicate"),
              type: z.literal("selection"),
            }),
          ),
          firstNight: z.literal(1),
          firstNightReminder: z.string(),
        }),
      ),
    ),
  z
    .tuple([
      z.object({
        id: z.literal("_meta"),
        author: z.string(),
        name: z.string(),
        almanac: z.string().url(),
      }),
    ])
    .rest(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        team: CharacterTypeSchema,

        // Unused by librarian, but needed for copying script json
        ability: z.string(),
        image: z.string().url().optional(),
        firstNightReminder: z.string().optional(),
        otherNightReminder: z.string().optional(),
        setup: z.boolean().optional(),
        reminders: z.array(z.string()).optional(),
        firstNight: z.number().optional(),
        otherNight: z.number().optional(),
      }),
    ),
]);

const scripts = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/scripts" }),
  schema: ScriptDataSchema,
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
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    }),
});

const blogPosts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = {
  scripts,
  scriptChangelogs,
  scriptReadmes,
  blogPosts,
};
