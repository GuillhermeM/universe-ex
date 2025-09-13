import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket } from "lucide-react";

export default function Header() {
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "About" },
    { href: "#", label: "Rovers" },
  ];

  return (
    <header className="w-full h-16 px-4 md:px-6 flex items-center justify-between border-b border-gray-800 bg-gray-950 text-white sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <Rocket className="h-6 w-6 text-purple-400" />
        <span className="text-lg font-semibold">UniverseEx</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {navLinks.map((link) => (
          <Button key={link.label} variant="ghost" asChild>
            <Link href={link.href} prefetch={false}>
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bg-transparent border-gray-700 hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-gray-950 text-white border-l-gray-800 w-[250px]"
        >
          <div className="grid gap-4 p-4">
            <Link
              href="#"
              className="flex items-center gap-2 mb-4"
              prefetch={false}
            >
              <Rocket className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-semibold">UniverseEx</span>
            </Link>
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  asChild
                  className="justify-start text-base"
                >
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
