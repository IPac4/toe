
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    name: "Maja K.",
    rating: 5,
    comment: "Po dveh tednih uporabe TOE so moje bolečine v stopalih skoraj izginile. Nosim ga vsak večer za 20 minut in razlika je neverjetna!",
    date: "12.3.2023"
  },
  {
    name: "Nataša B.",
    rating: 5,
    comment: "Imela sem začetni hallux valgus in TOE mi je pomagal preprečiti nadaljnji razvoj. Zdaj lahko spet nosim svoje najljubše čevlje brez bolečin.",
    date: "24.5.2023"
  },
  {
    name: "Andreja L.",
    rating: 4,
    comment: "Produkt deluje odlično, edina pomanjkljivost je omejena izbira barv. Vseeno priporočam vsem s podobnimi težavami!",
    date: "18.7.2023"
  },
  {
    name: "Peter M.",
    rating: 5,
    comment: "Kupil sem TOE za ženo, ki je imela težave z bolečimi stopali. Pravi, da je to najboljša stvar, kar sem ji jo kupil v zadnjem letu!",
    date: "3.9.2023"
  },
  {
    name: "Ana G.",
    rating: 5,
    comment: "Kot medicinska sestra preživim cel dan na nogah. TOE mi je pomagal zmanjšati bolečine in utrujenost. Zdaj ga priporočam vsem sodelavkam.",
    date: "11.10.2023"
  },
  {
    name: "Špela T.",
    rating: 4,
    comment: "Zelo učinkovit izdelek, odlično deluje. Edina zamera je, da bi lahko imel več barvnih opcij.",
    date: "29.11.2023"
  }
];

const ReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-tarsal-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kaj pravijo uporabniki</h2>
          <div className="w-20 h-1 bg-tarsal-accent mx-auto mb-6"></div>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold">4.8/5</span>
            <span className="text-gray-500">Povprečna ocena od 214 uporabnikov</span>
          </div>
        </div>

        <div className="relative px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="testimonial-card h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{review.name}</h4>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="lg:-left-12 left-0" />
            <CarouselNext className="lg:-right-12 right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
