
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { Check, Package, ShoppingCart } from 'lucide-react';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productVariant?: 'basic' | 'double' | 'family';
  skipPackageSelection?: boolean;
}

// Define a common product variant interface with optional popular property
interface ProductVariant {
  name: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  popular?: boolean;
  features: string[];
}

type ColorOption = 'belo' | 'črno';

interface ColorSelection {
  index: number;
  color: ColorOption;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  open, 
  onOpenChange,
  productVariant = 'double',
  skipPackageSelection = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'transfer' | 'applepay' | 'paypal'>('card');
  const [checkoutStep, setCheckoutStep] = useState<'package' | 'color' | 'payment' | 'address'>('package');
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'double' | 'family'>(productVariant);
  const [colorSelections, setColorSelections] = useState<ColorSelection[]>([]);
  
  // Reset checkout step when modal opens
  useEffect(() => {
    if (open) {
      // Skip to color selection if coming from pricing section
      if (skipPackageSelection) {
        setCheckoutStep('color');
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
      initialSelections.push({ index: i, color: 'belo' });
    }
    
    setColorSelections(initialSelections);
  };
  
  const variants: Record<'basic' | 'double' | 'family', ProductVariant> = {
    basic: {
      name: "Osnovni paket",
      quantity: 1,
      price: 17.90,
      discount: 0,
      total: 17.90,
      features: [
        "1x Tarsal TOE paket",
        "Testirano v Sloveniji", 
        "Priročna embalaža",
        "Dostava v 48h"
      ]
    },
    double: {
      name: "Dvojni paket",
      quantity: 2,
      price: 17.90,
      discount: 20,
      total: 28.64,
      popular: true,
      features: [
        "2x Tarsal TOE paket", 
        "GRATIS vaje za dnevno vadbo", 
        "Priročna embalaža", 
        "Testirano v Sloveniji",
        "Dostava v 48h"
      ]
    },
    family: {
      name: "Družinski paket",
      quantity: 3,
      price: 17.90,
      discount: 25,
      total: 40.26,
      features: [
        "3x Tarsal TOE paket", 
        "GRATIS vaje za dnevno vadbo", 
        "Priročna embalaža", 
        "Testirano v Sloveniji",
        "GRATIS dostava v 48h"
      ]
    }
  };

  const selectedVariant = variants[selectedPackage];
  const shipping = selectedVariant.total >= 30 ? 0 : 3;
  const codFee = paymentMethod === 'cod' ? 0.99 : 0;
  const finalTotal = selectedVariant.total + shipping + codFee;
  
  // Calculate savings
  const originalPrice = selectedVariant.price * selectedVariant.quantity;
  const savings = selectedVariant.discount > 0 ? originalPrice - selectedVariant.total : 0;

  // Determine which features are free
  const freeFeatures = selectedVariant.features.filter(feature => 
    feature.toLowerCase().includes('gratis') || 
    feature.toLowerCase().includes('brezplačna')
  );

  const handlePackageSelect = () => {
    initializeColorSelections(selectedPackage);
    setCheckoutStep('color');
  };
  
  const handleColorSelect = () => {
    setCheckoutStep('payment');
  };

  const handlePaymentSelect = () => {
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
  };

  const handleColorChange = (index: number, color: ColorOption) => {
    setColorSelections(prev => 
      prev.map(item => 
        item.index === index ? { ...item, color } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkoutStep === 'package') {
      handlePackageSelect();
      return;
    }
    
    if (checkoutStep === 'color') {
      handleColorSelect();
      return;
    }
    
    if (checkoutStep === 'payment') {
      handlePaymentSelect();
      return;
    }
    
    toast.success("Naročilo uspešno oddano! Prejeli boste potrditveni e-mail.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {checkoutStep === 'package' ? 'Izberite paket' : 
             checkoutStep === 'color' ? 'Izberite barvo' :
             checkoutStep === 'payment' ? 'Način plačila' : 
             'Zaključek naročila'}
          </DialogTitle>
          <DialogDescription>
            {checkoutStep === 'package' ? 'Izberite paket, ki ustreza vašim potrebam.' : 
             checkoutStep === 'color' ? 'Izberite barvo za vsak TOE v vašem paketu.' :
             checkoutStep === 'payment' ? 'Izberite način plačila za vaš nakup.' : 
             'Izpolnite svoje podatke za dostavo.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Order Summary - Always visible except on package selection */}
          {checkoutStep !== 'package' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Povzetek naročila</h3>
              
              {savings > 0 && (
                <div className="bg-green-100 p-3 rounded-md mb-3 border border-green-300">
                  <p className="font-bold text-green-800 text-center text-lg">
                    Prihranili ste: {savings.toFixed(2)}€
                  </p>
                </div>
              )}
              
              {freeFeatures.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-md mb-3 border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">Brezplačne ugodnosti:</p>
                  <ul className="space-y-1">
                    {freeFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-blue-700">
                        <Check size={16} className="mr-1 flex-shrink-0" />
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
                  <span>Dostava</span>
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
          
          {/* Package Selection - First step */}
          {checkoutStep === 'package' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(variants).map(([key, variant]) => {
                  const isSelected = selectedPackage === key;
                  return (
                    <div 
                      key={key}
                      className={cn(
                        "relative border rounded-xl transition-all duration-200 overflow-hidden cursor-pointer",
                        isSelected ? "border-tarsal-accent ring-2 ring-tarsal-accent/30 shadow-lg" : "border-gray-200 hover:border-tarsal-accent/50",
                        variant.popular ? "md:-translate-y-2" : ""
                      )}
                      onClick={() => setSelectedPackage(key as 'basic' | 'double' | 'family')}
                    >
                      {variant.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-tarsal-accent text-white text-xs font-medium py-1 text-center">
                          Najbolj priljubljeno
                        </div>
                      )}
                      
                      <div className={cn(
                        "p-5", 
                        variant.popular ? "pt-7" : "",
                        isSelected ? "bg-tarsal-accent/5" : ""
                      )}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{variant.name}</h3>
                            <p className="text-sm text-gray-600">{variant.quantity}x TOE</p>
                          </div>
                          {isSelected && (
                            <div className="bg-tarsal-accent text-white h-6 w-6 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-baseline mb-2">
                            <span className="text-2xl font-bold">
                              {variant.discount > 0 
                                ? ((variant.price * variant.quantity * (100 - variant.discount)) / 100 / variant.quantity).toFixed(2)
                                : variant.price.toFixed(2)
                              }€
                            </span>
                            <span className="text-sm text-gray-500 ml-1">/kos</span>
                            {variant.discount > 0 && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
                                -{variant.discount}%
                              </span>
                            )}
                          </div>
                          {variant.discount > 0 && (
                            <div className="text-sm text-gray-500 line-through">
                              {variant.price.toFixed(2)}€/kos
                            </div>
                          )}
                        </div>
                        
                        <ul className="space-y-2 mb-6">
                          {variant.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="text-sm font-semibold mb-2">
                          Končna cena: <span className="text-lg">{variant.total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Color Selection - Second step */}
          {checkoutStep === 'color' && (
            <div className="space-y-6">
              <h3 className="font-semibold">Izberite barvo za vsak TOE izdelek</h3>
              <div className="space-y-4">
                {Array.from({ length: variants[selectedPackage].quantity }).map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">TOE {index + 1}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={cn(
                          "border rounded-md p-3 flex items-center justify-between cursor-pointer transition-all",
                          colorSelections.find(s => s.index === index)?.color === 'belo' 
                            ? "border-tarsal-accent bg-tarsal-accent/5 ring-1 ring-tarsal-accent/30" 
                            : "hover:border-gray-400"
                        )}
                        onClick={() => handleColorChange(index, 'belo')}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-white border border-gray-300 mr-2"></div>
                          <span>Belo</span>
                        </div>
                        {colorSelections.find(s => s.index === index)?.color === 'belo' && (
                          <Check className="h-4 w-4 text-tarsal-accent" />
                        )}
                      </div>
                      
                      <div
                        className={cn(
                          "border rounded-md p-3 flex items-center justify-between cursor-pointer transition-all",
                          colorSelections.find(s => s.index === index)?.color === 'črno' 
                            ? "border-tarsal-accent bg-tarsal-accent/5 ring-1 ring-tarsal-accent/30" 
                            : "hover:border-gray-400"
                        )}
                        onClick={() => handleColorChange(index, 'črno')}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-black mr-2"></div>
                          <span>Črno</span>
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
          )}
          
          {/* Payment Method Selection - Third step */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Način plačila</h3>
              <RadioGroup 
                defaultValue="card" 
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as any)}
                className="space-y-3"
              >
                <div className={cn(
                  "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all",
                  paymentMethod === 'card' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                )}>
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Kreditna kartica</Label>
                  <div className="flex space-x-1">
                    <div className="w-8 h-5 bg-blue-600 rounded"></div>
                    <div className="w-8 h-5 bg-red-500 rounded"></div>
                  </div>
                </div>
                
                <div className={cn(
                  "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all",
                  paymentMethod === 'cod' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                )}>
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">Po povzetju (+0,99€)</Label>
                  <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">COD</div>
                </div>
                
                <div className={cn(
                  "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all",
                  paymentMethod === 'transfer' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                )}>
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex-1 cursor-pointer">Bančno nakazilo</Label>
                  <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">€</div>
                </div>
                
                <div className={cn(
                  "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all",
                  paymentMethod === 'applepay' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                )}>
                  <RadioGroupItem value="applepay" id="applepay" />
                  <Label htmlFor="applepay" className="flex-1 cursor-pointer">Apple Pay</Label>
                  <div className="w-8 h-5 bg-black rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.9 6.8c-.4.5-.7.8-1.1 1.3-.4.4-.6.7-1.1.7s-.8-.1-1.3-.2c-.5-.1-1-.2-1.6-.2s-1.1.1-1.6.2c-.5.1-.9.2-1.3.2-.4 0-.7-.2-1.1-.6-.4-.4-.8-.8-1.1-1.3-.6-.8-1.1-1.8-1.3-2.8-.2-1-.3-2.1.1-3.1.6-1.5 1.6-2.4 3-2.8.8-.2 1.6-.2 2.3.1.4.2.8.4 1.2.4.4 0 .8-.2 1.2-.4.7-.3 1.5-.4 2.3-.1 1.3.4 2.2 1.2 2.8 2.3-1.2.7-1.9 1.9-1.9 3.3.1 1.2.5 2.2 1.5 3"></path>
                      <path d="M16.6 2.3C16.6 1 17.5 0 18.7 0c.2 1.3-.4 2.5-1.2 3.3-.8.9-1.9 1-2.1 1-1.2 0-2.2-.9-2.2-2.1 0-1.1 1-2 2.2-2.1.3 0 .8.1 1.2.2z"></path>
                    </svg>
                  </div>
                </div>
                
                <div className={cn(
                  "flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-all",
                  paymentMethod === 'paypal' ? "border-tarsal-accent bg-tarsal-accent/5" : "hover:border-tarsal-accent/50"
                )}>
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-1.384-1.028-3.63-1.207-6.15-1.207H9.112c-.266 0-.492.192-.533.454L6.184 16.37a.194.194 0 0 0 .04.166.193.193 0 0 0 .154.078h2.564c.327 0 .603-.237.654-.56l.162-1.03.288-1.828a.642.642 0 0 1 .634-.54h.782c3.16 0 5.5-1.285 6.202-4.989a4.47 4.47 0 0 0 .056-1.75z"></path>
                    </svg>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}
          
          {/* Contact & Address Info - Fourth step (only for card, cod, transfer) */}
          {checkoutStep === 'address' && (
            <>
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
            </>
          )}
          
          <div className="pt-4 border-t">
            <Button 
              type="submit" 
              className={cn(
                "w-full cta-button border-0",
                checkoutStep === 'package' && selectedPackage === 'double' ? "bg-gradient-to-r from-tarsal-accent to-tarsal-accent/80" : ""
              )}
            >
              {checkoutStep === 'package' 
                ? 'Nadaljuj na izbiro barve' 
                : checkoutStep === 'color'
                ? 'Nadaljuj na plačilo'
                : checkoutStep === 'payment' 
                ? 'Nadaljuj z naročilom' 
                : 'Oddaj naročilo'}
            </Button>
            
            {checkoutStep !== 'package' && (
              <Button 
                type="button"
                variant="outline" 
                className="w-full mt-2"
                onClick={() => {
                  if (checkoutStep === 'color') setCheckoutStep('package');
                  else if (checkoutStep === 'payment') setCheckoutStep('color');
                  else if (checkoutStep === 'address') setCheckoutStep('payment');
                }}
              >
                Nazaj na {
                  checkoutStep === 'color' ? 'izbiro paketa' : 
                  checkoutStep === 'payment' ? 'izbiro barve' : 
                  'plačilne možnosti'
                }
              </Button>
            )}
            
            <p className="text-xs text-center text-gray-500 mt-4">
              S klikom na gumb potrjujete, da se strinjate s pogoji poslovanja in politiko zasebnosti.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
