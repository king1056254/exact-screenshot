"use client";

import { cn } from "@/lib/utils";
import type { ElementType } from "react";
import { memo } from "react";

export interface TextShimmerProps {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
}

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
}: TextShimmerProps) => {
  return (
    <Component className={cn("inline-block text-muted-foreground motion-safe:animate-pulse", className)}>
      {children}
    </Component>
  );
};

export const Shimmer = memo(ShimmerComponent);
