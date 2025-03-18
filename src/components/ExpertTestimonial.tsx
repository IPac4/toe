
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ExpertTestimonialProps {
  name: string;
  title: string;
  quote: string;
  imageSrc: string;
  reverse?: boolean;
  id?: string;
  credentials?: string[];
  featured?: boolean;
}

const ExpertTestimonial: React.FC<ExpertTestimonialProps> = ({ 
  name, 
  title, 
  quote, 
  imageSrc, 
  reverse = false,
  id,
  credentials = [],
  featured = false
}) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex flex-col items-center gap-12",
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          <div className="flex-1 transform hover:scale-105 transition-transform duration-300">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <img 
                src={imageSrc} 
                alt={name} 
                className={cn(
                  "w-full h-auto rounded-lg shadow-xl object-cover border-2 border-green-200",
                  featured ? "aspect-auto" : "aspect-[3/4]"
                )}
              />
              {featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">Priporočeno od stroke</Badge>
                </div>
              )}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border border-green-100">
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-2 text-gray-800">{name}</h3>
            <p className="text-green-600 font-semibold mb-2">{title}</p>
            {credentials.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                {credentials.map((credential, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-800">
                    {credential}
                  </Badge>
                ))}
              </div>
            )}
            <blockquote className="text-lg md:text-xl italic mb-8 leading-relaxed border-l-4 border-green-400 pl-4 py-2 bg-white rounded-r-lg shadow-sm">
              "{quote}"
            </blockquote>
            {featured && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-inner">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-green-700">Zakaj zaupati strokovnjakom?</span> Naši priporočitelji so priznani strokovnjaki z dokazanimi izkušnjami na področju fizioterapije in športne medicine. Njihova podpora temelji na strokovnem znanju in opazovanih rezultatih pri pacientih.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertTestimonial;
