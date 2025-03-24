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
  return <section id={expertId} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      </div>
    </section>;
};
export default ExpertTestimonial;