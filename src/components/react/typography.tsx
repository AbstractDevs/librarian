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

export const Typography = ({ variant, children, className, ...rest }: TypographyProps) => {
  return match(variant)
    .with("h1", () => (
      <h1 {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </h1>
    ))
    .with("h2", () => (
      <h2 {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </h2>
    ))
    .with("h3", () => (
      <h3 {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </h3>
    ))
    .with("h4", () => (
      <h4 {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </h4>
    ))
    .with("h5", () => (
      <h5 {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </h5>
    ))
    .with("h6", () => (
      <h6 {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </h6>
    ))
    .otherwise(() => (
      <p {...rest} className={cn(typographyVariants({ variant, className }))}>
        {children}
      </p>
    ));
};
