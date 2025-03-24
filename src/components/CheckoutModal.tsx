
import React, { useState, useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Check, ShieldCheck, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from '@/hooks/use-mobile';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productVariant: 'basic' | 'double' | 'family';
  skipPackageSelection: boolean;
}

interface PackageOption {
  key: 'basic' | 'double' | 'family';
  name: string;
  description: string;
  price: number;
  pricePerItem: number;
  discount: number;
  totalPrice: number;
  popular: boolean;
  quantity: number;
  features: {
    text: string;
    important?: boolean;
    free?: boolean;
    new?: boolean;
  }[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  open, 
  onOpenChange, 
  productVariant, 
  skipPackageSelection 
}) => {
  const [showPackageSelection, setShowPackageSelection] = useState(!skipPackageSelection);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'double' | 'family'>(productVariant);
  const isMobile = useIsMobile();
  
  // Refs for Shopify buy buttons
  const basicProductButtonRef = useRef<HTMLDivElement>(null);
  const doubleProductButtonRef = useRef<HTMLDivElement>(null);
  const familyProductButtonRef = useRef<HTMLDivElement>(null);

  // Packages data, similar to that in PricingSection
  const packages: PackageOption[] = [
    {
      key: 'basic',
      name: 'Osnovni paket',
      description: 'Popolna rešitev za začetek',
      price: 17.90,
      pricePerItem: 17.90,
      discount: 0,
      totalPrice: 17.90,
      popular: false,
      quantity: 1,
      features: [
        { text: '1x Tarsal TOE paket', important: true },
        { text: 'Testirano v Sloveniji', important: false },
        { text: 'Priročna embalaža', important: false },
        { text: 'Dostava v 48h', important: false },
        { text: '30-dnevna garancija zadovoljstva', important: true, new: true }
      ]
    },
    {
      key: 'double',
      name: 'Dvojni paket',
      description: 'Popolna vrednost',
      price: 17.90,
      pricePerItem: 14.32,
      discount: 20,
      totalPrice: 28.64,
      popular: true,
      quantity: 2,
      features: [
        { text: '2x Tarsal TOE paket', important: true },
        { text: 'GRATIS vaje za dnevno vadbo', important: true, free: true },
        { text: 'Priročna embalaža', important: false },
        { text: 'Testirano v Sloveniji', important: false },
        { text: 'Dostava v 48h', important: false },
        { text: '30-dnevna garancija zadovoljstva', important: true, new: true }
      ]
    },
    {
      key: 'family',
      name: 'Družinski paket',
      description: 'Največ prihranite',
      price: 17.90,
      pricePerItem: 13.42,
      discount: 25,
      totalPrice: 40.26,
      popular: false,
      quantity: 3,
      features: [
        { text: '3x Tarsal TOE paket', important: true },
        { text: 'GRATIS vaje za dnevno vadbo', important: true, free: true },
        { text: 'Priročna embalaža', important: false },
        { text: 'Testirano v Sloveniji', important: false },
        { text: 'GRATIS dostava v 48h', important: true, free: true, new: true },
        { text: '30-dnevna garancija zadovoljstva', important: true, new: true }
      ]
    }
  ];

  // Effect to set initial selected package based on prop
  useEffect(() => {
    setShowPackageSelection(!skipPackageSelection);
    setSelectedPackage(productVariant);
  }, [skipPackageSelection, productVariant]);

  const handlePackageSelect = (variant: 'basic' | 'double' | 'family') => {
    setSelectedPackage(variant);
    setShowPackageSelection(false);
  };

  // Initialize Shopify Buy buttons
  useEffect(() => {
    if (!open) return;
    
    // Add Shopify SDK script if not already added
    const shopifyScriptId = 'shopify-buy-button-script-modal';
    if (!document.getElementById(shopifyScriptId) && open) {
      const script = document.createElement('script');
      script.id = shopifyScriptId;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Function to initialize the appropriate buttons
    const initializeButtons = () => {
      // Clear previous buttons if there are any
      if (basicProductButtonRef.current) basicProductButtonRef.current.innerHTML = '';
      if (doubleProductButtonRef.current) doubleProductButtonRef.current.innerHTML = '';
      if (familyProductButtonRef.current) familyProductButtonRef.current.innerHTML = '';
      
      // Initialize button for basic package
      if (basicProductButtonRef.current) {
        const basicScript = document.createElement('script');
        basicScript.type = 'text/javascript';
        basicScript.innerHTML = `
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
                  id: '8579490578771',
                  node: document.getElementById('modal-product-component-basic'),
                  moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                  options: {
                    "product": {
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
                          "border-radius": "13px",
                          "width": "100%"
                        }
                      },
                      "buttonDestination": "checkout",
                      "contents": {
                        "img": false,
                        "title": false,
                        "price": false
                      },
                      "text": {
                        "button": "Kupi zdaj"
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
        basicProductButtonRef.current.appendChild(basicScript);
      }
      
      // Initialize button for double package
      if (doubleProductButtonRef.current) {
        const doubleScript = document.createElement('script');
        doubleScript.type = 'text/javascript';
        doubleScript.innerHTML = `
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
                  node: document.getElementById('modal-product-component-double'),
                  moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                  options: {
                    "product": {
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
                          "border-radius": "13px",
                          "width": "100%"
                        }
                      },
                      "buttonDestination": "checkout",
                      "contents": {
                        "img": false,
                        "title": false,
                        "price": false
                      },
                      "text": {
                        "button": "Kupi zdaj"
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
        doubleProductButtonRef.current.appendChild(doubleScript);
      }
      
      // Initialize button for family package
      if (familyPackageButtonRef.current) {
        const familyScript = document.createElement('script');
        familyScript.type = 'text/javascript';
        familyScript.innerHTML = `
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
                  node: document.getElementById('modal-product-component-family'),
                  moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
                  options: {
                    "product": {
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
                          "border-radius": "13px",
                          "width": "100%"
                        }
                      },
                      "buttonDestination": "checkout",
                      "contents": {
                        "img": false,
                        "title": false,
                        "price": false
                      },
                      "text": {
                        "button": "Kupi zdaj"
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
        familyPackageButtonRef.current.appendChild(familyScript);
      }
    };
    
    // Initialize after a delay to ensure the DOM is ready
    const timer = setTimeout(initializeButtons, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [open, showPackageSelection]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-4xl p-0 overflow-auto max-h-[90vh]">
        <AlertDialogHeader className="p-6 pb-0">
          <AlertDialogTitle className="text-2xl">Izberite paket</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Izberite paket, ki ustreza vašim potrebam.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="px-6 py-4">
          {/* Guarantees and social proof sections */}
          <div className="bg-green-50 rounded-lg p-4 mb-4 flex items-start gap-3">
            <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">30-dnevna garancija zadovoljstva</h3>
              <p className="text-sm text-gray-600">Če z izdelkom niste zadovoljni, vam v 30 dneh vrnemo denar. Brez vprašanj!</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Priljubljeno med kupci</h3>
              <p className="text-sm text-gray-600">V zadnjih 24 urah je izdelek kupilo <strong>28 oseb</strong>.</p>
            </div>
          </div>
          
          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div 
                key={pkg.key} 
                className={cn(
                  "border rounded-md overflow-hidden shadow-sm",
                  pkg.popular ? "relative border-green-300" : "",
                  selectedPackage === pkg.key && !showPackageSelection ? "border-blue-500 ring-2 ring-blue-200" : ""
                )}
              >
                {pkg.popular && (
                  <div className="bg-blue-500 text-white py-2 text-center font-medium">
                    Najbolj priljubljeno
                  </div>
                )}
                
                <div className="p-5 border-b">
                  <h3 className="text-xl font-semibold mb-1">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                  
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold">{pkg.pricePerItem.toFixed(2)}€</span>
                    <span className="text-gray-500 ml-1 text-sm">/kos</span>
                  </div>
                  
                  {pkg.discount > 0 && (
                    <div className="text-sm text-gray-500 line-through mb-3">
                      {pkg.price.toFixed(2)}€/kos
                    </div>
                  )}
                  
                  <ul className="space-y-2 mt-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className={feature.important ? "font-medium" : ""}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-5">
                  <div className="font-medium mb-2">
                    Končna cena: <span className="text-lg font-bold">{pkg.totalPrice.toFixed(2)}€</span>
                  </div>
                  
                  {showPackageSelection ? (
                    <Button 
                      onClick={() => handlePackageSelect(pkg.key)}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Izberi
                    </Button>
                  ) : (
                    selectedPackage === pkg.key && (
                      <div className="shopify-button-container">
                        {pkg.key === 'basic' && (
                          <div id="modal-product-component-basic" ref={basicProductButtonRef}></div>
                        )}
                        {pkg.key === 'double' && (
                          <div id="modal-product-component-double" ref={doubleProductButtonRef}></div>
                        )}
                        {pkg.key === 'family' && (
                          <div id="modal-product-component-family" ref={familyPackageButtonRef}></div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <AlertDialogFooter className="p-6 pt-0">
          <AlertDialogCancel>Zapri</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckoutModal;
