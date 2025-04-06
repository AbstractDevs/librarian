import { ClipboardCopyIcon, DownloadIcon } from "lucide-react";
import { CopyButton } from "../ui/copy-button";
import { DownloadButton } from "../ui/download-button";
import type { Script } from "@/utils/script";

export const ScriptImageActionButtons = ({
  script,
}: {
  script: Script;
  frontImageSrc?: string;
  backImageSrc?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <CopyButton
        content={script.scriptJsonString}
        successMessage="JSON copied to clipboard"
        successDescription="You can paste it into botc.app to play"
        variant="outline"
      >
        <ClipboardCopyIcon />
        <span> Copy JSON</span>
      </CopyButton>
      <DownloadButton content={script.scriptJsonString} fileName={`${script.name}.json`}>
        <DownloadIcon />
        <span>Download JSON</span>
      </DownloadButton>
    </div>
  );
};
