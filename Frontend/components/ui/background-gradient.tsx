import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#06b6d4] transition duration-300 group-hover:from-[#06b6d4] group-hover:via-[#14b8a6] group-hover:to-[#10b981]",
          animate && "animate-pulse"
        )}
      />
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