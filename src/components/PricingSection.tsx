
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Check } from 'lucide-react';

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

const PricingSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Define packages in a way that can be reordered for mobile
  const packages = [
    {
      key: 'basic',
      name: 'Osnovno pakiranje',
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
        { text: 'Dostava v 48h', important: false }
      ]
    },
    {
      key: 'double',
      name: 'Dvojno pakiranje',
      description: 'Popolna vrednost',
      price: 17.90,
      pricePerItem: 14.32,
      discount: 20,
      totalPrice: 28.64,
      popular: true,
      quantity: 2,
      features: [
        { text: '2x Tarsal TOE paket', important: true },
        { text: 'Vaje za dnevno vadbo', important: true, free: true },
        { text: 'Priročna embalaža', important: false },
        { text: 'Testirano v Sloveniji', important: false },
        { text: 'Dostava v 48h', important: false }
      ]
    },
    {
      key: 'family',
      name: 'Družinsko pakiranje',
      description: 'Največ prihranite',
      price: 17.90,
      pricePerItem: 13.42,
      discount: 25,
      totalPrice: 40.26,
      popular: false,
      quantity: 3,
      features: [
        { text: '3x Tarsal TOE paket', important: true },
        { text: 'Vaje za dnevno vadbo', important: true, free: true },
        { text: 'Priročna embalaža', important: false },
        { text: 'Testirano v Sloveniji', important: false },
        { text: 'Dostava v 48h', important: true, free: true }
      ]
    }
  ];
  
  // Reorder packages for mobile view - double package first
  const orderedPackages = isMobile 
    ? [packages[1], packages[0], packages[2]] 
    : packages;

  // Initialize Shopify Buy Button
  useEffect(() => {
    // Create a new script element for the Shopify Buy Button SDK
    const loadShopifyScript = () => {
      const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          initShopifyBuyButton();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }

      function loadScript() {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = initShopifyBuyButton;
      }
    };

    // Initialize the Shopify Buy Button
    const initShopifyBuyButton = () => {
      if (!window.ShopifyBuy) return;
      
      const client = window.ShopifyBuy.buildClient({
        domain: 'c4504b.myshopify.com',
        storefrontAccessToken: 'e1d80871c8dfa43917436258128ba4ab',
      });

      if (client && window.ShopifyBuy.UI) {
        // Initialize for basic package
        const basicComponent = document.getElementById('product-component-1742847771376');
        if (basicComponent) {
          window.ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '8579490578771',
              node: basicComponent,
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
                        "background-color": "#d23e19"
                      },
                      "background-color": "#e9451c",
                      ":focus": {
                        "background-color": "#d23e19"
                      },
                      "border-radius": "13px"
                    }
                  },
                  "buttonDestination": "checkout",
                  "contents": {
                    "img": false,
                    "button": false,
                    "buttonWithQuantity": true,
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
                        "background-color": "#d23e19"
                      },
                      "background-color": "#e9451c",
                      ":focus": {
                        "background-color": "#d23e19"
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
                        "background-color": "#d23e19"
                      },
                      "background-color": "#e9451c",
                      ":focus": {
                        "background-color": "#d23e19"
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
                      "background-color": "#e9451c",
                      ":hover": {
                        "background-color": "#d23e19"
                      },
                      ":focus": {
                        "background-color": "#d23e19"
                      }
                    }
                  }
                }
              },
            });
          });
        }

        // Initialize for double package with quantity=2 preset
        const doubleComponent = document.getElementById('product-component-1742847969801');
        if (doubleComponent) {
          window.ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '8579490578771',
              node: doubleComponent,
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
                        "background-color": "#d23e19"
                      },
                      "background-color": "#e9451c",
                      ":focus": {
                        "background-color": "#d23e19"
                      },
                      "border-radius": "13px"
                    }
                  },
                  "buttonDestination": "checkout",
                  "contents": {
                    "img": false,
                    "button": false,
                    "buttonWithQuantity": true,
                    "title": false,
                    "price": false
                  },
                  "text": {
                    "button": "Naroči zdaj",
                    "outOfStock": "Razprodano",
                    "unavailable": "Nedosegljivo"
                  },
                  "quantity": {
                    "initial": 2,
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
                        "background-color": "#d23e19"
                      },
                      "background-color": "#e9451c",
                      ":focus": {
                        "background-color": "#d23e19"
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
                        "background-color": "#d23e19"
                      },
                      "background-color": "#e9451c",
                      ":focus": {
                        "background-color": "#d23e19"
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
                      "background-color": "#e9451c",
                      ":hover": {
                        "background-color": "#d23e19"
                      },
                      ":focus": {
                        "background-color": "#d23e19"
                      }
                    }
                  }
                }
              },
            });
          });
        }
        
        // Initialize for family package with quantity=3 preset
        const familyComponent = document.getElementById('product-component-1742848339752');
        if (familyComponent) {
          window.ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '8579490578771',
              node: familyComponent,
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
                    "button": false,
                    "buttonWithQuantity": true,
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
            
            // Set quantity to 3 after component loads
            setTimeout(function () {
              const quantityInputs = document.querySelectorAll('input[name="quantity"]');
              quantityInputs.forEach(function(input) {
                input.value = 3;
                input.dispatchEvent(new Event('change', { bubbles: true })); // required for update
              });
            }, 1000); // wait for component to load
          });
        }
      }
    };

    loadShopifyScript();

    // Clean up the script on component unmount
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Removed the "Paketi & Cene" heading, keeping only the subtitle */}
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Izberite paket, ki najbolj ustreza vašim potrebam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {orderedPackages.map((pkg) => (
            <div 
              key={pkg.key} 
              className={cn(
                "price-card",
                pkg.popular ? "popular transform scale-105" : ""
              )}
            >
              {pkg.popular && (
                <div className="bg-tarsal-accent text-white py-2 text-center font-semibold">
                  Najbolj priljubljeno
                </div>
              )}
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{pkg.pricePerItem.toFixed(2)}€</span>
                  <span className="text-gray-500 ml-2">/kos</span>
                  {pkg.discount > 0 && (
                    <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      -{pkg.discount}%
                    </span>
                  )}
                </div>
                {pkg.discount > 0 && (
                  <div className="text-sm text-gray-500 line-through">
                    {pkg.price.toFixed(2)}€/kos
                  </div>
                )}
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className={cn(
                      "flex items-start",
                      feature.important ? "font-medium" : ""
                    )}>
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <div className="flex items-center">
                        <span>{feature.text}</span>
                        {feature.free && (
                          <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold">
                            GRATIS
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="text-sm font-semibold mb-2">
                  Končna cena: <span className="text-lg">{pkg.totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <div className="p-8">
                <p className="font-semibold mb-3">Končna cena: <span className="text-xl font-bold">{pkg.totalPrice.toFixed(2)}€</span></p>
                
                {pkg.key === 'basic' ? (
                  <div id="product-component-1742847771376" className="mt-4"></div>
                ) : pkg.key === 'double' ? (
                  <div id="product-component-1742847969801" className="mt-4"></div>
                ) : (
                  <div id="product-component-1742848339752" className="mt-4"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
