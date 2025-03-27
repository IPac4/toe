import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
const Hero: React.FC = () => {
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
    }
  };
  return <section className="pt-36 md:pt-48 pb-16 md:pb-24 bg-gradient-to-b from-white to-tarsal-muted flex flex-col items-center justify-between min-h-[90vh] my-0 py-0">
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
        
        <div className="mt-auto pt-6"></div> {/* Reduced padding from pt-12 to pt-6 */}
        
        {/* Second button - positioned at the bottom third */}
        <div className="text-center pb-4 my-[40px]"> {/* Reduced padding from pb-8 to pb-4 and my-[82px] to my-[40px] */}
          <a href="#pricing" className={cn("inline-flex items-center justify-center", "cta-button text-lg", "animate-fade-in")} onClick={e => handleSmoothScroll(e, "#pricing")} style={{
          animationDelay: '0.3s'
        }}>
            Rešite svoje težave zdaj
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
        
        {/* Expert testimonial section - using the same layout as before */}
        <div className="pt-4 pb-2 py-0"> {/* Reduced padding from pt-8 pb-4 to pt-4 pb-2 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="relative">
                <img src="/lovable-uploads/bf002e75-f7c8-47de-8d94-73f12b1efdd4.png" alt="Marko Macuh" className="w-full h-auto rounded-lg shadow-md object-cover max-w-[400px] mx-auto" // Increased from 300px to 400px
              />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Priporočeno s strani stroke</Badge>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-tarsal-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="text-center mt-2">
                  <a href="https://instagram.com/macuhmarko" target="_blank" rel="noopener noreferrer" className="text-sm text-tarsal-accent hover:underline inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                    macuhmarko
                  </a>
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
                "V svoji praksi pogosto opažam, da številne težave v stopalu izhajajo iz nepravilne obremenitve, ki je največkrat posledica neustrezne obutve in slabih navad – tako pri športno aktivnih kot tudi pri manj aktivnih posameznikih. Deformacije v predelu prstov, ki jih povzročajo ozki čevlji so žal prepogost pojav. Reševanje tega pa je nujno, saj to ne vpliva le na izgled in bolečino stopal, vendar se zelo hitro težave pojavijo še višje po telesu, predvsem v kolenih in kolkih"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
