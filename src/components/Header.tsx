
import React from 'react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/4e1de179-2e39-4459-81ff-6790bc8f90c3.png" 
              alt="TARSAL" 
              className="h-7 md:h-8"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#product" className="text-sm font-medium text-gray-700 hover:text-tarsal-accent transition-colors">
              Produkt
            </a>
            <a href="#experts" className="text-sm font-medium text-gray-700 hover:text-tarsal-accent transition-colors">
              Strokovnjaki
            </a>
            <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-tarsal-accent transition-colors">
              Prednosti
            </a>
            <a href="#reviews" className="text-sm font-medium text-gray-700 hover:text-tarsal-accent transition-colors">
              Mnenja
            </a>
          </nav>
          <div>
            <a 
              href="#pricing" 
              className={cn(
                "hidden md:inline-flex",
                "bg-tarsal-accent hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full",
                "transition duration-300 ease-in-out",
                "text-sm"
              )}
            >
              Naročite zdaj
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
