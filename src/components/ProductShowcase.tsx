import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
const ProductShowcase: React.FC = () => {
  return <section id="product" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Predstavljamo</h2>
          <div className="w-24 h-1 bg-tarsal-accent mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Rešitev za zmanjšanje bolečin v stopalih in preprečevanje deformacij</p>
        </div>

        {/* Main content with alternating layout */}
        <div className="space-y-20">
          {/* First section - What is TOE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-r from-tarsal-accent/5 to-blue-50 p-8 rounded-2xl border border-tarsal-accent/10">
                <h3 className="text-3xl font-bold mb-6 text-tarsal-accent">Delovanje in učinek TOE</h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  TOE je zasnovan na podlagi dolgoletnih raziskav in izkušenj strokovnjakov s področja ortopedije in fizioterapije. 
                  Inovativni separator prstov omogoča naravno poravnavo in razbremenitev, kar pomaga pri odpravljanju trenutnih težav 
                  in preprečevanju prihodnjih deformacij stopal.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-tarsal-accent/10">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Pravilna razporeditev</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">Mehko, a stabilno ločevanje prstov omogoča sprostitev in vračanje v naravno lego.</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-tarsal-accent/10">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Zmanjšanje bolečin</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">Omogoča boljšo porazdelitev pritiska na stopalo, kar zmanjša bolečine in preprečuje otiščance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-tarsal-accent/30 opacity-30 blur-xl rounded-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
                  <img src="/lovable-uploads/9f461ca7-e88a-4994-9b26-539222061815.png" alt="Pravilna razporeditev in učinek TOE" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Second section - Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-tarsal-accent/30 to-blue-200 opacity-30 blur-xl rounded-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
                  <img src="/lovable-uploads/6294ca7b-3cf1-424c-9208-5525064c9c43.png" alt="Uporaba TOE separatorja" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-r from-blue-50 to-tarsal-accent/5 p-8 rounded-2xl border border-tarsal-accent/10">
                <h3 className="text-3xl font-bold mb-6 text-tarsal-accent">Učinek na vaše stopalo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-tarsal-accent/10">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Zdrava drža stopala</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">Preprečuje nepravilno obremenitev stopala in pomaga pri stabilnosti celotnega telesa.</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-tarsal-accent/10">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-tarsal-accent/20 rounded-full flex items-center justify-center text-tarsal-accent mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Dolgoročna preventiva</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">Z redno uporabo preprečujete deformacije, kot so kladivasti prsti in Hallux valgus.</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-tarsal-accent/20 space-y-4">
                  <h4 className="text-xl font-bold text-tarsal-accent">Kako TOE pomaga vašim stopalom?</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Z redno uporabo TOE separatorja boste doživeli postopno izboljšanje stanja vaših stopal. Uporaba je priporočljiva 
                    20-30 minut dnevno za optimalne rezultate.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-tarsal-accent mr-2 text-xl">✅</span>
                      <span><strong className="text-gray-800">Takojšnje olajšanje bolečin</strong> – Že po prvi uporabi boste občutili sprostitev.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-tarsal-accent mr-2 text-xl">✅</span>
                      <span><strong className="text-gray-800">Izboljšanje drže in ravnotežja</strong> – Pravilna razporeditev prstov vpliva na celostno držo.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-tarsal-accent mr-2 text-xl">✅</span>
                      <span><strong className="text-gray-800">Postopno odpravljanje deformacij</strong> – Redna uporaba pomaga pri vračanju prstov v naravni položaj.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          
          {/* For all generations section with text above and child's foot image below */}
          <div className="bg-gradient-to-br from-white to-tarsal-muted/30 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2">
                <h3 className="text-3xl font-bold mb-6 text-tarsal-accent">Za vse generacije</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Če pogledate nogo moje hčerke na fotografiji, lahko vidite kako stopalo lahko izgleda z uporabo Tarsal TOE. 
                  To pomeni, da je izdelek primeren za vse starosti - tako za preventivo, ko je ta mogoča, kot tudi za 
                  korekcijo in izboljšanje stanja vašega stopala.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Začnite z nego stopal čim prej, saj je preventiva najboljša rešitev. Če pa že imate težave, 
                  vam Tarsal TOE pomaga postopoma izboljšati stanje in zmanjšati bolečine.
                </p>
                
                {/* Added Prednosti TOE section here */}
                <div className="bg-white p-6 rounded-xl shadow-md mt-6">
                  <h4 className="text-xl font-bold text-tarsal-accent mb-4">Prednosti TOE</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-tarsal-accent mr-3 text-xl">✅</span>
                      <p className="text-gray-700"><strong>Anatomsko oblikovan</strong> - Prilagaja se obliki prstov</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-tarsal-accent mr-3 text-xl">✅</span>
                      <p className="text-gray-700"><strong>Visokokakovosten silikon</strong> - Mehak in trpežen material</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-tarsal-accent mr-3 text-xl">✅</span>
                      <p className="text-gray-700"><strong>Univerzalna velikost</strong> - Za različne tipe stopal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex items-center justify-center p-6">
                <img src="/lovable-uploads/edf1b72b-8c34-43de-9caa-e8cc5e25e7b9.png" alt="Zdravo stopalo otroka z uporabo TOE" className="w-3/4 mx-auto h-auto object-cover" />
              </div>
            </div>
          </div>
          
          {/* Keep the original Product advantages section */}
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <Button onClick={() => {
            const element = document.getElementById('pricing');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }} className="cta-button text-lg py-7 px-12 shadow-lg group bg-green-600 hover:bg-green-500">
              Naroči zdaj
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            
            <Button onClick={() => {
            const element = document.getElementById('faq');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-lg py-7 px-12">
              Pogosta vprašanja
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductShowcase;