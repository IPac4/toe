import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Check, Package, ShoppingCart, CreditCard, Truck, Gift, ShieldCheck, Timer, BadgeCheck, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productVariant?: 'basic' | 'double' | 'family';
  skipPackageSelection?: boolean;
}

// Define a common product variant interface with optional popular property
interface ProductVariant {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  popular?: boolean;
  features: string[];
  hasExercises?: boolean; // Added for exercises value calculation
  description?: string; // Added missing property
  pricePerItem?: number; // Added missing property
}
type ColorOption = 'belo' | 'črno';
interface ColorSelection {
  index: number;
  color: ColorOption;
}

// Define proper type for checkout steps to avoid type comparison errors
type CheckoutStep = 'package' | 'color_payment' | 'address';
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  onOpenChange,
  productVariant = 'double',
  skipPackageSelection = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'transfer' | 'applepay' | 'paypal'>('card');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('package');
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'double' | 'family'>(productVariant);
  const [colorSelections, setColorSelections] = useState<ColorSelection[]>([]);
  const isMobile = useIsMobile();
  
  // Countdown timer state
  const [countdown, setCountdown] = useState({ minutes: 15, seconds: 0 });
  
  // Initialize countdown timer when modal opens
  useEffect(() => {
    if (open) {
      setCountdown({ minutes: 15, seconds: 0 });
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [open]);

  // Reset checkout step when modal opens
  useEffect(() => {
    if (open) {
      // Skip to color selection if coming from pricing section
      if (skipPackageSelection) {
        setCheckoutStep('color_payment');
      } else {
        setCheckoutStep('package');
      }
      setSelectedPackage(productVariant);
      initializeColorSelections(productVariant);
    }
  }, [open, productVariant, skipPackageSelection]);

  // Initialize color selections based on the product variant
  const initializeColorSelections = (variant: 'basic' | 'double' | 'family') => {
    const initialSelections: ColorSelection[] = [];
    const quantity = variant === 'basic' ? 1 : variant === 'double' ? 2 : 3;
    for (let i = 0; i < quantity; i++) {
      initialSelections.push({
        index: i,
        color: 'belo'
      });
    }
    setColorSelections(initialSelections);
  };

  // Define variants - always put double package first for mobile
  const variantsArray = [{
    id: 'double',
    name: "Dvojni paket",
    quantity: 2,
    price: 17.90,
    discount: 20,
    total: 28.64,
    popular: true,
    hasExercises: true,
    description: "Popolna vrednost",
    pricePerItem: 14.32,
    // Added for exercises value calculation
    features: ["2x Tarsal TOE paket", "GRATIS vaje za dnevno vadbo", "Priročna embalaža", "Testirano v Sloveniji", "Dostava v 48h"]
  }, {
    id: 'basic',
    name: "Osnovni paket",
    quantity: 1,
    price: 17.90,
    discount: 0,
    total: 17.90,
    description: "Popolna rešitev za začetek",
    pricePerItem: 17.90,
    features: ["1x Tarsal TOE paket", "Testirano v Sloveniji", "Priročna embalaža", "Dostava v 48h"]
  }, {
    id: 'family',
    name: "Družinski paket",
    quantity: 3,
    price: 17.90,
    discount: 25,
    total: 40.26,
    hasExercises: true,
    description: "Največ prihranite",
    pricePerItem: 13.42,
    // Added for exercises value calculation
    features: ["3x Tarsal TOE paket", "GRATIS vaje za dnevno vadbo", "Priročna embalaža", "Testirano v Sloveniji", "GRATIS dostava v 48h"]
  }];

  // Convert array to record for easier access
  const variants: Record<'basic' | 'double' | 'family', ProductVariant> = {
    basic: variantsArray.find(v => v.id === 'basic') as ProductVariant,
    double: variantsArray.find(v => v.id === 'double') as ProductVariant,
    family: variantsArray.find(v => v.id === 'family') as ProductVariant
  };
  const selectedVariant = variants[selectedPackage];
  const shipping = selectedVariant.total >= 30 ? 0 : 3;
  const codFee = paymentMethod === 'cod' ? 0.99 : 0;
  const finalTotal = selectedVariant.total + shipping + codFee;

  // Calculate savings including 5€ for exercises where applicable
  const originalPrice = selectedVariant.price * selectedVariant.quantity;
  const exerciseValue = selectedVariant.hasExercises ? 5.00 : 0.00;
  const savings = (selectedVariant.discount > 0 ? originalPrice - selectedVariant.total : 0) + exerciseValue;

  // Determine which features are free
  const freeFeatures = selectedVariant.features.filter(feature => feature.toLowerCase().includes('gratis') || feature.toLowerCase().includes('brezplačna'));
  const handlePackageSelect = (packageId: 'basic' | 'double' | 'family') => {
    setSelectedPackage(packageId);
    initializeColorSelections(packageId);
    setCheckoutStep('color_payment');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 'color_payment') {
      if (paymentMethod === 'applepay') {
        // Simulate Apple Pay process
        toast.success("Preusmerjanje na Apple Pay...");
        setTimeout(() => {
          toast.success("Naročilo uspešno oddano! Prejeli boste potrditveni e-mail.");
          onOpenChange(false);
        }, 1500);
        return;
      }
      if (paymentMethod === 'paypal') {
        // Simulate PayPal redirect
        toast.success("Preusmerjanje na PayPal...");
        setTimeout(() => {
          toast.success("Naročilo uspešno oddano! Prejeli boste potrditveni e-mail.");
          onOpenChange(false);
        }, 1500);
        return;
      }

      // For other payment methods, proceed to address step
      setCheckoutStep('address');
      return;
    }
    toast.success("Naročilo uspešno oddano! Prejeli boste potrditveni e-mail.");
    onOpenChange(false);
  };
  const handleColorChange = (index: number, color: ColorOption) => {
    setColorSelections(prev => prev.map(item => item.index === index ? {
      ...item,
      color
    } : item));
  };

  // Check if all colors are selected
  const allColorsSelected = colorSelections.length === selectedVariant.quantity;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {checkoutStep === 'package' ? 'Izberite paket' : checkoutStep === 'color_payment' ? 'Izberite barvo in način plačila' : 'Zaključek naročila'}
          </DialogTitle>
          <DialogDescription>
            {checkoutStep === 'package' ? 'Izberite paket, ki ustreza vašim potrebam.' : checkoutStep === 'color_payment' ? 'Izberite barvo za vsak TOE v vašem paketu in način plačila.' : 'Izpolnite svoje podatke za dostavo.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Limited time offer countdown */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-3 animate-pulse">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Timer className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-red-700">Časovno omejena ponudba!</h3>
              <p className="text-xs text-gray-600">Ta ponudba poteče čez: <span className="font-bold">{countdown.minutes.toString().padStart(2, '0')}:{countdown.seconds.toString().padStart(2, '0')}</span></p>
            </div>
          </div>
          
          {/* 30-day guarantee - New section added at the top */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-tarsal-accent/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-tarsal-accent" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">30-dnevna garancija zadovoljstva</h3>
              <p className="text-xs text-gray-600">Če z izdelkom niste zadovoljni, vam v 30 dneh vrnemo denar. Brez vprašanj!</p>
            </div>
          </div>
          
          {/* Social proof section - New addition */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Priljubljeno med kupci</h3>
              <p className="text-xs text-gray-600">V zadnjih 24 urah je izdelek kupilo <span className="font-bold">28 oseb</span>.</p>
            </div>
          </div>
          
          {/* Order Summary - Always visible except on package selection */}
          {checkoutStep !== 'package' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Povzetek naročila</h3>
              
              {savings > 0 && (
                <div className="bg-green-100 p-3 rounded-md mb-3 border border-green-300">
                  <p className="font-bold text-green-800 text-center text-lg">
                    Prihranili ste: {savings.toFixed(2)}€
                    {selectedVariant.hasExercises && (
                      <span className="block text-sm mt-1">
                        (vključno s 5,00€ za vaje za dnevno vadbo)
                      </span>
                    )}
                  </p>
                </div>
              )}
              
              {freeFeatures.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-md mb-3 border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">Brezplačne ugodnosti:</p>
                  <ul className="space-y-1">
                    {freeFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-blue-700">
                        <Gift size={16} className="mr-1 flex-shrink-0" />
                        <span>{feature.replace('GRATIS ', '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Package size={16} className="mr-1" />
                    {selectedVariant.name} ({selectedVariant.quantity}x TOE)
                  </span>
                  <span>{selectedVariant.total.toFixed(2)}€</span>
                </div>
                
                {colorSelections.length > 0 && (
                  <div className="pt-1 pb-1 border-y border-dashed border-gray-200 my-1">
                    <span className="text-xs text-gray-500">Izbrane barve:</span>
                    <ul className="space-y-1 mt-1">
                      {colorSelections.map((selection, idx) => (
                        <li key={idx} className="flex justify-between text-xs">
                          <span>TOE {idx + 1}</span>
                          <span className="font-medium">{selection.color}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Truck size={16} className="mr-1" />
                    Dostava
                  </span>
                  <span>{shipping > 0 ? `${shipping.toFixed(2)}€` : 'Brezplačno'}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between">
                    <span>Plačilo po povzetju</span>
                    <span>{codFee.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Skupaj</span>
                  <span>{finalTotal.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          )}
          
          {checkoutStep === 'package' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isMobile ? variantsArray : [variants.basic, variants.double, variants.family]).map(variant => {
                  const variantId = variant.id as 'basic' | 'double' | 'family';
                  const isSelected = selectedPackage === variantId;
                  return (
                    <div 
                      key={variantId} 
                      className={cn(
                        "price-card",
                        variant.popular ? "popular transform scale-105" : ""
                      )}
                    >
                      {variant.popular && (
                        <div className="bg-tarsal-accent text-white py-2 text-center font-semibold">
                          Najbolj priljubljeno
                        </div>
                      )}
                      <div className="p-8 border-b">
                        <h3 className="text-2xl font-bold mb-2">{variant.name}</h3>
                        <p className="text-gray-600 mb-4">{variant.description}</p>
                        <div className="flex items-end mb-4">
                          <span className="text-4xl font-bold">{variant.pricePerItem?.toFixed(2)}€</span>
                          <span className="text-gray-500 ml-2">/kos</span>
                          {variant.discount > 0 && (
                            <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                              -{variant.discount}%
                            </span>
                          )}
                        </div>
                        {variant.discount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            {variant.price.toFixed(2)}€/kos
                          </div>
                        )}
                        
                        <ul className="space-y-3 mb-6">
                          {variant.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="text-sm font-semibold mb-2">
                          Končna cena: <span className="text-lg">{variant.total.toFixed(2)}€</span>
                        </div>

                        {/* Added individual Buy Now button for each package */}
                        <Button type="button" onClick={() => handlePackageSelect(variantId)} className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 text-white mt-4">
                          Kupi zdaj
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {checkoutStep === 'color_payment' && (
            <div className="space-y-6">
              {/* Compact Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Izberite barvo za vsak TOE izdelek</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from({
                    length: variants[selectedPackage].quantity
                  }).map((_, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="text-sm font-medium mb-2">TOE {index + 1}</div>
                      <div className="flex space-x-2">
                        <div 
                          className={cn("flex-1 border rounded-md p-2 flex items-center justify-between cursor-pointer transition-all", 
                            colorSelections.find(s => s.index === index)?.color === 'belo' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-gray-400")} 
                          onClick={() => handleColorChange(index, 'belo')}
                        >
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-white border border-gray-300 mr-1"></div>
                            <span className="text-sm">Bela</span>
                          </div>
                          {colorSelections.find(s => s.index === index)?.color === 'belo' && <Check className="h-4 w-4 text-tarsal-accent" />}
                        </div>
                        
                        <div 
                          className={cn("flex-1 border rounded-md p-2 flex items-center justify-between cursor-pointer transition-all", 
                            colorSelections.find(s => s.index === index)?.color === 'črno' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-gray-400")} 
                          onClick={() => handleColorChange(index, 'črno')}
                        >
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-black mr-1"></div>
                            <span className="text-sm">Črna</span>
                          </div>
                          {colorSelections.find(s => s.index === index)?.color === 'črno' && <Check className="h-4 w-4 text-tarsal-accent" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Method Selection */}
              <div className="pt-2">
                <h3 className="font-semibold mb-3">Način plačila</h3>
                <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={value => setPaymentMethod(value as any)} className="space-y-3">
                  <div className={cn("flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", paymentMethod === 'card' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50")}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">Kreditna kartica</Label>
                    <div className="flex space-x-1">
                      <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                        <rect width="40" height="24" rx="4" fill="#1A1F71" />
                        <path d="M16.6854 16.9253H13.9081L15.7879 7.07471H18.5652L16.6854 16.9253Z" fill="#FFFFFF" />
                        <path d="M25.7403 7.29642C25.0976 7.05642 24.0477 6.79688 22.7575 6.79688C19.9802 6.79688 18.0206 8.16598 18.0033 10.1463C17.9864 11.5954 19.423 12.3949 20.4899 12.8743C21.5831 13.364 21.9229 13.6837 21.9169 14.1224C21.9067 14.8063 21.0604 15.1193 20.2669 15.1193C19.1567 15.1193 18.5661 14.9497 17.6437 14.5715L17.2676 14.3889L16.8647 16.5854C17.615 16.8929 19.0507 17.1764 20.5312 17.189C23.5054 17.189 25.4237 15.8431 25.4417 13.7288C25.4518 12.5794 24.7057 11.6941 23.0527 10.956C22.0276 10.4901 21.4468 10.1771 21.4535 9.7252C21.4535 9.3201 21.9331 8.8947 22.9582 8.8947C23.8132 8.875 24.428 9.09471 24.8948 9.31454L25.1664 9.45389L25.7403 7.29642Z" fill="#FFFFFF" />
                        <path d="M31.3551 7.07422H29.2727C28.6719 7.07422 28.2219 7.23422 27.9685 7.8516L24.4158 16.9248H27.39L27.9034 15.2838H31.2364C31.2966 15.5363 31.4961 16.9248 31.4961 16.9248H34.0922L31.3551 7.07422ZM28.6315 13.1646C28.8747 12.5342 29.8428 9.96019 29.8428 9.96019C29.8246 9.99588 30.0644 9.35451 30.2005 8.95608L30.385 9.90196C30.385 9.90196 30.9824 12.6302 31.0987 13.1646H28.6315Z" fill="#FFFFFF" />
                        <path d="M11.5 7.07422L8.73272 13.7108L8.43249 12.2785C7.93242 10.6507 6.41226 8.88519 4.70703 7.96283L7.23895 16.9149H10.2367L14.5 7.07422H11.5Z" fill="#FFFFFF" />
                        <path d="M6.38329 7.07568H2.06933L2 7.37511C5.41258 8.20687 7.69995 10.057 8.43229 12.2797L7.46995 8.00721C7.30661 7.30654 6.91329 7.098 6.38329 7.07568Z" fill="#FAA61A" />
                      </svg>
                      <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                        <rect width="40" height="24" rx="4" fill="#EB001B" />
                        <circle cx="15" cy="12" r="5" fill="#F79E1B" />
                        <path d="M15 17C17.7614 17 20 14.7614 20 12C20 9.23858 17.7614 7 15 7C12.2386 7 10 9.23858 10 12C10 14.7614 12.2386 17 15 17Z" fill="#FF5F00" />
                        <path d="M15 17C17.7614 17 20 14.7614 20 12C20 9.23858 17.7614 7 15 7" fill="#F79E1B" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className={cn("flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", paymentMethod === 'cod' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50")}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">Po povzetju (+0,99€)</Label>
                    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
                      <rect width="32" height="24" rx="4" fill="#F4F4F4" />
                      <path d="M8 8L16 12L24 8" stroke="#555555" strokeWidth="1.5" />
                      <path d="M8 12L16 16L24 12" stroke="#555555" strokeWidth="1.5" />
                      <path d="M8 16L16 20L24 16" stroke="#555555" strokeWidth="1.5" />
                    </svg>
                  </div>
                  
                  <div className={cn("flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", paymentMethod === 'transfer' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50")}>
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">Bančno nakazilo</Label>
                    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
                      <rect width="32" height="24" rx="4" fill="#F4F4F4" />
                      <path d="M16 6L21 11H18V18H14V11H11L16 6Z" fill="#555555" />
                      <path d="M10 16V19H22V16H24V21H8V16H10Z" fill="#555555" />
                    </svg>
                  </div>
                  
                  <div className={cn("flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", paymentMethod === 'applepay' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50")}>
                    <RadioGroupItem value="applepay" id="applepay" />
                    <Label htmlFor="applepay" className="flex-1 cursor-pointer">Apple Pay</Label>
                    <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="#000000" />
                      <path d="M13.3 9.3C12.9 9.7 12.4 9.6 11.9 9.5C11.8 9 12 8.5 12.3 8.1C12.7 7.7 13.2 7.8 13.6 8C13.7 8.5 13.6 9 13.3 9.3ZM13.6 9.7C13 9.7 12.5 10.1 12.2 10.1C11.9 10.1 11.4 9.7 11 9.7C10.4 9.7 9.9 10 9.6 10.5C9 11.5 9.5 13 10.1 13.8C10.4 14.2 10.8 14.7 11.3 14.6C11.8 14.6 12 14.3 12.6 14.3C13.2 14.3 13.4 14.6 13.9 14.6C14.4 14.6 14.7 14.2 15 13.8C15.4 13.3 15.5 12.8 15.5 12.7C
