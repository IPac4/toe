import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from '@/hooks/use-mobile';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productVariant: 'basic' | 'double' | 'family';
  skipPackageSelection: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onOpenChange, productVariant, skipPackageSelection }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Slovenija');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(!skipPackageSelection);
  const isMobile = useIsMobile();

  useEffect(() => {
    setShowPackageSelection(!skipPackageSelection);
  }, [skipPackageSelection]);

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
  };

  const handlePackageSelect = (variant: 'basic' | 'double' | 'family') => {
    // Update the product variant
    // setSelectedVariant(variant);
    // Hide the package selection
    setShowPackageSelection(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Naročilo</AlertDialogTitle>
          <AlertDialogDescription>
            {showPackageSelection ? (
              <>
                <p className="mb-4">Izberite želeno količino paketov:</p>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" onClick={() => handlePackageSelect('basic')}>
                    Osnovni paket
                  </Button>
                  <Button variant="default" onClick={() => handlePackageSelect('double')}>
                    Dvojni paket (Najboljša izbira)
                  </Button>
                  <Button variant="outline" onClick={() => handlePackageSelect('family')}>
                    Družinski paket
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Ime in priimek
                    </Label>
                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Naslov
                    </Label>
                    <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      Mesto
                    </Label>
                    <Input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="postalCode" className="text-right">
                      Poštna številka
                    </Label>
                    <Input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Država
                    </Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Slovenija" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Slovenija">Slovenija</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={handleTermsChange} />
                    <Label htmlFor="terms">Strinjam se s pogoji poslovanja</Label>
                  </div>
                </div>

                  {/* Replace the existing button with the Shopify buy button */}
                  <div className="mt-4">
                    <div id='product-component-1742853437934'></div>
                    <script type="text/javascript" dangerouslySetInnerHTML={{
                      __html: `
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
                                node: document.getElementById('product-component-1742853437934'),
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
                      `
                    }}></script>
                  </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={!termsAccepted}>Prekliči</AlertDialogCancel>
          <AlertDialogAction disabled={!termsAccepted}>Naroči</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckoutModal;
