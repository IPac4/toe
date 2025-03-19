
import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ConsequencesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kaj se zgodi, če ne ukrepamo?</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Visoke pete, ozki čevlji in dolgotrajno nošenje neprimerne obutve lahko na dolgi rok povzročijo resne težave s stopali.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Hallux valgus (krivi palec)</h3>
                    <p className="text-gray-700">Boleča in napredujoča deformacija, ki oteži nošenje elegantnih čevljev.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Kladivasti prsti</h3>
                    <p className="text-gray-700">Nepravilno ukrivljeni prsti, ki povzročajo pritisk, bolečine in težave pri hoji.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Otiščanci in kurja očesa</h3>
                    <p className="text-gray-700">Zaradi drgnjenja in pritiska se pojavijo boleče zadebelitve kože.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Neenakomerna obremenitev stopala</h3>
                    <p className="text-gray-700">Zaradi nepravilne drže se pojavijo bolečine v gležnjih, kolenih in hrbtenici.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Alert className="mt-6 border-red-200 bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <AlertTitle className="text-red-700">Ne čakajte na poslabšanje</AlertTitle>
              <AlertDescription className="text-red-600">
                Sprva se pojavijo le rahle bolečine ali občutek utrujenosti, a če težav ne naslovimo pravočasno, lahko pride do trajnih deformacij.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Using AspectRatio to maintain proper image proportion on all devices */}
              <div className="rounded-xl overflow-hidden">
                <AspectRatio ratio={4/3} className="w-full">
                  <img 
                    src="/lovable-uploads/98515799-1899-42ed-8c20-210878e81c5f.png" 
                    alt="Hallux valgus - krivi palec" 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
            
            {/* Consequences box moved below the image, centered */}
            <div className="mt-8 mx-auto bg-white p-4 rounded-lg shadow-lg max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
              <h4 className="text-xl font-bold text-red-600 mb-2 text-center">Posledice so lahko trajne!</h4>
              <p className="text-gray-700 mb-4 text-center">Preprečite hujše težave s pravočasnim ukrepanjem.</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-none cta-button">
                Preprečite težave zdaj
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold mb-6 max-w-3xl mx-auto">
            Ne dovolite, da vaša stopala plačajo ceno lepih, a nepraktičnih čevljev. TOE vam omogoča, da ohranite eleganco, hkrati pa preprečite neprijetne posledice nepravilne obutve!
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full text-lg cta-button">
            Ukrepajte zdaj
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConsequencesSection;
