import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};
interface FooterFAQProps {
  faqItems: FAQItem[];
}
const FooterFAQ: React.FC<FooterFAQProps> = ({
  faqItems
}) => {
  return;
};
export default FooterFAQ;