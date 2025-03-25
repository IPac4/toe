import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Check } from 'lucide-react';
import { useAnalytics } from '@/hooks/use-analytics';

const PricingSection: React.FC = () => {
  const isMobile = useIsMobile();
  const doublePackageButtonRef = useRef<HTMLDivElement>(null);
  const familyPackageButtonRef = useRef<HTMLDivElement>(null);
  const basicPackageButtonRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useAnalytics();

  // Define packages in a way that can be reordered for mobile
  const packages = [{
    key: 'basic',
    name: 'Osnovno pakiranje',
    description: 'Popolna rešitev za začetek',
    price: 17.90,
    pricePerItem: 17.90,
    discount: 0,
    totalPrice: 17.90,
    popular: false,
    quantity: 1,
    features: [{
      text: '1x Tarsal TOE paket',
      important: true
    }, {
      text: 'Testirano v Sloveniji',
      important: false
    }, {
      text: 'Priročna embalaža',
      important: false
    }, {
      text: 'Dostava v 48h',
      important: false
    }, {
      text: '30-dnevna garancija zadovoljstva',
      important: true,
      new: true
    }]
  }, {
    key: 'double',
    name: 'Dvojno pakiranje',
    description: 'Popolna vrednost',
    price: 17.90,
    pricePerItem: 14.32,
    discount: 20,
    totalPrice: 28.64,
    popular: true,
    quantity: 2,
    features: [{
      text: '2x Tarsal TOE paket',
      important: true
    }, {
      text: 'Vaje za dnevno vadbo',
      important: true,
      free: true
    }, {
      text: 'Priročna embalaža',
      important: false
    }, {
      text: 'Testirano v Sloveniji',
      important: false
    }, {
      text: 'Dostava v 48h',
      important: false
    }, {
      text: '30-dnevna garancija zadovoljstva',
      important: true,
      new: true
    }]
  }, {
    key: 'family',
    name: 'Družinsko pakiranje',
    description: 'Največ prihranite',
    price: 17.90,
    pricePerItem: 13.42,
    discount: 25,
    totalPrice: 40.26,
    popular: false,
    quantity: 3,
    features: [{
      text: '3x Tarsal TOE paket',
      important: true
    }, {
      text: 'Vaje za dnevno vadbo',
      important: true,
      free: true
    }, {
      text: 'Priročna embalaža',
      important: false
    }, {
      text: 'Testirano v Sloveniji',
      important: false
    }, {
      text: 'Brezplačna dostava',
      important: true,
      free: true,
      new: true
    }, {
      text: '30-dnevna garancija zadovoljstva',
      important: true,
      new: true
    }]
  }];

  // Reorder packages for mobile view - double package first
  const orderedPackages = isMobile ? [packages[1], packages[0], packages[2]] : packages;

  // Function to track button clicks with Facebook Pixel
  const trackPurchaseEvent = (packageKey: string) => {
    const selectedPackage = packages.find(pkg => pkg.key === packageKey);
    if (selectedPackage) {
      trackEvent('InitiateCheckout', {
        content_name: selectedPackage.name,
        content_category: 'Tarsal TOE',
        // Fix: Convert array to string by joining with commas
        content_ids: packageKey,
        content_type: 'product',
        value: selectedPackage.totalPrice,
        currency: 'EUR',
        num_items: selectedPackage.quantity
      });
      
      console.log(`Purchase tracked for ${packageKey} package`);
    }
  };

  // Setup observer for Shopify buy buttons to add click tracking
  useEffect(() => {
    const setupButtonObserver = () => {
      // Create a mutation observer to watch for button creation
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // Look for any newly added buttons inside the containers
            const buttons = document.querySelectorAll('.shopify-buy__btn');
            buttons.forEach(button => {
              // Check if we haven't already added a listener
              if (!button.hasAttribute('data-tracking-added')) {
                button.setAttribute('data-tracking-added', 'true');
                
                // Add click event listener to track purchases
                button.addEventListener('click', (e) => {
                  // Determine which package was clicked
                  let packageKey = 'basic';
                  if (button.closest('#product-component-1742851650294')) {
                    packageKey = 'double';
                  } else if (button.closest('#product-component-1742851845591')) {
                    packageKey = 'family';
                  }
                  
                  trackPurchaseEvent(packageKey);
                });
                
                console.log('Added tracking to buy button for Facebook Pixel');
              }
            });
          }
        });
      });
      
      // Start observing the containers where buttons will appear
      const containers = [
        document.getElementById('product-component-1742853667355'),
        document.getElementById('product-component-1742851650294'),
        document.getElementById('product-component-1742851845591')
      ];
      
      containers.forEach(container => {
        if (container) {
          observer.observe(container, { childList: true, subtree: true });
        }
      });
      
      return observer;
    };
    
    // Wait for the DOM to be fully loaded before setting up observers
    let observer: MutationObserver | null = null;
    const timer = setTimeout(() => {
      observer = setupButtonObserver();
    }, 2000); // Give time for Shopify buttons to initialize
    
    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [trackEvent]);

  // Initialize Shopify Buy buttons after component mounts
  useEffect(() => {
    // Add Shopify SDK script only once
    const shopifyScriptId = 'shopify-buy-button-script';
    if (!document.getElementById(shopifyScriptId)) {
      const script = document.createElement('script');
      script.id = shopifyScriptId;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Initialize basic package button
    if (basicPackageButtonRef.current) {
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
                id: '8579490578771',
                node: document.getElementById('product-component-1742853667355'),
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
        if (basicPackageButtonRef.current) {
          basicPackageButtonRef.current.appendChild(basicPackageScript);
        }
      }, 100);
    }

    // Initialize double package button
    if (doublePackageButtonRef.current) {
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
                node: document.getElementById('product-component-1742851650294'),
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
    if (familyPackageButtonRef.current) {
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
                node: document.getElementById('product-component-1742851845591'),
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

    // Cleanup on unmount
    return () => {
      const shopifyScript = document.getElementById(shopifyScriptId);
      if (shopifyScript) {
        shopifyScript.remove();
      }
    };
  }, []);
  return <section id="pricing" className="py-16 bg-white md:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {orderedPackages.map(pkg => <div key={pkg.key} className={cn("price-card", pkg.popular ? "popular transform scale-105" : "")}>
              {pkg.popular && <div className="text-white py-2 text-center font-semibold bg-amber-600">
                  Najbolj priljubljeno
                </div>}
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{pkg.pricePerItem.toFixed(2)}€</span>
                  <span className="text-gray-500 ml-2">/kos</span>
                  {pkg.discount > 0 && <span className="ml-3 bg-green-100 text-xs font-semibold px-2 py-1 rounded text-red-400">
                      -{pkg.discount}%
                    </span>}
                </div>
                {pkg.discount > 0 && <div className="text-sm text-gray-500 line-through">
                    {pkg.price.toFixed(2)}€/kos
                  </div>}
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => <li key={index} className={cn("flex items-start", feature.important ? "font-medium" : "")}>
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <div className="flex items-center">
                        <span>{feature.text}</span>
                        {feature.free && <Badge className="ml-2 text-white font-bold bg-red-400">
                            GRATIS
                          </Badge>}
                        {feature.new && <Badge className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold">
                            NOVO
                          </Badge>}
                      </div>
                    </li>)}
                </ul>
                
                <div className="text-sm font-semibold mb-2">
                  Končna cena: <span className="text-lg">{pkg.totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <div className="p-8">
                <p className="font-semibold mb-3">Končna cena: <span className="text-xl font-bold">{pkg.totalPrice.toFixed(2)}€</span></p>
                
                {pkg.key === 'basic' && <div className="shopify-button-container">
                    <div id="product-component-1742853667355" ref={basicPackageButtonRef}></div>
                  </div>}

                {pkg.key === 'double' && <div className="shopify-button-container">
                    <div id="product-component-1742851650294" ref={doublePackageButtonRef}></div>
                  </div>}

                {pkg.key === 'family' && <div className="shopify-button-container">
                    <div id="product-component-1742851845591" ref={familyPackageButtonRef}></div>
                  </div>}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PricingSection;
