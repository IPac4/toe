
import React from 'react';
import FooterFAQ from './FooterFAQ';
import FooterLinks from './FooterLinks';
import FooterBottom from './FooterBottom';
import StickyCTA from './StickyCTA';
import { faqItems } from '../data/faqData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tarsal-DEFAULT text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="faq">
          <FooterFAQ faqItems={faqItems} />
        </div>
        <FooterLinks />
        <FooterBottom />
      </div>
      
      <StickyCTA />
    </footer>
  );
};

export default Footer;
