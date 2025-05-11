import { CharacterNameSchema, characterRegistry } from "@/data/characters/registry";
import { CharacterSchema, type Script } from "@/types/script";
import { getEntry, type CollectionEntry } from "astro:content";
import { match } from "ts-pattern";

export const parseScriptData = (script: CollectionEntry<"scripts">): Script => {
  const [meta, ...characters] = script.data;

  const scriptType = "almanac" in meta ? "homebrew" : "official";

  const characterBreakdown = {
    demonCount: 0,
    minionCount: 0,
    outsiderCount: 0,
    townsfolkCount: 0,
  } as Script["characterBreakdown"];

  const characterList = characters.map((character) => {
    let parsedCharacter;
    if (typeof character === "string") {
      const parsedCharacterName = CharacterNameSchema.parse(character);
      const entry = characterRegistry[parsedCharacterName];

      parsedCharacter = CharacterSchema.parse({
        scriptType: "official",
        name: parsedCharacterName,
        team: entry.type,
      });
    } else {
      parsedCharacter = CharacterSchema.parse({
        scriptType: "homebrew",
        ...character,
      });
    }

    match(parsedCharacter.team)
      .with("townsfolk", () => {
        characterBreakdown.townsfolkCount++;
      })
      .with("outsider", () => {
        characterBreakdown.outsiderCount++;
      })
      .with("minion", () => {
        characterBreakdown.minionCount++;
      })
      .with("demon", () => {
        characterBreakdown.demonCount++;
      });

    return parsedCharacter;
  });

  return {
    id: script.id,
    name: meta.name,
    author: meta.author,
    type: scriptType,
    characterBreakdown,
    characters: characterList,
    scriptJsonString: JSON.stringify(script.data),
  };
};

export const getScriptReadme = async (scriptId: string) => {
  const [base] = scriptId.split("/");

  // TODO: likely a much better way to do this linkage
  const readme = await getEntry("scriptReadmes", `${base}/readme`);

  if (!readme) {
    throw new Error(`Script ${scriptId} must contain a README`);
  }

  return readme;
};

export const getScriptChangelog = async (scriptId: string) => {
  const [base] = scriptId.split("/");

  const changelog = await getEntry("scriptChangelogs", `${base}/changelog`);

  return changelog;
};

export const getScriptHistory = ({
  allScripts,
  scriptId,
}: {
  allScripts: CollectionEntry<"scripts">[];
  scriptId: string;
}) => {
  const [base] = scriptId.split("/");

  // TODO: likely a much better way to do this?
  return allScripts
    .filter(({ id }) => id.startsWith(base) && id.includes("/history/"))
    .sort((a, b) => b.id.localeCompare(a.id))
    .map((script) => parseScriptData(script));
};
