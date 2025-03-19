
import React from 'react';

const FooterBottom: React.FC = () => {
  return (
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
  );
};

export default FooterBottom;
