import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ScriptImageTabs = ({
  frontImage,
  backImage,
}: {
  frontImage: { src: string; height: number; width: number };
  backImage: { src: string; height: number; width: number };
}) => {
  return (
    <Tabs defaultValue="front">
      <TabsList className="w-full">
        <TabsTrigger value="front">Characters</TabsTrigger>
        <TabsTrigger value="back">Night Order</TabsTrigger>
      </TabsList>
      <TabsContent value="front">
        <a href={frontImage.src} target="_blank" rel="noreferrer">
          <img
            className="h-auto max-w-full"
            src={frontImage.src}
            alt="front image"
            width={frontImage.width}
            height={frontImage.height}
          />
        </a>
      </TabsContent>
      <TabsContent value="back">
        <a href={backImage.src} target="_blank" rel="noreferrer">
          <img
            className="h-auto max-w-full"
            src={backImage.src}
            alt="back image"
            width={backImage.width}
            height={backImage.height}
          />
        </a>
      </TabsContent>
    </Tabs>
  );
};
