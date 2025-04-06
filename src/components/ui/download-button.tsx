import { Button, type ButtonProps } from "./button";

interface JSONDownloadButtonProps extends ButtonProps {
  jsonString: string;
  fileName: string;
}

export const JSONDownloadButton = ({
  jsonString,
  fileName,
  children,
  ...props
}: JSONDownloadButtonProps) => {
  return (
    <Button
      {...props}
      onClick={(e) => {
        e.stopPropagation();

        const blob = new Blob([jsonString], {
          type: "application/json",
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
