import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);
  
  useEffect(() => {
    // Handle showing sticky CTA after 20 seconds
    const timeoutId = setTimeout(() => {
      setShowStickyCta(true);
    }, 20000); // 20 seconds
    
    // Handle showing sticky CTA after scrolling 50% of page
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / (pageHeight - windowHeight)) * 100;
      
      if (scrollPercentage >= 50) {
        setShowStickyCta(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Rest of the component remains the same
  return (
    <footer className="bg-tarsal-DEFAULT text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">TARSAL</h2>
            <p className="text-gray-300 mb-4 max-w-md">
              Inovativne rešitve za zdrava stopala in boljšo kakovost življenja. Razvito v Sloveniji s strani strokovnjakov za fizioterapijo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.214c0 2.716-.012 3.056-.06 4.122-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.214c-2.717 0-3.057-.012-4.123-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Povezava</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">O nas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Kontakt</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Pogosta vprašanja</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Pomembno</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Pogoji poslovanja</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Politika zasebnosti</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Dostava</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Reklamacije</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex space-x-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">100% jamstvo zadovoljstva</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2H9zm9-4h1a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v9a2 2 0 0 0 2 2h1v-9a6 6 0 0 1 12 0v9zm-2 0V9a4 4 0 1 0-8 0v9h8z" />
                </svg>
              </div>
              <span className="text-sm text-gray-300">Razvito v Sloveniji</span>
              
              <div className="bg-white/10 p-2 rounded-full ml-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8C8 10 5.9 16.17 5.9 16.17A3 3 0 0 0 6 17v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a10 10 0 0 1 14-9zm-6 9v1h2v1h-4v-1a1 1 0 0 1 1-1h1zm8-1v1h-1v1h-1v-1h-1v-1h1v-1h1v1h1z" />
                </svg>
              </div>
              <span className="text-sm text-gray-300">Kvaliteten material</span>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} TARSAL. Vse pravice pridržane.</p>
          </div>
        </div>
      </div>
      
      {/* Sticky Footer CTA with conditional visibility */}
      <div className={cn("sticky-cta bg-white shadow-lg py-3 border-t border-gray-200", {
        "hidden": !showStickyCta
      })}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="hidden md:block text-tarsal-DEFAULT font-semibold">
              Tarsal TOE - 20% popusta
            </div>
            <a 
              href="#pricing" 
              className="cta-button w-full md:w-auto text-center"
            >
              Naroči Tarsal Toe 20% popusta in gratis vajami za vadbo doma
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
