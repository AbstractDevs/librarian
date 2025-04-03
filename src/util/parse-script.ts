import type { Script } from "@/types/script";

export const parseScript = (script: Script) => {
  const [meta, ...characters] = script;

  return {
    meta,
    characters,
  };
};
