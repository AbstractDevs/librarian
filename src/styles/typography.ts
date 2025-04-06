import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl lg:text-5xl font-bold tracking-tight",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
      body: "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      "body-lg": "text-lg leading-relaxed",
      label: "text-sm font-medium",
      "label-sm": "text-xs font-medium",
      "label-lg": "text-base font-medium",
      caption: "text-sm text-foreground/50",
      "caption-sm": "text-xs text-foreground/50",
      "caption-lg": "text-base text-foreground/50",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;
export type TypographyVariant = NonNullable<TypographyVariants["variant"]>;
