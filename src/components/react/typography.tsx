import {
  typographyVariants,
  type TypographyVariant,
  type TypographyVariants,
} from "@/styles/typography";
import { cn } from "@/utils/cn";
import { match } from "ts-pattern";

interface TypographyProps extends React.HTMLAttributes<HTMLElement>, TypographyVariants {
  variant?: TypographyVariant;
}

export const Typography = ({ variant, className, ...rest }: TypographyProps) => {
  return match(variant)
    .with("h1", () => (
      <h1 {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </h1>
    ))
    .with("h2", () => (
      <h2 {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </h2>
    ))
    .with("h3", () => (
      <h3 {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </h3>
    ))
    .with("h4", () => (
      <h4 {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </h4>
    ))
    .with("h5", () => (
      <h5 {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </h5>
    ))
    .with("h6", () => (
      <h6 {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </h6>
    ))
    .otherwise(() => (
      <p {...rest} className={cn(typographyVariants({ variant, className }))}>
        <slot />
      </p>
    ));
};
