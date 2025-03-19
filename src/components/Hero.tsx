import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
const Hero: React.FC = () => {
  return <section className="pt-36 md:pt-48 pb-32 md:pb-48 bg-gradient-to-b from-white to-tarsal-muted flex flex-col items-center justify-between min-h-[90vh] my-0 py-[40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-between my-0 py-0">
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-black" style={{
          animationDelay: '0.1s'
        }}>
            Cele dneve v neudobnih čevljih, brez časa za vadbo, 
            <span className="text-red-600 font-extrabold"> bolečina v stopalih</span> postaja <span className="text-tarsal-accent">stalna</span>
          </h1>
          
          
          {/* First button - new button added above */}
          
        </div>
        
        <div className="mt-auto pt-12"></div> {/* This pushes the button to the bottom third */}
        
        {/* Second button - positioned at the bottom third */}
        <div className="text-center pb-8 my-[82px]">
          <a href="#pricing" className={cn("inline-flex items-center justify-center", "cta-button text-lg", "animate-fade-in")} style={{
          animationDelay: '0.3s'
        }}>
            Rešite svoje težave zdaj
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
        
        {/* Expert testimonial section */}
        <div className="pt-8 pb-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <img src="/lovable-uploads/bf002e75-f7c8-47de-8d94-73f12b1efdd4.png" alt="Marko Macuh" className="w-full h-auto rounded-lg shadow-md object-cover max-w-[200px]" />
                <div className="absolute -bottom-3 -right-3 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-tarsal-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-1">Marko Macuh</h3>
              <p className="text-tarsal-accent font-semibold mb-2">Priznani fizioterapevt in specialist za ortopedske težave</p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                {["Specialist za ortopedske težave", "Certificiran klinični fizioterapevt", "10+ let kliničnih izkušenj"].map((credential, index) => <Badge key={index} variant="outline" className="bg-gray-50">
                    {credential}
                  </Badge>)}
              </div>
              <blockquote className="text-sm md:text-base italic leading-relaxed">
                "V svoji praksi sem opazil, da večina težav s stopali izvira iz nepravilne obremenitve. TOE razbremeni kritične točke in pomaga preprečiti deformacije. Svojim pacientom ga priporočam kot preventivno rešitev, ki je enostavna za uporabo in učinkovita."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;