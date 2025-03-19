
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
  imageClassName?: string;
  instagramHandle?: string;
}

const ExpertTestimonial: React.FC<ExpertTestimonialProps> = ({ 
  name, 
  title, 
  quote, 
  imageSrc, 
  reverse = false,
  id,
  credentials = [],
  featured = false,
  imageClassName = "",
  instagramHandle
}) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex flex-col items-center gap-12",
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          <div className="flex-1">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <img 
                src={imageSrc} 
                alt={name} 
                className={cn(
                  "w-full h-auto rounded-lg shadow-xl object-cover max-w-[400px] mx-auto", // Increased from 300px to 400px
                  featured ? "aspect-auto" : "aspect-[3/4]",
                  imageClassName
                )}
              />
              {featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Priporočeno od stroke</Badge>
                </div>
              )}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-tarsal-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              {instagramHandle && (
                <div className="text-center mt-2">
                  <a 
                    href={`https://instagram.com/${instagramHandle}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-tarsal-accent hover:underline inline-flex items-center"
                  >
                    <svg 
                      className="w-4 h-4 mr-1" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    {instagramHandle}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-2">{name}</h3>
            <p className="text-tarsal-accent font-semibold mb-2">{title}</p>
            {credentials.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                {credentials.map((credential, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {credential}
                  </Badge>
                ))}
              </div>
            )}
            <blockquote className="text-lg md:text-xl italic mb-8 leading-relaxed">
              "{quote}"
            </blockquote>
            {featured && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Zakaj zaupati strokovnjakom?</span> Naši priporočitelji so priznani strokovnjaki z dokazanimi izkušnjami na področju fizioterapije in športne medicine. Njihova podpora temelji na strokovnem znanju in opazovanih rezultatih pri pacientih.
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
