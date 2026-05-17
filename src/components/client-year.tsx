"use client";

import { useEffect, useState } from "react";

export function ClientYear() {
   const [year, setYear] = useState<number | null>(null);
   useEffect(() => {
      setYear(new Date().getFullYear());
   }, []);
   return <>{year ?? new Date().getFullYear()}</>;
}
