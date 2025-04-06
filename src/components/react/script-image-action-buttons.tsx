import type { Script } from "@/utils/script";
import { CopyScriptJsonButton } from "./copy-script-json-button";
import { DownloadScriptJsonButton } from "./download-script-json-button";

export const ScriptImageActionButtons = ({
  script,
}: {
  script: Script;
  frontImageSrc?: string;
  backImageSrc?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <CopyScriptJsonButton jsonString={script.scriptJsonString} />
      <DownloadScriptJsonButton jsonString={script.scriptJsonString} scriptId={script.id} />
    </div>
  );
};
