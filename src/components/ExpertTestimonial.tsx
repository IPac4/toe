
import React from 'react';
import { cn } from '@/lib/utils';

interface ExpertTestimonialProps {
  name: string;
  title: string;
  quote: string;
  imageSrc: string;
  reverse?: boolean;
  id?: string;
}

const ExpertTestimonial: React.FC<ExpertTestimonialProps> = ({ 
  name, 
  title, 
  quote, 
  imageSrc, 
  reverse = false,
  id
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
                className="w-full h-auto rounded-lg shadow-xl object-cover aspect-[3/4]"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-tarsal-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-2">{name}</h3>
            <p className="text-tarsal-gray mb-6">{title}</p>
            <blockquote className="text-lg md:text-xl italic mb-8 leading-relaxed">
              "{quote}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertTestimonial;
