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
  return;
};
export default ExpertTestimonial;