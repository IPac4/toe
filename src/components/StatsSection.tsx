
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-tarsal-DEFAULT to-tarsal-DEFAULT/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Podprto s številkami</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Rezultati redne uporabe TOE, potrjeni s strani zadovoljnih uporabnikov
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="text-6xl font-bold mb-2 text-tarsal-accent">85%</div>
            <h3 className="text-xl font-semibold mb-4">Manj bolečin</h3>
            <Progress value={85} className="h-2 bg-white/20" indicatorClassName="bg-tarsal-accent" />
            <p className="mt-4 text-white/80">Uporabniki poročajo o znatnem zmanjšanju bolečin že po 2 tednih redne uporabe.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="text-6xl font-bold mb-2 text-tarsal-accent">90%</div>
            <h3 className="text-xl font-semibold mb-4">Boljša stabilnost</h3>
            <Progress value={90} className="h-2 bg-white/20" indicatorClassName="bg-tarsal-accent" />
            <p className="mt-4 text-white/80">Izboljšana stabilnost stopala in telesa med hojo in stanjem.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="text-6xl font-bold mb-2 text-tarsal-accent">83%</div>
            <h3 className="text-xl font-semibold mb-4">Izboljšana drža</h3>
            <Progress value={83} className="h-2 bg-white/20" indicatorClassName="bg-tarsal-accent" />
            <p className="mt-4 text-white/80">Zaradi boljše porazdelitve teže se izboljša celotna telesna drža.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
