"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { toggleVariants } from "@ryuu/design/components/ui/toggle";
import { cn } from "@ryuu/design/lib/utils";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({ size: "default", variant: "default" });

function ToggleGroup({
  ref,
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext value={{ variant, size }}>
        {children}
      </ToggleGroupContext>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  ref,
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.use(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
