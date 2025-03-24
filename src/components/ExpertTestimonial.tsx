
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
  // Generate an ID from name if not provided
  const expertId = id || `expert-${name.toLowerCase().split(' ')[0]}`;
  
  return (
    <section id={expertId} className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex flex-col md:flex-row items-center md:items-start gap-8",
          reverse ? "md:flex-row-reverse" : ""
        )}>
          {/* Expert image */}
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <img 
              src={imageSrc} 
              alt={`${name} - ${title}`}
              className={cn(
                "w-full h-full object-cover rounded-full border-4 border-white shadow-lg",
                imageClassName
              )}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="mb-3">
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-gray-600">{title}</p>
              
              {instagramHandle && (
                <a 
                  href={`https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @{instagramHandle}
                </a>
              )}
            </div>
            
            {/* Credentials */}
            {credentials.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {credentials.map((credential, index) => (
                  <Badge key={index} variant="outline" className="bg-white">
                    {credential}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Quote */}
            <blockquote className="text-lg italic border-l-4 border-blue-500 pl-4 py-2 mb-4">
              "{quote}"
            </blockquote>
            
            {/* Featured badge */}
            {featured && (
              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                Priporočen strokovnjak
              </Badge>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertTestimonial;
