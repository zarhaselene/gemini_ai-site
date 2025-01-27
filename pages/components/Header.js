import { useState, useEffect } from "react";

import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Header() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <Navbar fluid className="bg-primary border-b border-black">
      <Navbar.Brand as={Link} href="/#" onClick={() => setCurrentPath("/")}>
        <span className="self-center whitespace-nowrap text-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-pink-700 bg-clip-text text-transparent">
          Netflix Gemini
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          active={currentPath === "/"}
          className="text-gray-text text-base font-semibold"
          href="/#"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="text-gray-text text-base font-semibold"
          href="/julia"
          active={currentPath === "/julia"}
        >
          Julia
        </Navbar.Link>
        <Navbar.Link
          className="text-gray-text text-base font-semibold"
          href="/zarha"
          active={currentPath === "/zarha"}
        >
          Zarha
        </Navbar.Link>
        <Navbar.Link
          className="text-gray-text text-base font-semibold"
          href="/robin"
          active={currentPath === "/robin"}
        >
          Robin
        </Navbar.Link>
        <Navbar.Link
          className="text-gray-text text-base font-semibold"
          href="/bassem"
          active={currentPath === "/bassem"}
        >
          Bassem
        </Navbar.Link>
        <Navbar.Link
          className="text-gray-text text-base font-semibold"
          href="/Mohammed"
          active={currentPath === "/mohammed"}
        >
          Mohammed
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
