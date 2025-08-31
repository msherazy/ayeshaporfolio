"use client";

import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navigation
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navigation
        setIsVisible(true);
      }
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["", "about", "skills", "projects", "experience", "contact"];
      
      // Special handling for top of page (Home section)
      if (currentScrollY < 100) {
        setActiveSection("");
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Get navigation bar height (64px mobile, 80px desktop) + extra padding
      const navHeight = window.innerWidth >= 768 ? 100 : 84; // 80px + 20px padding for desktop, 64px + 20px for mobile
      const scrollPosition = currentScrollY + navHeight;
      
      // Find the current active section
      let activeSectionFound = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i] || "hero");
        if (section && section.offsetTop <= scrollPosition) {
          activeSectionFound = sections[i];
          break;
        }
      }
      
      setActiveSection(activeSectionFound);
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === "#") {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get navigation bar height (64px mobile, 80px desktop)
      const navHeight = window.innerWidth >= 768 ? 80 : 64;
      const targetPosition = targetElement.offsetTop - navHeight - 20; // Extra 20px padding
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? "glass shadow-2xl" : "bg-transparent"
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-center h-16 md:h-20'>
          {/* Navigation Pills - All Devices */}
          <div className='flex items-center'>
            <div className='flex items-center space-x-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg'>
              {navItems.map((item, index) => {
                const isActive = activeSection === (item.href === "#" ? "" : item.href.substring(1));
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-[#1d3557] bg-gradient-to-r from-[#a8dadc] to-[#457b9d] shadow-md'
                        : 'text-white/80 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#a8dadc] to-[#457b9d] opacity-20 animate-pulse'></div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
