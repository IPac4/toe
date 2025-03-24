import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productVariant: 'basic' | 'double' | 'family';
  skipPackageSelection: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onOpenChange, productVariant, skipPackageSelection }) => {
  const [agreed, setAgreed] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(productVariant);
  const shopifyButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skipPackageSelection) {
      setSelectedPackage(productVariant);
    }
  }, [productVariant, skipPackageSelection]);

  useEffect(() => {
    // Only initialize when modal is open
    if (open && shopifyButtonRef.current) {
      const shopifyScript = document.createElement('script');
      shopifyScript.type = 'text/javascript';
      shopifyScript.innerHTML = `
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
                node: document.getElementById('product-component-1742853129195'),
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
                }
              });
            });
          }
        })();
        /*]]>*/
      `;
      shopifyButtonRef.current.appendChild(shopifyScript);

      return () => {
        if (shopifyButtonRef.current) {
          const script = shopifyButtonRef.current.querySelector('script');
          if (script) {
            script.remove();
          }
        }
      };
    }
  }, [open]); // Only re-run when open state changes

  const handlePackageChange = (value: 'basic' | 'double' | 'family') => {
    setSelectedPackage(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nakup Tarsal Toe</DialogTitle>
          <DialogDescription>
            Izpolnite spodnji obrazec za nakup.
          </DialogDescription>
        </DialogHeader>
        {!skipPackageSelection && (
          <div className="grid gap-4 py-4">
            <Label htmlFor="package">Izberite paket</Label>
            <Select value={selectedPackage} onValueChange={handlePackageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Paket" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="basic">Osnovni</SelectItem>
                <SelectItem value="double">Dvojni</SelectItem>
                <SelectItem value="family">Družinski</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Ime
            </Label>
            <Input type="text" id="name" defaultValue="Janez Novak" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input type="email" id="email" placeholder="j.novak@gmail.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Tel. številka
            </Label>
            <Input type="number" id="number" placeholder="+38640123456" className="col-span-3" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed data-[state=checked]:text-green-600"
            >
              Se strinjam s pogoji poslovanja
            </label>
          </div>
        </div>
        <DialogFooter className="px-4 pb-4">
          <div className="w-full">
            <div id="product-component-1742853129195" ref={shopifyButtonRef} className="mt-4"></div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
