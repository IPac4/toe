import React from 'react';
import { ShieldCheck, Award, Star } from 'lucide-react';
const CertificatesSection: React.FC = () => {
  return <section className="py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 max-w-4xl mx-auto leading-tight">
          Naročite Tarsal TOE in preizkusite njegovo izjemno učinkovitost 100% brez tveganja!
        </h2>
        
        {/* Gold Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black py-4 px-6 text-center font-bold text-lg md:text-xl mb-12">
          VAŠE NAROČILO JE ZAŠČITENO S 30-DNEVNIM JAMSTVOM VRAČILA DENARJA.
        </div>
        
        {/* Guarantee Statement */}
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-semibold mb-6">
            Želim, da se odločite brez kakršnih koli dvomov ali skrbi, da nespametno ali tvegano zapravljate denar.
          </p>
          
          <p className="text-xl md:text-2xl font-semibold mb-8">
            Zato vam ponujam 30-dnevno jamstvo vračila denarja.
          </p>
        </div>
        
        {/* Certificate Icons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="mb-4 bg-amber-400 rounded-full p-4">
              <ShieldCheck className="h-12 w-12 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Varno naročilo</h3>
            <p>Varna plačila in zaupanja vredna dostava vaše pošiljke.</p>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="mb-4 bg-amber-400 rounded-full p-4">
              <Award className="h-12 w-12 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">30-dnevna garancija</h3>
            <p>Če niste zadovoljni, vam povrnemo celoten znesek nakupa.</p>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="mb-4 bg-amber-400 rounded-full p-4">
              <Star className="h-12 w-12 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% zadovoljstvo</h3>
            <p>Stotine zadovoljnih strank potrjuje kakovost izdelka.</p>
          </div>
        </div>
        
        {/* Certificate Image */}
        <div className="flex justify-center">
          <img alt="100% jamstvo zadovoljstva" className="w-32 h-32" src="/lovable-uploads/43ed392e-6a27-4823-ad82-20c4e92c9276.png" />
        </div>
      </div>
    </section>;
};
export default CertificatesSection;