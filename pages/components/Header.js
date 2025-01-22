"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Header() {
  return (
    <Navbar fluid rounded className="bg-primary">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Netflix Gemini
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/julia">Julia</Navbar.Link>
        <Navbar.Link href="/zarha">Zarha</Navbar.Link>
        <Navbar.Link href="/robin">Robin</Navbar.Link>
        <Navbar.Link href="/bassem">Bassem</Navbar.Link>
        <Navbar.Link href="#">Mohammed</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
