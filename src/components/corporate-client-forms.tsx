"use client";

import dynamic from "next/dynamic";

const CorporateInquirySection = dynamic(
   () =>
      import("@/components/sections/corporate-inquiry-section").then(
         (m) => m.CorporateInquirySection,
      ),
   { ssr: false },
);

export function CorporateClientForms() {
   return <CorporateInquirySection />;
}
