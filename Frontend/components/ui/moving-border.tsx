"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<number>(0);
  const [length, setLength] = React.useState<number>(0);

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current = (progressRef.current + 1) % 100;
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={cn(
        "relative p-[2px] overflow-hidden rounded-3xl",
        containerClassName
      )}
      style={{
        background: `conic-gradient(from ${progressRef.current}deg, #38bdf8, #0ea5e9, #06b6d4, #14b8a6, #10b981, #38bdf8)`,
      }}
      {...props}
    >
      <div
        className={cn(
          "relative bg-black/50 backdrop-blur-sm rounded-[22px] p-px",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};