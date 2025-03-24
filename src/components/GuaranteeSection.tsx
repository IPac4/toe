
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-xl bg-white shadow-lg border border-gray-100">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-tarsal-accent/10 flex items-center justify-center">
              <ShieldCheck className="h-10 w-10 text-tarsal-accent" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl font-bold mb-2">30-dnevna garancija zadovoljstva</h3>
            <p className="text-gray-700 max-w-3xl">
              Če z našim izdelkom iz kakršnegakoli razloga niste zadovoljni, vam v 30 dneh vrnemo denar. 
              Brez vprašanj, brez zapletov. Vaše zadovoljstvo je naša prioriteta!
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <a href="#pricing" className="cta-button shadow-lg transform transition hover:-translate-y-1">
              Naroči brez tveganja
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
