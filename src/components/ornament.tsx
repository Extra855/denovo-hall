import type { CSSProperties } from "react";

export function Ornament({
   className = "",
   style,
}: {
   className?: string;
   style?: CSSProperties;
}) {
   return (
      <div className={`flex items-center justify-center gap-4 ${className}`} style={style}>
         <div className="w-12 h-px bg-champagne/50" />
         <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-champagne/60"
         >
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <circle cx="6" cy="6" r="2" fill="currentColor" />
         </svg>
         <div className="w-12 h-px bg-champagne/50" />
      </div>
   );
}
