
import React, { useState, useEffect, useRef } from 'react';
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
  description?: string; // Added for product description
  pricePerItem?: number; // Added for price per item calculation
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
  
  // Add refs for Shopify buttons
  const basicPackageButtonRef = useRef<HTMLDivElement>(null);
  const doublePackageButtonRef = useRef<HTMLDivElement>(null);
  const familyPackageButtonRef = useRef<HTMLDivElement>(null);

  // Initialize Shopify Buy buttons after component mounts
  useEffect(() => {
    // Add Shopify SDK script only once
    const shopifyScriptId = 'shopify-buy-button-script';
    if (!document.getElementById(shopifyScriptId) && open) {
      const script = document.createElement('script');
      script.id = shopifyScriptId;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Initialize double package button
    if (doublePackageButtonRef.current && open) {
      const doublePackageScript = document.createElement('script');
      doublePackageScript.type = 'text/javascript';
      doublePackageScript.innerHTML = `
        /*<![CDATA[*/
        (function () {
          var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
          if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
              ShopifyBuyInit();
            } else {
              loadScript();
            }
          } else {
            loadScript();
          }
          function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
          }
          function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
              domain: 'c4504b.myshopify.com',
              storefrontAccessToken: 'e1d80871c8dfa43917436258128ba4ab',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {
              ui.createComponent('product', {
                id: '9827355296083',
                node: document.getElementById('product-component-modal-double'),
                moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                options: {
                  "product": {
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "calc(25% - 20px)",
                          "margin-left": "20px",
                          "margin-bottom": "50px"
                        }
                      },
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "buttonDestination": "checkout",
                    "contents": {
                      "img": false,
                      "title": false,
                      "price": false
                    },
                    "text": {
                      "button": "Naroči zdaj"
                    }
                  },
                  "productSet": {
                    "styles": {
                      "products": {
                        "@media (min-width: 601px)": {
                          "margin-left": "-20px"
                        }
                      }
                    }
                  },
                  "modalProduct": {
                    "contents": {
                      "img": false,
                      "imgWithCarousel": true,
                      "button": false,
                      "buttonWithQuantity": true
                    },
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "100%",
                          "margin-left": "0px",
                          "margin-bottom": "0px"
                        }
                      },
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "text": {
                      "button": "Add to cart"
                    }
                  },
                  "option": {},
                  "cart": {
                    "styles": {
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "text": {
                      "total": "Subtotal",
                      "button": "Checkout"
                    },
                    "popup": false
                  },
                  "toggle": {
                    "styles": {
                      "toggle": {
                        "background-color": "#0ca6e9",
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        ":focus": {
                          "background-color": "#0b95d2"
                        }
                      }
                    }
                  }
                },
              });
            });
          }
        })();
        /*]]>*/
      `;
      setTimeout(() => {
        if (doublePackageButtonRef.current) {
          doublePackageButtonRef.current.appendChild(doublePackageScript);
        }
      }, 100);
    }

    // Initialize family package button
    if (familyPackageButtonRef.current && open) {
      const familyPackageScript = document.createElement('script');
      familyPackageScript.type = 'text/javascript';
      familyPackageScript.innerHTML = `
        /*<![CDATA[*/
        (function () {
          var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
          if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
              ShopifyBuyInit();
            } else {
              loadScript();
            }
          } else {
            loadScript();
          }
          function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
          }
          function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
              domain: 'c4504b.myshopify.com',
              storefrontAccessToken: 'e1d80871c8dfa43917436258128ba4ab',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {
              ui.createComponent('product', {
                id: '9827356246355',
                node: document.getElementById('product-component-modal-family'),
                moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                options: {
                  "product": {
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "calc(25% - 20px)",
                          "margin-left": "20px",
                          "margin-bottom": "50px"
                        }
                      },
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "buttonDestination": "checkout",
                    "contents": {
                      "img": false,
                      "title": false,
                      "price": false
                    },
                    "text": {
                      "button": "Naroči zdaj"
                    }
                  },
                  "productSet": {
                    "styles": {
                      "products": {
                        "@media (min-width: 601px)": {
                          "margin-left": "-20px"
                        }
                      }
                    }
                  },
                  "modalProduct": {
                    "contents": {
                      "img": false,
                      "imgWithCarousel": true,
                      "button": false,
                      "buttonWithQuantity": true
                    },
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "100%",
                          "margin-left": "0px",
                          "margin-bottom": "0px"
                        }
                      },
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "text": {
                      "button": "Add to cart"
                    }
                  },
                  "option": {},
                  "cart": {
                    "styles": {
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "text": {
                      "total": "Subtotal",
                      "button": "Checkout"
                    },
                    "popup": false
                  },
                  "toggle": {
                    "styles": {
                      "toggle": {
                        "background-color": "#0ca6e9",
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        ":focus": {
                          "background-color": "#0b95d2"
                        }
                      }
                    }
                  }
                },
              });
            });
          }
        })();
        /*]]>*/
      `;
      setTimeout(() => {
        if (familyPackageButtonRef.current) {
          familyPackageButtonRef.current.appendChild(familyPackageScript);
        }
      }, 100);
    }

    // Initialize basic package button
    if (basicPackageButtonRef.current && open) {
      const basicPackageScript = document.createElement('script');
      basicPackageScript.type = 'text/javascript';
      basicPackageScript.innerHTML = `
        /*<![CDATA[*/
        (function () {
          var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
          if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
              ShopifyBuyInit();
            } else {
              loadScript();
            }
          } else {
            loadScript();
          }
          function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
          }
          function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
              domain: 'c4504b.myshopify.com',
              storefrontAccessToken: 'e1d80871c8dfa43917436258128ba4ab',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {
              ui.createComponent('product', {
                id: '9827355067651',
                node: document.getElementById('product-component-modal-basic'),
                moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                options: {
                  "product": {
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "calc(25% - 20px)",
                          "margin-left": "20px",
                          "margin-bottom": "50px"
                        }
                      },
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "buttonDestination": "checkout",
                    "contents": {
                      "img": false,
                      "title": false,
                      "price": false,
                      "options": false
                    },
                    "text": {
                      "button": "Naroči zdaj"
                    }
                  },
                  "productSet": {
                    "styles": {
                      "products": {
                        "@media (min-width: 601px)": {
                          "margin-left": "-20px"
                        }
                      }
                    }
                  },
                  "modalProduct": {
                    "contents": {
                      "img": false,
                      "imgWithCarousel": true,
                      "button": false,
                      "buttonWithQuantity": true
                    },
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "100%",
                          "margin-left": "0px",
                          "margin-bottom": "0px"
                        }
                      },
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "text": {
                      "button": "Add to cart"
                    }
                  },
                  "option": {},
                  "cart": {
                    "styles": {
                      "button": {
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        "background-color": "#0ca6e9",
                        ":focus": {
                          "background-color": "#0b95d2"
                        },
                        "border-radius": "13px"
                      }
                    },
                    "text": {
                      "total": "Subtotal",
                      "button": "Checkout"
                    },
                    "popup": false
                  },
                  "toggle": {
                    "styles": {
                      "toggle": {
                        "background-color": "#0ca6e9",
                        ":hover": {
                          "background-color": "#0b95d2"
                        },
                        ":focus": {
                          "background-color": "#0b95d2"
                        }
                      }
                    }
                  }
                },
              });
            });
          }
        })();
        /*]]>*/
      `;
      setTimeout(() => {
        if (basicPackageButtonRef.current) {
          basicPackageButtonRef.current.appendChild(basicPackageScript);
        }
      }, 100);
    }

    // Cleanup on unmount or when modal closes
    return () => {
      // No need to remove the main script, as it might be used elsewhere
    };
  }, [open]);

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
          
          {checkoutStep === 'package' && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isMobile ? variantsArray : [variants.basic, variants.double, variants.family]).map(variant => {
                  const variantId = variant.id as 'basic' | 'double' | 'family';
                  const isSelected = selectedPackage === variantId;
                  return <div key={variantId} className={cn("price-card", variant.popular ? "popular transform scale-105" : "")}>
                          {variant.popular && <div className="bg-tarsal-accent text-white py-2 text-center font-semibold">
                              Najbolj priljubljeno
                            </div>}
                          <div className="p-8 border-b">
                            <h3 className="text-2xl font-bold mb-2">{variant.name}</h3>
                            <p className="text-gray-600 mb-4">{variant.description}</p>
                            <div className="flex items-end mb-4">
                              <span className="text-4xl font-bold">{variant.pricePerItem?.toFixed(2)}€</span>
                              <span className="text-gray-500 ml-2">/kos</span>
                              {variant.discount > 0 && <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                  -{variant.discount}%
                                </span>}
                            </div>
                            {variant.discount > 0 && <div className="text-sm text-gray-500 line-through">
                                {variant.price.toFixed(2)}€/kos
                              </div>}
                            
                            <ul className="space-y-3 mb-6">
                              {variant.features.map((feature, index) => <li key={index} className="flex items-start">
                                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>)}
                            </ul>
                            
                            <div className="text-sm font-semibold mb-2">
                              Končna cena: <span className="text-lg">{variant.total.toFixed(2)}€</span>
                            </div>

                            {variantId === 'basic' && (
                              <div className="shopify-button-container">
                                <div id="product-component-modal-basic" ref={basicPackageButtonRef}></div>
                              </div>
                            )}
                            {variantId === 'double' && (
                              <div className="shopify-button-container">
                                <div id="product-component-modal-double" ref={doublePackageButtonRef}></div>
                              </div>
                            )}
                            {variantId === 'family' && (
                              <div className="shopify-button-container">
                                <div id="product-component-modal-family" ref={familyPackageButtonRef}></div>
                              </div>
                            )}
                          </div>
                        </div>;
                })}
              </div>
            </div>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
