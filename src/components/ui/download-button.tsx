import { Button, type ButtonProps } from "./button";

interface DownloadButtonProps extends ButtonProps {
  content: string;
  fileName: string;
  contentType?: string;
}

export const DownloadButton = ({
  content,
  fileName,
  children,
  contentType = "application/json",
  ...props
}: DownloadButtonProps) => {
  return (
    <Button
      {...props}
      onClick={(e) => {
        e.stopPropagation();

        const blob = new Blob([content], {
          type: contentType,
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }}
    >
      {children}
    </Button>
  );
};
