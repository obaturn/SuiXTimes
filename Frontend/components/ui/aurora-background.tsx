"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "transition-bg relative flex h-full w-full items-center justify-center",
        className,
      )}
      {...props}
    >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,var(--chart-1)_10%,var(--chart-2)_15%,var(--chart-3)_20%,var(--chart-4)_25%,var(--chart-5)_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,var(--card)_0%,var(--card)_7%,transparent_10%,transparent_12%,var(--card)_16%)",

              "--blue-700": "var(--chart-1)",
              "--blue-800": "var(--chart-2)",
              "--indigo-700": "var(--chart-3)",
              "--indigo-800": "var(--chart-4)",
              "--purple-700": "var(--chart-5)",
              "--purple-800": "var(--chart-3)",
              "--black": "var(--background)",
              "--white": "var(--card)",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-40 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-800)_10%,var(--indigo-800)_15%,var(--purple-800)_20%,var(--purple-700)_25%,var(--blue-700)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
    </div>
  );
};