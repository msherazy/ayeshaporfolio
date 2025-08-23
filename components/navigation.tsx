"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          <a href='#' className='flex items-center space-x-2 font-bold text-xl'>
            <span className='text-white font-semibold tracking-tight'>
              Ayesha Fayyaz
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='text-white/80 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm'
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
            <Button
              size='sm'
              className='bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm transition-all duration-300'
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden glass border-t border-white/20'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className='flex items-center justify-between px-3 py-2'>
                <span className='text-white/80'>Theme</span>
                <ThemeToggle />
              </div>
              <div className='px-3 py-2'>
                <Button
                  size='sm'
                  className='w-full bg-white/20 hover:bg-white/30 text-white border-white/20'
                >
                  Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
