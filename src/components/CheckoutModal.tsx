import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Check, Package, ShoppingCart, CreditCard, Truck, Gift } from 'lucide-react';
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
    // Added for exercises value calculation
    features: ["2x Tarsal TOE paket", "GRATIS vaje za dnevno vadbo", "Priročna embalaža", "Testirano v Sloveniji", "Dostava v 48h"]
  }, {
    id: 'basic',
    name: "Osnovni paket",
    quantity: 1,
    price: 17.90,
    discount: 0,
    total: 17.90,
    features: ["1x Tarsal TOE paket", "Testirano v Sloveniji", "Priročna embalaža", "Dostava v 48h"]
  }, {
    id: 'family',
    name: "Družinski paket",
    quantity: 3,
    price: 17.90,
    discount: 25,
    total: 40.26,
    hasExercises: true,
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
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {checkoutStep === 'package' ? 'Izberite paket' : checkoutStep === 'color_payment' ? 'Izberite barvo in način plačila' : 'Zaključek naročila'}
          </DialogTitle>
          <DialogDescription>
            {checkoutStep === 'package' ? 'Izberite paket, ki ustreza vašim potrebam.' : checkoutStep === 'color_payment' ? 'Izberite barvo za vsak TOE v vašem paketu in način plačila.' : 'Izpolnite svoje podatke za dostavo.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Order Summary - Always visible except on package selection */}
          {checkoutStep !== 'package' && <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Povzetek naročila</h3>
              
              {savings > 0 && <div className="bg-green-100 p-3 rounded-md mb-3 border border-green-300">
                  <p className="font-bold text-green-800 text-center text-lg">
                    Prihranili ste: {savings.toFixed(2)}€
                    {selectedVariant.hasExercises && <span className="block text-sm mt-1">
                        (vključno s 5,00€ za vaje za dnevno vadbo)
                      </span>}
                  </p>
                </div>}
              
              {freeFeatures.length > 0 && <div className="bg-blue-50 p-3 rounded-md mb-3 border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">Brezplačne ugodnosti:</p>
                  <ul className="space-y-1">
                    {freeFeatures.map((feature, index) => <li key={index} className="flex items-center text-blue-700">
                        <Gift size={16} className="mr-1 flex-shrink-0" />
                        <span>{feature.replace('GRATIS ', '')}</span>
                      </li>)}
                  </ul>
                </div>}
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Package size={16} className="mr-1" />
                    {selectedVariant.name} ({selectedVariant.quantity}x TOE)
                  </span>
                  <span>{selectedVariant.total.toFixed(2)}€</span>
                </div>
                
                {colorSelections.length > 0 && <div className="pt-1 pb-1 border-y border-dashed border-gray-200 my-1">
                    <span className="text-xs text-gray-500">Izbrane barve:</span>
                    <ul className="space-y-1 mt-1">
                      {colorSelections.map((selection, idx) => <li key={idx} className="flex justify-between text-xs">
                          <span>TOE {idx + 1}</span>
                          <span className="font-medium">{selection.color}</span>
                        </li>)}
                    </ul>
                  </div>}
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Truck size={16} className="mr-1" />
                    Dostava
                  </span>
                  <span>{shipping > 0 ? `${shipping.toFixed(2)}€` : 'Brezplačno'}</span>
                </div>
                {paymentMethod === 'cod' && <div className="flex justify-between">
                    <span>Plačilo po povzetju</span>
                    <span>{codFee.toFixed(2)}€</span>
                  </div>}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Skupaj</span>
                  <span>{finalTotal.toFixed(2)}€</span>
                </div>
              </div>
            </div>}
          
          {/* Package Selection - First step */}
          {checkoutStep === 'package' && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isMobile ? variantsArray : [variants.basic, variants.double, variants.family]).map(variant => {
              const variantId = variant.id as 'basic' | 'double' | 'family';
              const isSelected = selectedPackage === variantId;
              return <div key={variantId} className={cn("relative border rounded-xl transition-all duration-200 overflow-hidden cursor-pointer", isSelected ? "border-tarsal-accent ring-2 ring-tarsal-accent/30 shadow-lg" : "border-gray-200 hover:border-tarsal-accent/50", variant.popular ? "md:-translate-y-2" : "")}>
                      {variant.popular && <div className="absolute top-0 left-0 right-0 text-white text-xs font-medium py-1 text-center bg-red-500">
                          Najbolj priljubljeno
                        </div>}
                      
                      <div className={cn("p-5", variant.popular ? "pt-7" : "", isSelected ? "bg-tarsal-accent/5" : "")}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{variant.name}</h3>
                            <p className="text-sm text-gray-600">{variant.quantity}x TOE</p>
                          </div>
                          {isSelected && <div className="bg-tarsal-accent text-white h-6 w-6 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4" />
                            </div>}
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-baseline mb-2">
                            <span className="text-2xl font-bold">
                              {variant.discount > 0 ? (variant.price * variant.quantity * (100 - variant.discount) / 100 / variant.quantity).toFixed(2) : variant.price.toFixed(2)}€
                            </span>
                            <span className="text-sm text-gray-500 ml-1">/kos</span>
                            {variant.discount > 0 && <span className="ml-2 bg-green-100 text-xs font-semibold py-0.5 rounded px-0 text-red-500 mx-[2px]">
                                -{variant.discount}%
                              </span>}
                          </div>
                          {variant.discount > 0 && <div className="text-sm text-gray-500 line-through">
                              {variant.price.toFixed(2)}€/kos
                            </div>}
                        </div>
                        
                        <ul className="space-y-2 mb-6">
                          {variant.features.map((feature, index) => <li key={index} className="flex items-start text-sm">
                              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span>{feature}</span>
                            </li>)}
                        </ul>
                        
                        <div className="text-sm font-semibold mb-2">
                          Končna cena: <span className="text-lg">{variant.total.toFixed(2)}€</span>
                        </div>

                        {/* Added individual Buy Now button for each package */}
                        <Button type="button" onClick={() => handlePackageSelect(variantId)} className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 text-white mt-4">
                          Kupi zdaj
                        </Button>
                      </div>
                    </div>;
            })}
              </div>
            </div>}
          
          {/* Combined Color Selection and Payment - Second step */}
          {checkoutStep === 'color_payment' && <div className="space-y-6">
              {/* Compact Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Izberite barvo za vsak TOE izdelek</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from({
                length: variants[selectedPackage].quantity
              }).map((_, index) => <div key={index} className="border rounded-lg p-2">
                      <div className="text-xs font-medium mb-1">TOE {index + 1}</div>
                      <div className="flex space-x-2">
                        <div className={cn("flex-1 border rounded-md p-1 flex items-center justify-between cursor-pointer transition-all", colorSelections.find(s => s.index === index)?.color === 'belo' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-gray-400")} onClick={() => handleColorChange(index, 'belo')}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-white border border-gray-300 mr-1"></div>
                            <span className="text-xs">Bela</span>
                          </div>
                          {colorSelections.find(s => s.index === index)?.color === 'belo' && <Check className="h-3 w-3 text-tarsal-accent" />}
                        </div>
                        
                        <div className={cn("flex-1 border rounded-md p-1 flex items-center justify-between cursor-pointer transition-all", colorSelections.find(s => s.index === index)?.color === 'črno' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-gray-400")} onClick={() => handleColorChange(index, 'črno')}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-black mr-1"></div>
                            <span className="text-xs">Črna</span>
                          </div>
                          {colorSelections.find(s => s.index === index)?.color === 'črno' && <Check className="h-3 w-3 text-tarsal-accent" />}
                        </div>
                      </div>
                    </div>)}
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
                      <path d="M13.3 9.3C12.9 9.7 12.4 9.6 11.9 9.5C11.8 9 12 8.5 12.3 8.1C12.7 7.7 13.2 7.8 13.6 8C13.7 8.5 13.6 9 13.3 9.3ZM13.6 9.7C13 9.7 12.5 10.1 12.2 10.1C11.9 10.1 11.4 9.7 11 9.7C10.4 9.7 9.9 10 9.6 10.5C9 11.5 9.5 13 10.1 13.8C10.4 14.2 10.8 14.7 11.3 14.6C11.8 14.6 12 14.3 12.6 14.3C13.2 14.3 13.4 14.6 13.9 14.6C14.4 14.6 14.7 14.2 15 13.8C15.4 13.3 15.5 12.8 15.5 12.7C15.5 12.7 14.6 12.3 14.6 11.3C14.6 10.5 15.3 10.1 15.3 10.1C15 9.6 14.3 9.7 13.6 9.7ZM19.5 8.4V14.5H20.4V12.4H22C23.2 12.4 24.1 11.5 24.1 10.4C24.1 9.3 23.3 8.4 22.1 8.4H19.5ZM20.4 9.2H21.7C22.5 9.2 23.1 9.7 23.1 10.4C23.1 11.1 22.5 11.6 21.7 11.6H20.4V9.2ZM26.2 14.6C27 14.6 27.7 14.2 28 13.6H28.1V14.5H29V11.2C29 10.2 28.2 9.6 27 9.6C25.9 9.6 25.1 10.2 25 11H25.9C26 10.6 26.4 10.3 27 10.3C27.7 10.3 28.1 10.7 28.1 11.2V11.7L26.7 11.8C25.5 11.9 24.8 12.4 24.8 13.2C24.8 14.1 25.4 14.6 26.2 14.6ZM26.5 13.9C25.9 13.9 25.6 13.6 25.6 13.2C25.6 12.8 25.9 12.5 26.7 12.5L28.1 12.4V12.8C28.1 13.4 27.4 13.9 26.5 13.9ZM30.2 16.3C31.1 16.3 31.5 16 31.9 15L33.9 9.7H33L31.7 13.7H31.6L30.3 9.7H29.4L31.2 14.4L31.1 14.7C30.9 15.3 30.6 15.6 30.1 15.6C30 15.6 29.8 15.6 29.7 15.6V16.3C29.8 16.3 30 16.3 30.2 16.3Z" fill="white" />
                    </svg>
                  </div>
                  
                  <div className={cn("flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", paymentMethod === 'paypal' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50")}>
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                    <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="#F0F4F9" />
                      <path d="M13.0747 9.68866C13.1457 9.29574 13.5108 9 13.9299 9H19.2729C19.3962 9 19.6428 9.02959 19.7424 9.05178C19.8537 9.07397 20.0644 9.14072 20.1876 9.19268C20.1997 9.19268 20.2118 9.20007 20.224 9.20747C20.2604 9.22227 20.2968 9.23706 20.3331 9.24446C20.4201 9.28145 20.507 9.32583 20.5818 9.37779C20.6325 9.41477 20.6811 9.45916 20.7297 9.51112C20.7539 9.53331 20.7782 9.55549 20.8024 9.5851C20.8267 9.6147 20.851 9.64431 20.8753 9.67392C20.9845 9.79783 21.0939 9.95092 21.1425 10.0674C21.1789 10.1489 21.2274 10.2601 21.2638 10.3861C21.2881 10.4605 21.3003 10.542 21.3003 10.6234V10.7124C21.3003 10.7716 21.2881 10.8605 21.276 10.9419C21.2517 11.0825 21.2153 11.2232 21.1668 11.3564C21.1304 11.4675 21.0818 11.5785 21.0211 11.6896C20.9968 11.7414 20.9604 11.7932 20.9361 11.845C20.8875 11.9191 20.839 11.9857 20.7783 12.0523C20.754 12.0819 20.7297 12.1189 20.7054 12.1559C20.6689 12.2077 20.6204 12.2595 20.5718 12.3039C20.5354 12.3483 20.4868 12.3927 20.4383 12.4297C20.414 12.4519 20.3897 12.4741 20.3654 12.4889C20.3047 12.5333 20.2319 12.5777 20.1591 12.6147C20.1348 12.6295 20.1227 12.6443 20.0984 12.6517C20.0984 12.6517 20.0862 12.6591 20.0741 12.6591C20.0255 12.6887 19.9648 12.7109 19.9163 12.7331C19.8313 12.7701 19.7463 12.7997 19.6613 12.8219C19.5885 12.8441 19.5157 12.8589 19.4429 12.8737C19.3701 12.8885 19.2851 12.8959 19.2002 12.9033C19.1516 12.9107 19.1152 12.9107 19.0666 12.9107H17.8514C17.7058 12.9107 17.5603 12.9699 17.4753 13.0735C17.3903 13.1771 17.3539 13.3177 17.3661 13.451L17.6011 15.2935C17.6132 15.4194 17.6375 15.4564 17.6739 15.4712C17.7104 15.4934 17.7347 15.4934 17.7954 15.4934H18.5949C18.74 15.4934 18.8722 15.4342 18.9522 15.323C19.0323 15.212 19.0615 15.0641 19.0444 14.9156L19.0323 14.7601C19.0323 14.7083 19.0444 14.6491 19.0566 14.5973C19.0687 14.5751 19.0687 14.5455 19.0809 14.5233C19.093 14.4863 19.1173 14.4493 19.1416 14.4123C19.1659 14.3827 19.1902 14.3531 19.2145 14.3309C19.2509 14.2939 19.2995 14.2643 19.348 14.2421C19.3723 14.2273 19.3966 14.2125 19.4209 14.2051C19.4695 14.1903 19.518 14.1755 19.5666 14.1681C19.603 14.1607 19.6394 14.1607 19.6758 14.1607H19.9593C20.5697 14.1607 21.0696 14.0053 21.4104 13.7009C21.7511 13.3966 21.9452 12.9625 21.9938 12.4445C22.0424 11.9635 21.9452 11.5711 21.7389 11.2746C21.5347 10.9855 21.2032 10.8301 20.7783 10.8301H18.9249C18.7794 10.8301 18.6339 10.7635 18.5368 10.6525C18.4397 10.5414 18.3911 10.3934 18.3911 10.2379V10.1193C18.3911 9.97365 18.4397 9.82568 18.5368 9.71457C18.634 9.60346 18.7673 9.53671 18.9128 9.53671H20.4868C20.5718 9.53671 20.6568 9.54411 20.7418 9.5589C20.7783 9.56629 20.8268 9.57369 20.8633 9.58848C20.8997 9.60346 20.9361 9.61825 20.9726 9.63304C21.009 9.64784 21.0454 9.67022 21.0696 9.69242C21.0939 9.70721 21.1182 9.722 21.1425 9.7442C21.1668 9.76639 21.1789 9.78858 21.2032 9.81077C21.2275 9.84036 21.2518 9.86995 21.276 9.90693L21.3003 9.97365C21.3246 10.0108 21.3367 10.0552 21.3367 10.0922C21.3488 10.1293 21.3609 10.1737 21.3609 10.2231C21.3609 10.3046 21.3488 10.3786 21.3246 10.4526C21.3003 10.5192 21.2638 10.5858 21.2275 10.6377C21.1911 10.6895 21.1425 10.7413 21.0818 10.7783C21.0575 10.7931 21.0332 10.8079 21.009 10.8227C20.9604 10.8523 20.9119 10.8745 20.8633 10.8893L20.8269 10.9041C20.7783 10.9189 20.7297 10.9263 20.6811 10.9337C20.6204 10.9411 20.5576 10.9411 20.4868 10.9411H20.3413C20.2927 10.9411 20.2441 10.9337 20.1955 10.9263C20.1469 10.9189 20.0984 10.9041 20.0498 10.8893C20.0134 10.8745 19.977 10.8597 19.9405 10.8375C19.8992 10.8189 19.8601 10.7987 19.8192 10.7783C19.7827 10.7561 19.7463 10.7265 19.7099 10.6969C19.6856 10.6747 19.6613 10.6525 19.637 10.6229C19.6005 10.5933 19.5763 10.5563 19.5398 10.5193C19.5255 10.5007 19.5127 10.481 19.5007 10.4605C19.4764 10.4309 19.4643 10.3934 19.44 10.3564C19.4279 10.3342 19.4158 10.312 19.4036 10.2824C19.3914 10.2528 19.3793 10.2231 19.3671 10.1935C19.355 10.1489 19.355 10.1045 19.3429 10.0601C19.3429 10.0379 19.3307 10.0083 19.3307 9.98608C19.3307 9.94909 19.3307 9.91211 19.3429 9.87513C19.3429 9.83814 19.355 9.80116 19.3671 9.76417C19.3793 9.72719 19.3914 9.6902 19.4036 9.65322C19.4158 9.61623 19.44 9.58665 19.4643 9.55706C19.4886 9.51268 19.525 9.4757 19.5614 9.43871C19.5857 9.41393 19.5857 9.40655 19.6099 9.38435C19.6099 9.38435 19.6221 9.37696 19.6221 9.36956C19.6342 9.36216 19.6342 9.35477 19.6463 9.34737C19.6463 9.33997 19.6584 9.33258 19.6705 9.32518H19.6828C19.707 9.31039 19.7313 9.30299 19.7556 9.2956C19.792 9.2808 19.8284 9.27342 19.8649 9.25862C19.8892 9.25122 19.9134 9.24383 19.9377 9.24383C19.9862 9.23643 20.0348 9.22164 20.0834 9.22164C20.132 9.21423 20.1805 9.21424 20.2291 9.21424H21.3973C21.5066 9.21424 21.5916 9.28095 21.6037 9.36956C21.6037 9.37696 21.6037 9.38435 21.6037 9.39175C21.6037 9.43613 21.5795 9.47311 21.5309 9.50271C21.4945 9.5323 21.4581 9.5545 21.4217 9.57669C21.3731 9.61367 21.3245 9.64327 21.2759 9.66546C21.2273 9.69506 21.1787 9.72465 21.13 9.74684C21.0693 9.77644 21.0086 9.80604 20.9479 9.83563C20.8872 9.86523 20.8143 9.88743 20.7536 9.91702C20.6807 9.94661 20.6079 9.97621 20.535 10.0058C20.4622 10.0354 20.3894 10.0576 20.3165 10.0872C20.2436 10.1168 20.1708 10.1464 20.098 10.176C20.0251 10.2056 19.9523 10.2352 19.8795 10.2574C19.8066 10.287 19.7337 10.3092 19.6609 10.3388C19.5881 10.3684 19.5152 10.398 19.4302 10.4276C19.3452 10.4572 19.2603 10.4794 19.1753 10.509C19.0903 10.5386 19.0053 10.5682 18.9203 10.5904C18.8475 10.6126 18.7625 10.6348 18.6776 10.657C18.6048 10.6792 18.5198 10.6866 18.4348 10.7014C18.3619 10.7162 18.2891 10.7236 18.2041 10.731C18.1434 10.7384 18.0827 10.7458 18.022 10.7458C17.967 10.7458 17.9169 10.7458 17.8658 10.7458H17.0541C16.9269 10.7458 16.797 10.8024 16.7026 10.9067C16.6083 11.0109 16.5682 11.1517 16.5839 11.2929L17.0176 14.6047C17.0541 14.8414 17.2603 15.0116 17.5073 15.0116H18.8232C18.9687 15.0116 19.1143 14.945 19.2114 14.8339C19.3085 14.7228 19.3571 14.5822 19.345 14.4341L19.3328 14.2861C19.3328 14.2343 19.345 14.1751 19.3571 14.1233C19.3571 14.1011 19.3693 14.0715 19.3814 14.0493C19.3936 14.0123 19.4179 13.9753 19.4422 13.9383C19.4665 13.9087 19.4908 13.8791 19.5151 13.8569C19.5515 13.8199 19.6001 13.7903 19.6486 13.7681C19.6729 13.7533 19.6972 13.7385 19.7215 13.7311C19.7701 13.7163 19.8187 13.7015 19.8672 13.6941C19.9037 13.6867 19.9401 13.6867 19.9765 13.6867H20.1827C20.5455 13.6867 20.8169 13.5906 20.997 13.3984C21.1771 13.2062 21.2621 12.9399 21.2621 12.5923C21.2621 12.1509 21.177 11.837 21.0072 11.6522C20.8374 11.4673 20.5455 11.3784 20.1342 11.3784H19.1173C18.9718 11.3784 18.8262 11.3118 18.7291 11.2007C18.632 11.0896 18.5834 10.9416 18.5834 10.7861V10.6675C18.5834 10.5193 18.632 10.3713 18.7291 10.2602C18.8262 10.1491 18.9596 10.0824 19.105 10.0824H19.1778C19.2385 10.0824 19.2992 10.0676 19.3599 10.0454C19.4691 10.0158 19.5782 9.97879 19.6874 9.93441C19.8067 9.89002 19.9159 9.84564 20.025 9.79607C20.1402 9.75201 20.2547 9.70595 20.3685 9.65792C20.5112 9.59887 20.6503 9.53507 20.7905 9.46647C20.8147 9.45167 20.8512 9.43688 20.8877 9.42209C21.0091 9.36273 21.1425 9.29599 21.2758 9.22924C21.2758 9.22924 21.288 9.22184 21.3001 9.21444C21.4456 9.13291 21.5426 8.98494 21.5426 8.82218C21.5426 8.80738 21.5426 8.79259 21.5426 8.77779C21.5426 8.65189 21.4941 8.53338 21.4092 8.44965C21.3242 8.36592 21.2028 8.3141 21.0815 8.3141H16.7269L13.0747 9.68866Z" fill="#003087" />
                      <path d="M30.5249 9.68855C30.5959 9.29563 30.961 9 31.3801 9H36.7232C36.8464 9 37.093 9.02958 37.1926 9.05177C37.304 9.07396 37.5146 9.14071 37.6378 9.19267C37.6499 9.19267 37.662 9.20007 37.6742 9.20746C37.7106 9.22226 37.747 9.23705 37.7833 9.24445C37.8703 9.28142 37.9573 9.32582 38.032 9.37778C38.0828 9.41476 38.1313 9.45914 38.1799 9.51111C38.2042 9.5333 38.2285 9.55548 38.2528 9.58509C38.2771 9.61469 38.3012 9.6443 38.3255 9.67389C38.4347 9.7978 38.5438 9.95089 38.5924 10.0673C38.6288 10.1487 38.6774 10.26 38.7138 10.386C38.7381 10.4601 38.7502 10.5415 38.7502 10.6231V10.7119C38.7502 10.7711 38.7381 10.86 38.7259 10.9415C38.7016 11.0821 38.6652 11.2227 38.6167 11.356C38.5803 11.4671 38.5317 11.5782 38.471 11.6893C38.4467 11.741 38.4103 11.7929 38.386 11.8447C38.3374 11.9187 38.2888 11.9853 38.2281 12.0519C38.2038 12.0815 38.1796 12.1185 38.1553 12.1555C38.1188 12.2073 38.0703 12.2591 38.0217 12.3035C37.9853 12.3479 37.9367 12.3923 37.8881 12.4293C37.8638 12.4515 37.8395 12.4737 37.8152 12.4885C37.7545 12.5329 37.6817 12.5773 37.6089 12.6143C37.5846 12.6291 37.5725 12.6439 37.5482 12.6513C37.5482 12.6513 37.536 12.6587 37.5239 12.6587C37.4753 12.6883 37.4146 12.7105 37.3661 12.7327C37.2811 12.7697 37.1961 12.7993 37.1111 12.8215C37.0383 12.8437 36.9655 12.8585 36.8927 12.8733C36.8198 12.8881 36.7349 12.8955 36.65 12.9029C36.6014 12.9103 36.565 12.9103 36.5164 12.9103H35.3012C35.1556 12.9103 35.01 12.9695 34.9251 13.0731C34.8401 13.1767 34.8037 13.3173 34.8158 13.4506L35.0509 15.2931C35.063 15.419 35.0873 15.456 35.1237 15.4708C35.1602 15.493 35.1845 15.493 35.2452 15.493H36.0447C36.1897 15.493 36.322 15.4337 36.402 15.3227C36.4821 15.2117 36.5113 15.0637 36.4942 14.9153L36.4821 14.7598C36.4821 14.7079 36.4942 14.6487 36.5064 14.5969C36.5185 14.5747 36.5185 14.5451 36.5307 14.5229C36.5428 14.4859 36.5671 14.4489 36.5914 14.4119C36.6157 14.3823 36.64 14.3527 36.6643 14.3305C36.7007 14.2935 36.7493 14.2639 36.7978 14.2417C36.8221 14.2269 36.8464 14.2121 36.8707 14.2047C36.9193 14.1899 36.9678 14.1751 37.0164 14.1677C37.0528 14.1603 37.0892 14.1603 37.1256 14.1603H37.4091C38.0195 14.1603 38.5194 14.0049 38.8602 13.7005C39.2009 13.3962 39.395 12.9621 39.4436 12.4441C39.4922 11.9631 39.395 11.5707 39.1887 11.2742C38.9845 10.9851 38.653 10.8297 38.2281 10.8297H36.3747C36.2292 10.8297 36.0837 10.7631 35.9865 10.6521C35.8895 10.541 35.8409 10.393 35.8409 10.2375V10.1189C35.8409 9.97354 35.8895 9.82552 35.9865 9.71445C36.0837 9.60334 36.2171 9.53659 36.3626 9.53659H37.9367C38.0216 9.53659 38.1066 9.54399 38.1916 9.55878C38.2281 9.56618 38.2766 9.57357 38.3131 9.58837C38.3495 9.60335 38.3859 9.61814 38.4224 9.63294C38.4588 9.64773 38.4952 9.67011 38.5195 9.69231C38.5438 9.7071 38.5681 9.722 38.5923 9.74409C38.6166 9.76628 38.6288 9.78847 38.653 9.81066C38.6773 9.84025 38.7016 9.86984 38.7258 9.90682L38.7501 9.97354C38.7744 10.0105 38.7865 10.0549 38.7865 10.0919C38.7986 10.1289 38.8108 10.1733 38.8108 10.2227C38.8108 10.3042 38.7986 10.3782 38.7744 10.4522C38.7501 10.5188 38.7136 10.5854 38.6773 10.6373C38.6409 10.6891 38.5923 10.7409 38.5316 10.7779C38.5073 10.7927 38.483 10.8075 38.4588 10.8223C38.4102 10.8519 38.3617 10.8741 38.3131 10.8889L38.2767 10.9037C38.2281 10.9185 38.1795 10.9259 38.1309 10.9333C38.0702 10.9407 38.0074 10.9407 37.9366 10.9407H37.7911C37.7425 10.9407 37.6939 10.9333 37.6453 10.9259C37.5967 10.9185 37.5482 10.9037 37.4996 10.8889C37.4632 10.8741 37.4268 10.8593 37.3903 10.8371C37.349 10.8185 37.3099 10.7983 37.269 10.7779C37.2325 10.7557 37.1961 10.7261 37.1597 10.6965C37.1354 10.6743 37.1111 10.6521 37.0868 10.6225C37.0503 10.5929 37.0261 10.5559 36.9896 10.5189C36.9753 10.5003 36.9625 10.4806 36.9505 10.4601C36.9262 10.4305 36.9141 10.393 36.8898 10.356C36.8777 10.3338 36.8656 10.3116 36.8534 10.282C36.8413 10.2524 36.8291 10.2227 36.817 10.1931C36.8048 10.1485 36.8048 10.1041 36.7927 10.0597C36.7927 10.0375 36.7805 10.0079 36.7805 9.98597C36.7805 9.94898 36.7805 9.912 36.7927 9.87502C36.7927 9.83803 36.8048 9.80105 36.817 9.76406C36.8291 9.72708 36.8413 9.69009 36.8534 9.65311C36.8656 9.61612 36.8898 9.58654 36.9141 9.55695C36.9384 9.51257 36.9748 9.47559 37.0112 9.4386C37.0355 9.41382 37.0355 9.40644 37.0597 9.38424C37.0597 9.38424 37.0719 9.37685 37.0719 9.36945C37.084 9.36205 37.084 9.35466 37.0962 9.34726C37.0962 9.33986 37.1083 9.33247 37.1204 9.32507H37.1326C37.1569 9.31029 37.1812 9.30288 37.2055 9.29549C37.2419 9.28069 37.2783 9.27331 37.3147 9.25851C37.339 9.25111 37.3633 9.24372 37.3876 9.24372C37.4362 9.23632 37.4847 9.22153 37.5333 9.22153C37.5819 9.21413 37.6304 9.21413 37.679 9.21413H38.8472C38.9565 9.21413 39.0415 9.28084 39.0536 9.36945C39.0536 9.37685 39.0536 9.38424 39.0536 9.39164C39.0536 9.43602 39.0294 9.473 38.9808 9.5026C38.9444 9.53219 38.908 9.55439 38.8716 9.57658C38.823 9.61356 38.7744 9.64316 38.7258 9.66535C38.6772 9.69495 38.6286 9.72454 38.5799 9.74673C38.5193 9.77633 38.4586 9.80593 38.3979 9.83552C38.3372 9.86512 38.2643 9.88732 38.2036 9.91691C38.1307 9.9465 38.0579 9.9761 37.985 10.0057C37.9122 10.0353 37.8394 10.0575 37.7665 10.0871C37.6937 10.1167 37.6208 10.1463 37.548 10.1759C37.4752 10.2055 37.4023 10.2351 37.3295 10.2573C37.2566 10.2869 37.1838 10.3091 37.1109 10.3387C37.0381 10.3683 36.9653 10.3979 36.8803 10.4275C36.7953 10.4571 36.7103 10.4793 36.6254 10.5089C36.5404 10.5385 36.4554 10.5681 36.3704 10.5903C36.2976 10.6125 36.2126 10.6347 36.1277 10.6569C36.0548 10.6791 35.9699 10.6865 35.8849 10.7013C35.812 10.7161 35.7392 10.7235 35.6542 10.7309C35.5935 10.7383 35.5328 10.7457 35.4721 10.7457C35.4172 10.7457 35.367 10.7457 35.316 10.7457H34.5041C34.377 10.7457 34.2471 10.8023 34.1527 10.9065C34.0585 11.0107 34.0183 11.1515 34.0341 11.2928L34.4678 14.6045C34.5042 14.8412 34.7104 15.0114 34.9575 15.0114H36.2732C36.4187 15.0114 36.5643 14.9448 36.6614 14.8337C36.7585 14.7226 36.8071 14.582 36.795 14.4339L36.7828 14.2859C36.7828 14.2341 36.795 14.175 36.8071 14.1232C36.8071 14.101 36.8193 14.0714 36.8314 14.0492C36.8436 14.0122 36.8679 13.9752 36.8922 13.9382C36.9165 13.9086 36.9408 13.879 36.9651 13.8568C37.0015 13.8198 37.0501 13.7902 37.0986 13.768C37.1229 13.7532 37.1472 13.7384 37.1715 13.731C37.2201 13.7162 37.2687 13.7014 37.3172 13.694C37.3537 13.6866 37.3901 13.6866 37.4265 13.6866H37.6327C37.9955 13.6866 38.2669 13.5905 38.447 13.3983C38.6272 13.2061 38.7122 12.9398 38.7122 12.5922C38.7122 12.1507 38.627 11.8369 38.4572 11.6521C38.2873 11.4672 37.9955 11.3783 37.5842 11.3783H36.5673C36.4217 11.3783 36.2762 11.3117 36.1791 11.2006C36.082 11.0895 36.0334 10.9415 36.0334 10.786V10.6674C36.0334 10.5192 36.082 10.3712 36.1791 10.2601C36.2762 10.149 36.4096 10.0823 36.555 10.0823H36.6278C36.6885 10.0823 36.7492 10.0675 36.8099 10.0453C36.9191 10.0157 37.0282 9.97868 37.1374 9.9343C37.2567 9.88991 37.3658 9.84553 37.475 9.79596C37.5902 9.7519 37.7047 9.70584 37.8185 9.65781C37.9612 9.59876 38.1003 9.53496 38.2405 9.46636C38.2648 9.45156 38.3012 9.43677 38.3377 9.42198C38.4591 9.36262 38.5925 9.29588 38.7258 9.22913C38.7258 9.22913 38.738 9.22173 38.7501 9.21433C38.8956 9.1328 38.9926 8.98483 38.9926 8.82207C38.9926 8.80727 38.9926 8.79248 38.9926 8.77768C38.9926 8.65178 38.9441 8.53327 38.8592 8.44954C38.7742 8.36581 38.6528 8.31399 38.5315 8.31399H34.1771L30.5249 9.68855Z" fill="#009CDE" />
                      <path d="M22.4707 8.31348H26.9553L26.7203 9.82722H26.1857C26.1371 9.82722 26.1006 9.83461 26.0642 9.84201C26.0278 9.8494 25.9913 9.85679 25.9549 9.87159C25.9306 9.87898 25.9063 9.88638 25.882 9.89377C25.8334 9.90856 25.7849 9.93076 25.7363 9.95295C25.6998 9.97514 25.6634 9.99733 25.627 10.0195C25.6027 10.0343 25.5784 10.0491 25.5541 10.0639C25.5177 10.0861 25.4812 10.1157 25.4448 10.1379C25.4205 10.1527 25.3962 10.1749 25.3719 10.1897C25.3355 10.2193 25.2991 10.2489 25.2747 10.2786C25.2504 10.3082 25.2383 10.3156 25.214 10.3452C25.1897 10.3748 25.1775 10.3822 25.1654 10.4044C25.1533 10.434 25.1411 10.4636 25.1168 10.4933C25.1047 10.5155 25.0926 10.5451 25.0804 10.5673C25.0683 10.5969 25.0562 10.6265 25.044 10.6561C25.0319 10.6858 25.0197 10.7154 25.0076 10.745C25.0076 10.7598 24.9955 10.7746 24.9955 10.7894C24.9833 10.819 24.9833 10.8486 24.9712 10.8783C24.9712 10.893 24.959 10.9152 24.959 10.93C24.9469 10.9596 24.9469 10.9892 24.9469 11.0189C24.9469 11.0337 24.9469 11.0485 24.9469 11.0633C24.9469 11.0929 24.9469 11.1225 24.9469 11.1521C24.9469 11.1669 24.9469 11.1817 24.959 11.1965C24.959 11.2262 24.9712 11.2558 24.9712 11.2854C24.9712 11.3002 24.9833 11.315 24.9833 11.3298C24.9955 11.3594 24.9955 11.389 25.0076 11.4187C25.0076 11.4335 25.0197 11.4483 25.0197 11.4631C25.0319 11.4927 25.044 11.5223 25.0562 11.552C25.0562 11.5668 25.0683 11.5816 25.0683 11.5964C25.0804 11.626 25.0926 11.6556 25.1168 11.6852C25.1168 11.7 25.1289 11.7148 25.1289 11.7296C25.1411 11.7592 25.1654 11.7888 25.1775 11.8185C25.1775 11.8333 25.1897 11.8481 25.2018 11.8629C25.214 11.8925 25.2383 11.9221 25.2504 11.9517C25.2747 11.9813 25.2869 12.0035 25.3112 12.0332C25.3355 12.0628 25.3598 12.0924 25.3841 12.122C25.4084 12.1442 25.4205 12.159 25.4448 12.1812C25.4691 12.2108 25.5056 12.2405 25.5299 12.2701C25.5541 12.2923 25.5785 12.3071 25.6028 12.3293C25.6271 12.3515 25.6514 12.3737 25.6757 12.3959C25.6757 12.3959 25.6878 12.4033 25.6878 12.4107C25.6999 12.4181 25.712 12.4255 25.7242 12.4329C25.7485 12.4551 25.7849 12.4699 25.8092 12.4847C25.8335 12.4995 25.8699 12.5143 25.8942 12.5291C25.9428 12.5514 25.9914 12.5662 26.04 12.581C26.0764 12.5884 26.125 12.5958 26.1614 12.6032C26.1857 12.6032 26.21 12.6106 26.2343 12.6106C26.3191 12.618 26.4042 12.618 26.4649 12.6254C26.4406 12.6994 26.4164 12.7957 26.38 12.8993C26.3678 12.9363 26.3557 12.9659 26.3436 13.0029C26.3315 13.0177 26.3315 13.0325 26.3193 13.0473C26.3072 13.0769 26.2829 13.1065 26.2708 13.1361C26.2586 13.1583 26.2465 13.1731 26.2343 13.1879C26.2222 13.2101 26.21 13.2249 26.1979 13.2471C26.1736 13.2693 26.1493 13.2841 26.137 13.3063C26.1128 13.3359 26.0885 13.3507 26.0642 13.3655C26.0399 13.3803 26.0156 13.4025 25.9913 13.4173C25.9549 13.4395 25.9185 13.4617 25.882 13.4765C25.8577 13.4839 25.8456 13.4913 25.8213 13.4913C25.7849 13.4987 25.7485 13.5061 25.712 13.5061H24.4606C24.4121 13.5061 24.3756 13.4987 24.3513 13.4913C24.327 13.4839 24.3149 13.4839 24.2906 13.4765C24.2542 13.4617 24.2177 13.4469 24.1813 13.4247C24.1571 13.4173 24.145 13.4099 24.1207 13.4025C24.0842 13.3803 24.0478 13.3507 24.0114 13.3211C23.9871 13.3063 23.9628 13.2841 23.9385 13.2619C23.9142 13.2397 23.8899 13.2175 23.8656 13.1953C23.8413 13.1731 23.8291 13.1583 23.8048 13.1287C23.7805 13.0991 23.7441 13.0621 23.7198 13.0251C23.7077 13.0103 23.6956 12.9955 23.6835 12.9733C23.6592 12.9437 23.6471 12.9141 23.6228 12.8845C23.6107 12.8623 23.5985 12.8401 23.5864 12.8179C23.5743 12.7883 23.5622 12.7587 23.55 12.7291C23.55 12.7143 23.5379 12.6995 23.5379 12.6847C23.5257 12.6551 23.5257 12.6255 23.5136 12.5959C23.5136 12.5737 23.5014 12.5515 23.5014 12.5293C23.5014 12.4997 23.4893 12.47 23.4893 12.4404C23.4893 12.4182 23.4893 12.3886 23.4893 12.3664C23.4893 12.3368 23.4893 12.2924 23.4893 12.2628C23.4893 12.2406 23.4893 12.211 23.5014 12.1888C23.5014 12.1666 23.5014 12.137 23.5136 12.1148C23.5136 12.0926 23.5257 12.0704 23.5257 12.0482C23.5379 12.026 23.5379 12.0038 23.55 11.9816C23.55 11.9594 23.5622 11.9372 23.5622 11.915C23.5743 11.8854 23.5864 11.8558 23.5985 11.8336C23.6107 11.8114 23.6107 11.7892 23.6228 11.767C23.635 11.7448 23.6471 11.7226 23.6592 11.7004C23.6714 11.6782 23.6835 11.656 23.6956 11.6338C23.7077 11.6116 23.7198 11.5894 23.732 11.5672C23.7441 11.545 23.7562 11.5228 23.7684 11.5006C23.7805 11.4784 23.7926 11.4562 23.8048 11.4414C23.8169 11.4192 23.8291 11.397 23.8534 11.3748C23.8656 11.3526 23.8777 11.3304 23.8899 11.3156C23.902 11.3008 23.9142 11.2786 23.9263 11.2638C23.9385 11.2416 23.9506 11.2268 23.9628 11.2046C23.9749 11.1898 23.987 11.175 23.9992 11.1602C24.0113 11.138 24.0234 11.1232 24.0356 11.101C24.0478 11.0862 24.0599 11.0714 24.072 11.0566C24.0842 11.0344 24.0963 11.0196 24.1085 11.0048C24.1206 10.99 24.1328 10.9752 24.1449 10.9604C24.157 10.9456 24.1692 10.9308 24.1813 10.916C24.1935 10.9012 24.2056 10.8864 24.2177 10.8716C24.2299 10.8568 24.242 10.842 24.2542 10.8272C24.2663 10.8124 24.2785 10.7976 24.2906 10.7828C24.3027 10.768 24.3149 10.7532 24.327 10.7384C24.3391 10.7236 24.3513 10.7088 24.3634 10.694C24.3756 10.6792 24.3877 10.6644 24.3998 10.6496C24.412 10.6348 24.4241 10.62 24.4363 10.6052C24.4484 10.5904 24.4727 10.5756 24.4849 10.5608C24.497 10.546 24.5092 10.5312 24.5213 10.5164C24.5335 10.5016 24.5456 10.4868 24.5578 10.472C24.5699 10.4572 24.582 10.4424 24.5942 10.4276C24.6063 10.4128 24.6185 10.398 24.6306 10.3832C24.6427 10.3684 24.6669 10.3536 24.6791 10.3388C24.6912 10.324 24.7154 10.3092 24.7276 10.2944C24.7397 10.2796 24.7518 10.2648 24.764 10.25C24.7761 10.2352 24.7882 10.2204 24.8003 10.2056C24.8125 10.1908 24.8246 10.176 24.8367 10.1612C24.8489 10.1464 24.861 10.1316 24.8731 10.1168C24.8853 10.102 24.8974 10.0872 24.9095 10.0724C24.9217 10.0576 24.9338 10.0428 24.9459 10.028C24.9581 10.0132 24.9702 9.99842 24.9823 9.98362C24.9945 9.96883 25.0066 9.95403 25.0187 9.93923C25.0309 9.92444 25.043 9.90964 25.0551 9.89484C25.0673 9.88005 25.0794 9.86525 25.0915 9.85045C25.1037 9.83566 25.1158 9.82086 25.1279 9.80606C25.1401 9.79127 25.1522 9.77647 25.1644 9.76167C25.1765 9.74687 25.1886 9.73208 25.2008 9.71728C25.2129 9.70248 25.225 9.68769 25.2372 9.67289C25.2493 9.65809 25.2615 9.6433 25.2736 9.6285C25.2857 9.6137 25.2979 9.59891 25.31 9.58411C25.3221 9.56931 25.3343 9.55452 25.3464 9.53972C25.3586 9.52492 25.3707 9.51013 25.3828 9.49533C25.395 9.48053 25.4071 9.46574 25.4192 9.45094C25.4314 9.43614 25.4435 9.42135 25.4556 9.40655C25.4678 9.39175 25.4799 9.37696 25.492 9.36216C25.5042 9.34736 25.5163 9.33257 25.5285 9.31777C25.5406 9.30297 25.5527 9.28818 25.5649 9.27338C25.577 9.25858 25.5891 9.24379 25.6013 9.22899C25.6134 9.21419 25.6256 9.1994 25.6377 9.1846C25.6498 9.1698 25.662 9.15501 25.6741 9.14021C25.6983 9.11062 25.7226 9.08103 25.759 9.05143C25.7833 9.02923 25.8076 9.00704 25.8319 8.98484C25.8683 8.95525 25.9048 8.92566 25.9412 8.90346C25.9655 8.88867 25.9898 8.87387 26.0141 8.85908C26.0505 8.84428 26.0869 8.82949 26.1233 8.81469C26.1476 8.80729 26.1719 8.7999 26.1962 8.7999C26.2448 8.79251 26.2934 8.78511 26.342 8.77771C26.3784 8.77031 26.4148 8.77032 26.4513 8.77032H27.1753C27.3208 8.77771 27.442 8.88882 27.454 9.03678L26.9683 13.3655C26.9562 13.5061 27.0048 13.6467 27.1018 13.7504C27.1988 13.8615 27.3443 13.9209 27.4898 13.9209H29.4374C29.5829 13.9209 29.7163 13.8467 29.8012 13.7356C29.8861 13.6245 29.9226 13.4765 29.8982 13.3359L29.2391 8.3141H28.9315L22.4707 8.31348Z" fill="#003087" />
                    </svg>
                  </div>
                </RadioGroup>
              </div>
            </div>}
          
          {/* Contact & Address Info - Third step (only for card, cod, transfer) */}
          {checkoutStep === 'address' && <>
              <div className="space-y-4">
                <h3 className="font-semibold">Kontaktni podatki</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ime</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Priimek</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-pošta</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Naslov dostave</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Naslov in hišna številka</Label>
                  <Input id="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Poštna številka</Label>
                    <Input id="postalCode" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Kraj</Label>
                    <Input id="city" required />
                  </div>
                </div>
              </div>
            </>}
          
          <div className="pt-4 border-t">
            {checkoutStep === 'color_payment' && <Button type="submit" className="w-full cta-button bg-tarsal-accent hover:bg-tarsal-accent/90">
                {paymentMethod === 'applepay' ? 'Plačaj z Apple Pay' : paymentMethod === 'paypal' ? 'Plačaj s PayPal' : 'Nadaljuj z naročilom'}
              </Button>}
            
            {checkoutStep === 'address' && <Button type="submit" className="w-full cta-button bg-tarsal-accent hover:bg-tarsal-accent/90">
                Oddaj naročilo
              </Button>}
            
            {checkoutStep !== 'package' && <Button type="button" variant="outline" className="w-full mt-2" onClick={() => {
            if (checkoutStep === 'color_payment') setCheckoutStep('package');else if (checkoutStep === 'address') setCheckoutStep('color_payment');
          }}>
                Nazaj na {checkoutStep === 'color_payment' ? 'izbiro paketa' : 'izbiro barve in plačila'}
              </Button>}
            
            <p className="text-xs text-center text-gray-500 mt-4">
              S klikom na gumb potrjujete, da se strinjate s pogoji poslovanja in politiko zasebnosti.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};
export default CheckoutModal;