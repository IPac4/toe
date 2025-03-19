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
  return <section className="mb-12 pt-8" id="faq">
      <h2 className="text-3xl font-bold mb-8 text-center text-tarsal-accent">Pogosta vprašanja</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map(item => <AccordionItem key={item.id} value={item.id} className="bg-white/10 rounded-lg overflow-hidden border-none mb-4">
              <AccordionTrigger className="px-6 py-4 text-left font-medium no-underline text-slate-50 bg-tarsal-accent">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-300 bg-black/20">
                <p className="text-zinc-950">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>)}
        </Accordion>
      </div>
    </section>;
};
export default FooterFAQ;