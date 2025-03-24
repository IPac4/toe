
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
import { redirectToShopifyCheckout } from '@/utils/shopifyUtils';

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
  hasExercises?: boolean;
  description?: string;
  pricePerItem?: number;
}

type ColorOption = 'belo' | 'črno';
interface ColorSelection {
  index: number;
  color: ColorOption;
}

// Define proper type for checkout steps to avoid type comparison errors
type CheckoutStep = 'package' | 'color_payment' | 'address';
type PaymentMethod = 'card' | 'cod' | 'transfer' | 'applepay' | 'paypal' | 'shopify';

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  onOpenChange,
  productVariant = 'double',
  skipPackageSelection = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('package');
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'double' | 'family'>(productVariant);
  const [colorSelections, setColorSelections] = useState<ColorSelection[]>([]);
  const isMobile = useIsMobile();

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    minutes: 15,
    seconds: 0
  });

  // Initialize countdown timer when modal opens
  useEffect(() => {
    if (open) {
      setCountdown({
        minutes: 15,
        seconds: 0
      });
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev.seconds > 0) {
            return {
              ...prev,
              seconds: prev.seconds - 1
            };
          } else if (prev.minutes > 0) {
            return {
              minutes: prev.minutes - 1,
              seconds: 59
            };
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
  const freeFeatures = selectedVariant.features.filter(feature => 
    feature.toLowerCase().includes('gratis') || 
    feature.toLowerCase().includes('brezplačna')
  );
  
  const handlePackageSelect = (packageId: 'basic' | 'double' | 'family') => {
    setSelectedPackage(packageId);
    initializeColorSelections(packageId);
    setCheckoutStep('color_payment');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If Shopify is selected as payment method, redirect to Shopify checkout
    if (paymentMethod === 'shopify') {
      toast.success("Preusmerjanje na Shopify blagajno...");
      redirectToShopifyCheckout(selectedPackage, colorSelections);
      return;
    }
    
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
            {checkoutStep === 'package' ? 'Izberite paket' : 
             checkoutStep === 'color_payment' ? 'Izberite barvo in način plačila' : 
             'Zaključek naročila'}
          </DialogTitle>
          <DialogDescription>
            {checkoutStep === 'package' ? 'Izberite paket, ki ustreza vašim potrebam.' : 
             checkoutStep === 'color_payment' ? 'Izberite barvo za vsak TOE v vašem paketu in način plačila.' : 
             'Izpolnite svoje podatke za dostavo.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
                    <div key={variantId} className={cn("price-card", variant.popular ? "popular transform scale-105" : "")}>
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
                        <Button 
                          type="button" 
                          onClick={() => handlePackageSelect(variantId)} 
                          className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 text-white mt-4"
                        >
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
                          className={cn(
                            "flex-1 border rounded-md p-2 flex items-center justify-between cursor-pointer transition-all",
                            colorSelections.find(s => s.index === index)?.color === 'belo'
                              ? "border-tarsal-accent bg-tarsal-accent/5"
                              : "hover:border-gray-400"
                          )}
                          onClick={() => handleColorChange(index, 'belo')}
                        >
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-white border border-gray-300 mr-1"></div>
                            <span className="text-sm">Bela</span>
                          </div>
                          {colorSelections.find(s => s.index === index)?.color === 'belo' && (
                            <Check className="h-4 w-4 text-tarsal-accent" />
                          )}
                        </div>
                        
                        <div
                          className={cn(
                            "flex-1 border rounded-md p-2 flex items-center justify-between cursor-pointer transition-all",
                            colorSelections.find(s => s.index === index)?.color === 'črno'
                              ? "border-tarsal-accent bg-tarsal-accent/5"
                              : "hover:border-gray-400"
                          )}
                          onClick={() => handleColorChange(index, 'črno')}
                        >
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-black mr-1"></div>
                            <span className="text-sm">Črna</span>
                          </div>
                          {colorSelections.find(s => s.index === index)?.color === 'črno' && (
                            <Check className="h-4 w-4 text-tarsal-accent" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Method Selection */}
              <div className="pt-2">
                <h3 className="font-semibold mb-3">Način plačila</h3>
                <RadioGroup 
                  defaultValue="card" 
                  value={paymentMethod} 
                  onValueChange={value => setPaymentMethod(value as PaymentMethod)} 
                  className="space-y-3"
                >
                  {/* Credit Card Option */}
                  <div className={cn(
                    "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", 
                    paymentMethod === 'card' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                  )}>
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
                  
                  {/* Cash on Delivery Option */}
                  <div className={cn(
                    "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", 
                    paymentMethod === 'cod' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                  )}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">Po povzetju (+0,99€)</Label>
                    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
                      <rect width="32" height="24" rx="4" fill="#F4F4F4" />
                      <path d="M8 8L16 12L24 8" stroke="#555555" strokeWidth="1.5" />
                      <path d="M8 12L16 16L24 12" stroke="#555555" strokeWidth="1.5" />
                      <path d="M8 16L16 20L24 16" stroke="#555555" strokeWidth="1.5" />
                    </svg>
                  </div>
                  
                  {/* Bank Transfer Option */}
                  <div className={cn(
                    "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", 
                    paymentMethod === 'transfer' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                  )}>
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">Bančno nakazilo</Label>
                    <svg className="h-6 w-8" viewBox="0 0 32 24" fill="none">
                      <rect width="32" height="24" rx="4" fill="#F4F4F4" />
                      <path d="M16 6L21 11H18V18H14V11H11L16 6Z" fill="#555555" />
                      <path d="M10 16V19H22V16H24V21H8V16H10Z" fill="#555555" />
                    </svg>
                  </div>
                  
                  {/* Apple Pay Option */}
                  <div className={cn(
                    "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", 
                    paymentMethod === 'applepay' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                  )}>
                    <RadioGroupItem value="applepay" id="applepay" />
                    <Label htmlFor="applepay" className="flex-1 cursor-pointer">Apple Pay</Label>
                    <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="#000000" />
                      <path d="M13.3 9.3C12.9 9.7 12.4 9.6 11.9 9.5C11.8 9 12 8.5 12.3 8.1C12.7 7.7 13.2 7.8 13.6 8C13.7 8.5 13.6 9 13.3 9.3Z" fill="white" />
                      <path d="M13.6 9.7C13 9.7 12.5 10.1 12.2 10.1C11.9 10.1 11.4 9.7 11 9.7C10.4 9.7 9.9 10 9.6 10.5C9 11.5 9.5 13 10.1 13.8C10.4 14.2 10.8 14.7 11.3 14.6C11.8 14.6 12 14.3 12.6 14.3C13.2 14.3 13.4 14.6 13.9 14.6C14.4 14.6 14.7 14.2 15 13.8C15.4 13.3 15.5 12.8 15.5 12.7C15.5 12.7 14.5 12.3 14.5 11.2C14.5 10.3 15.3 9.8 15.3 9.8C14.9 9.2 14.2 9.2 13.9 9.2C13.8 9.2 13.7 9.7 13.6 9.7Z" fill="white" />
                    </svg>
                  </div>
                  
                  {/* PayPal Option */}
                  <div className={cn(
                    "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", 
                    paymentMethod === 'paypal' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                  )}>
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                    <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="#F0F0F0" />
                      <path d="M31.1 8.4H29C28.8 8.4 28.7 8.5 28.6 8.7L27.4 14.8C27.4 14.9 27.4 15 27.6 15H28.6C28.8 15 28.9 14.9 29 14.7L29.3 13.3C29.3 13.1 29.5 13 29.7 13H30.3C32 13 33 12.2 33.3 10.6C33.5 9.9 33.3 9.4 33 9C32.6 8.6 32 8.4 31.1 8.4ZM31.4 10.7C31.2 11.5 30.6 11.5 30 11.5H29.7L30 10.1C30 10 30.1 10 30.2 10H30.3C30.7 10 31.1 10 31.1 10.3C31.4 10.3 31.4 10.5 31.4 10.7Z" fill="#253B80" />
                      <path d="M15.5 8.4H13.4C13.2 8.4 13.1 8.5 13 8.7L11.8 14.8C11.8 14.9 11.8 15 12 15H13C13.1 15 13.2 14.9 13.2 14.8L13.5 13.3C13.5 13.1 13.7 13 13.9 13H14.5C16.2 13 17.2 12.2 17.5 10.6C17.7 9.9 17.5 9.4 17.2 9C16.8 8.6 16.2 8.4 15.5 8.4ZM15.8 10.7C15.6 11.5 15 11.5 14.4 11.5H14.1L14.4 10.1C14.4 10 14.5 10 14.6 10H14.7C15.1 10 15.5 10 15.5 10.3C15.7 10.3 15.8 10.5 15.8 10.7Z" fill="#253B80" />
                      <path d="M22.5 10.6H21.4C21.3 10.6 21.2 10.6 21.2 10.7L21.1 10.8L21 10.6C20.7 10.2 20.3 10.1 19.8 10.1C18.6 10.1 17.6 11 17.4 12.1C17.3 12.7 17.4 13.2 17.7 13.5C18 13.8 18.4 14 18.9 14C19.9 14 20.4 13.3 20.4 13.3L20.3 13.4L20.2 14.8C20.2 14.9 20.2 15 20.4 15H21.3C21.4 15 21.6 14.9 21.6 14.7L22.3 10.8C22.4 10.8 22.3 10.6 22.5 10.6ZM20.8 12.2C20.7 12.7 20.3 13.1 19.8 13.1C19.5 13.1 19.3 13 19.2 12.9C19.1 12.7 19 12.5 19.1 12.2C19.2 11.7 19.6 11.3 20.1 11.3C20.4 11.3 20.6 11.4 20.7 11.5C20.7 11.7 20.8 11.9 20.8 12.2Z" fill="#253B80" />
                      <path d="M28.3 10.6H27.2C27.1 10.6 27 10.6 27 10.7L26.9 10.8L26.8 10.6C26.5 10.2 26.1 10.1 25.6 10.1C24.4 10.1 23.4 11 23.2 12.1C23.1 12.7 23.2 13.2 23.5 13.5C23.8 13.8 24.2 14 24.7 14C25.7 14 26.2 13.3 26.2 13.3L26.1 13.4L26 14.8C26 14.9 26 15 26.2 15H27.1C27.2 15 27.4 14.9 27.4 14.7L28.1 10.8C28.2 10.8 28.1 10.6 28.3 10.6ZM26.6 12.2C26.5 12.7 26.1 13.1 25.6 13.1C25.3 13.1 25.1 13 25 12.9C24.9 12.7 24.8 12.5 24.9 12.2C25 11.7 25.4 11.3 25.9 11.3C26.2 11.3 26.4 11.4 26.5 11.5C26.5 11.7 26.6 11.9 26.6 12.2Z" fill="#253B80" />
                    </svg>
                  </div>
                  
                  {/* Shopify Option */}
                  <div className={cn(
                    "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all", 
                    paymentMethod === 'shopify' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                  )}>
                    <RadioGroupItem value="shopify" id="shopify" />
                    <Label htmlFor="shopify" className="flex-1 cursor-pointer">Shopify</Label>
                    <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="#95BF47" />
                      <path d="M24.3 7.1C24.3 7.1 24.1 7 23.9 7C23.7 7 23.1 7 22.5 7C21.9 7 21.5 7.4 21.1 7.7C20.7 8 20.7 8.3 20.7 8.3L20.5 8.6C19.9 8.6 19.3 8.6 18.9 8.7C18.1 8.8 17.9 9.9 17.9 9.9L17.2 13.7L22.5 15.3L25.5 14.4L24.3 7.1ZM22.5 8.3C22.3 8.3 21.9 8.4 21.5 8.4L21.7 8C21.9 7.9 22.1 7.9 22.3 7.9C22.5 7.9 22.7 7.9 22.7 7.9C22.7 7.8 22.7 7.8 22.7 7.7C22.4 7.7 22.2 7.7 21.9 7.7C21.6 7.7 21.3 7.8 21.1 8C20.9 8.2 20.8 8.3 20.8 8.3L20.6 8.6C20.9 8.6 21.3 8.5 21.7 8.5C21.9 8.5 22.1 8.5 22.2 8.4C22.2 8.4 22.2 8.3 22.5 8.3Z" fill="white" />
                      <path d="M24.3 7.1C24.3 7.1 24.1 7 23.9 7C23.7 7 23.1 7 22.5 7C21.9 7 21.5 7.4 21.1 7.7C20.7 8 20.7 8.3 20.7 8.3L20.5 8.6C20.5 8.6 21.5 8.4 22.5 8.3C22.3 8.3 22.7 7.8 22.7 7.7C22.6 7.7 22.4 7.7 22.3 7.7C22.1 7.7 22 7.7 21.9 7.7C21.7 7.7 21.4 7.7 21.2 7.9L21.7 8C21.9 7.9 22.1 7.9 22.3 7.9C22.5 7.9 22.7 7.9 22.7 7.9C22.7 7.8 22.7 7.8 22.7 7.7C22.4 7.7 22.2 7.7 21.9 7.7C21.6 7.7 21.3 7.8 21.1 8C20.9 8.2 20.8 8.3 20.8 8.3L20.6 8.6C20.9 8.6 21.3 8.5 21.7 8.5C21.9 8.5 22.1 8.5 22.2 8.4C22.3 8.4 22.4 8.4 22.4 8.4" fill="#FFFFFF" />
                      <path d="M21.5 12.5L20.7 11.2C20.7 11.2 20.4 11.4 20.1 11.4C19.5 11.4 19.5 11 19.5 10.9C19.5 10.4 19.7 9.7 19.7 9.7H20.5L20.3 8.9H19.5C19.5 8.9 19.9 6.9 17.1 6.9C14.7 6.9 13.7 9 13.5 10.4C13.3 11.3 13.5 12.1 14.1 12.5L15.5 13.5C15.1 13.8 14.9 14.2 14.9 14.6C14.9 15 15.1 15.3 15.3 15.5C14.9 15.5 14.7 15.7 14.5 16C14.3 16.3 14.2 16.7 14.2 17.1C14.2 17.5 14.4 17.9 14.9 18.2C15.5 18.6 16.2 18.7 17.3 18.7C18.4 18.7 19.3 18.5 19.9 18.2C20.5 17.9 20.8 17.3 20.8 16.8C20.8 16.3 20.6 15.9 20.3 15.6C19.9 15.2 19.3 15 18.2 14.8C17.9 14.8 17.7 14.7 17.7 14.6C17.7 14.5 17.7 14.4 17.8 14.3C18.9 14.5 19.7 14.4 20.3 14.1C20.9 13.8 21.2 13.3 21.3 12.7C21.5 12.6 21.5 12.5 21.5 12.5ZM18.6 14.4C18.8 14.4 18.8 14.6 18.8 14.6V14.7C18.2 14.7 17.7 14.7 17.7 14.4C17.7 14.3 17.7 14.3 17.8 14.3C18 14.3 18.2 14.4 18.6 14.4ZM18.4 10.3C18.4 10.3 18.4 10.6 18.4 10.9C18.4 11.2 18.4 11.4 18.2 11.4C18.1 11.4 18.1 11.1 18.1 10.8C18.1 10.5 18.1 10.2 18.1 10C18.1 9.8 18.1 9.5 18.1 9.5C18.1 9.5 18.3 9.8 18.4 10.3ZM14.7 11.1C14.7 10.2 15.1 9.4 15.5 9.4C15.9 9.4 16.1 9.8 16.1 10.2C16.1 11.1 15.7 11.3 15.5 11.3C15.1 11.3 14.7 11.1 14.7 11.1ZM17.3 17.8C16.8 17.8 16.2 17.6 16.2 17.1C16.2 16.8 16.4 16.5 16.8 16.5H17.1C17.3 16.5 17.5 16.5 17.7 16.6C18.1 16.7 18.3 16.8 18.3 17.1C18.3 17.5 17.8 17.8 17.3 17.8Z" fill="white" />
                    </svg>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 text-white mt-4"
              >
                Nadaljuj naročilo
              </Button>
            </div>
          )}
          
          {checkoutStep === 'address' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Ime</Label>
                  <Input id="firstName" placeholder="Vaše ime" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Priimek</Label>
                  <Input id="lastName" placeholder="Vaš priimek" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="vas@email.si" required />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" placeholder="041 123 456" required />
              </div>
              
              <div>
                <Label htmlFor="address">Naslov</Label>
                <Input id="address" placeholder="Ulica in hišna številka" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">Poštna številka</Label>
                  <Input id="postalCode" placeholder="1000" required />
                </div>
                <div>
                  <Label htmlFor="city">Mesto</Label>
                  <Input id="city" placeholder="Ljubljana" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Opombe k naročilu (neobvezno)</Label>
                <Input id="notes" placeholder="Morebitne posebne zahteve" />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-tarsal-accent hover:bg-tarsal-accent/90 text-white mt-4"
              >
                Oddaj naročilo
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
