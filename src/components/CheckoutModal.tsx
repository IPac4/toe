
import React, { useState } from 'react';
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

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productVariant?: 'basic' | 'double' | 'family';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  open, 
  onOpenChange,
  productVariant = 'double'
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'transfer' | 'applepay'>('card');
  
  const variants = {
    basic: {
      name: "Osnovni paket",
      quantity: 1,
      price: 17.90,
      discount: 0,
      total: 17.90
    },
    double: {
      name: "Dvojni paket",
      quantity: 2,
      price: 17.90,
      discount: 20,
      total: 28.64
    },
    family: {
      name: "Družinski paket",
      quantity: 3,
      price: 17.90,
      discount: 25,
      total: 40.26
    }
  };

  const selectedVariant = variants[productVariant];
  const shipping = selectedVariant.total >= 30 ? 0 : 3;
  const codFee = paymentMethod === 'cod' ? 0.99 : 0;
  const finalTotal = selectedVariant.total + shipping + codFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Naročilo uspešno oddano! Prejeli boste potrditveni e-mail.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Zaključek naročila</DialogTitle>
          <DialogDescription>
            Izpolnite svoje podatke za dostavo in izberite način plačila.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Povzetek naročila</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{selectedVariant.name} ({selectedVariant.quantity}x TOE)</span>
                <span>{selectedVariant.total.toFixed(2)}€</span>
              </div>
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
          
          {/* Contact Info */}
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
          
          {/* Shipping Address */}
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
          
          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold">Način plačila</h3>
            <RadioGroup 
              defaultValue="card" 
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as any)}
            >
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">Kreditna kartica</Label>
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-blue-600 rounded"></div>
                  <div className="w-8 h-5 bg-red-500 rounded"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">Po povzetju (+0,99€)</Label>
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">COD</div>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex-1 cursor-pointer">Bančno nakazilo</Label>
                <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">€</div>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="applepay" id="applepay" />
                <Label htmlFor="applepay" className="flex-1 cursor-pointer">Apple Pay</Label>
                <div className="w-8 h-5 bg-black rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9 6.8c-.4.5-.7.8-1.1 1.3-.4.4-.6.7-1.1.7s-.8-.1-1.3-.2c-.5-.1-1-.2-1.6-.2s-1.1.1-1.6.2c-.5.1-.9.2-1.3.2-.4 0-.7-.2-1.1-.6-.4-.4-.8-.8-1.1-1.3-.6-.8-1.1-1.8-1.3-2.8-.2-1-.3-2.1.1-3.1.6-1.5 1.6-2.4 3-2.8.8-.2 1.6-.2 2.3.1.4.2.8.4 1.2.4.4 0 .8-.2 1.2-.4.7-.3 1.5-.4 2.3-.1 1.3.4 2.2 1.2 2.8 2.3-1.2.7-1.9 1.9-1.9 3.3.1 1.2.5 2.2 1.5 3"></path>
                    <path d="M16.6 2.3C16.6 1 17.5 0 18.7 0c.2 1.3-.4 2.5-1.2 3.3-.8.9-1.9 1-2.1 1-1.2 0-2.2-.9-2.2-2.1 0-1.1 1-2 2.2-2.1.3 0 .8.1 1.2.2z"></path>
                  </svg>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              type="submit" 
              className="w-full cta-button border-0"
            >
              Oddaj naročilo
            </Button>
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
