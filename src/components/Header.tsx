
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#product", label: "Produkt" },
    { 
      href: "#experts", 
      label: "Strokovnjaki",
      isDropdown: true,
      dropdownItems: [
        { href: "#expert-luka", label: "Luka Mirnik" },
        { href: "#expert-jure", label: "Jure Pantar" },
        { href: "#expert-macuh", label: "Marko Macuh" },
      ]
    },
    { href: "#benefits", label: "Prednosti" },
    { href: "#reviews", label: "Mnenja" },
    { href: "#faq", label: "FAQ" }
  ];

  // Function to handle smooth scroll with header offset
  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId.replace('#', ''));
    
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const offset = headerHeight + 20; // Add extra padding
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  return <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <img alt="TARSAL" className="h-7 md:h-8" src="/lovable-uploads/580c1b20-695e-4c98-8328-d5975963356f.png" />
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger className="text-sm font-medium text-gray-700 hover:text-tarsal-accent transition-colors outline-none flex items-center">
                    {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-white">
                    {link.dropdownItems?.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <a 
                          href={item.href} 
                          className="text-sm font-medium text-gray-700 hover:text-tarsal-accent cursor-pointer w-full"
                          onClick={(e) => handleSmoothScroll(e, item.href)}
                        >
                          {item.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-sm font-medium text-gray-700 hover:text-tarsal-accent transition-colors"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>
          
          {/* Mobile navigation */}
          <div className="flex items-center gap-4">
            <a 
              href="#pricing" 
              className={cn("hidden md:inline-flex", "bg-tarsal-accent hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full", "transition duration-300 ease-in-out", "text-sm")}
              onClick={(e) => handleSmoothScroll(e, "#pricing")}
            >
              Naročite zdaj
            </a>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2 text-gray-700 focus:outline-none">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] md:hidden">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <img alt="TARSAL" className="h-7" src="/lovable-uploads/580c1b20-695e-4c98-8328-d5975963356f.png" />
                    <button onClick={() => setIsOpen(false)} className="p-2 text-gray-700 focus:outline-none">
                      <X size={20} />
                    </button>
                  </div>
                  <nav className="flex flex-col space-y-4 py-8">
                    {navLinks.map((link) => (
                      link.isDropdown ? (
                        <div key={link.href} className="space-y-2">
                          <div className="text-base font-medium text-gray-700">
                            {link.label}
                          </div>
                          <div className="pl-4 space-y-2">
                            {link.dropdownItems?.map((item) => (
                              <a 
                                key={item.href}
                                href={item.href} 
                                onClick={(e) => handleSmoothScroll(e, item.href)}
                                className="block text-sm font-medium text-gray-600 hover:text-tarsal-accent transition-colors py-1"
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a 
                          key={link.href}
                          href={link.href} 
                          onClick={(e) => handleSmoothScroll(e, link.href)}
                          className="text-base font-medium text-gray-700 hover:text-tarsal-accent transition-colors py-2"
                        >
                          {link.label}
                        </a>
                      )
                    ))}
                    <a 
                      href="#pricing" 
                      onClick={(e) => handleSmoothScroll(e, "#pricing")}
                      className={cn(
                        "bg-tarsal-accent hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-full text-center",
                        "transition duration-300 ease-in-out mt-4",
                        "text-sm"
                      )}
                    >
                      Naročite zdaj
                    </a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
};

export default Header;
