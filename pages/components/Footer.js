"use client";

import { Footer } from "flowbite-react";

export function FooterCustom() {
  return (
    <section className="fixed bottom-0 min-w-full border-t border-black">
      <Footer container className="flex flex-col bg-primary rounded-none p-4">
        <Footer.Copyright href="#" by="Netflix Gemini™" year={2025} />
      </Footer>
    </section>
  );
}
