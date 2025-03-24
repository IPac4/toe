
/**
 * Shopify integration utilities
 * This file contains functions for integrating with Shopify's checkout
 */

interface ShopifyCartItem {
  variantId: string; // Shopify variant ID
  quantity: number;
  customAttributes?: Array<{key: string, value: string}>;
}

interface ShopifyCheckoutConfig {
  domain: string; // Your Shopify store domain e.g. 'your-store.myshopify.com'
  storefrontAccessToken: string; // Your Storefront API access token
}

// You need to replace these values with your actual Shopify store information
const shopifyConfig: ShopifyCheckoutConfig = {
  domain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token'
};

// Mapping of your product variants to Shopify variant IDs
// You need to replace these with your actual Shopify variant IDs
const productVariantMap = {
  'basic': {
    'belo': 'shopify-variant-id-basic-white',
    'črno': 'shopify-variant-id-basic-black'
  },
  'double': {
    'belo': 'shopify-variant-id-double-white',
    'črno': 'shopify-variant-id-double-black'
  },
  'family': {
    'belo': 'shopify-variant-id-family-white',
    'črno': 'shopify-variant-id-family-black'
  }
};

/**
 * Creates a Shopify checkout URL for the specified products
 * @param packageType The selected package type (basic, double, family)
 * @param colorSelections Array of color selections for each item
 * @returns The Shopify checkout URL
 */
export const createShopifyCheckoutUrl = (
  packageType: 'basic' | 'double' | 'family', 
  colorSelections: Array<{index: number, color: 'belo' | 'črno'}>
): string => {
  const items: ShopifyCartItem[] = [];

  // Group items by color to combine quantities
  const colorCounts: Record<string, number> = {};
  
  colorSelections.forEach(selection => {
    const color = selection.color;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  });
  
  // Add each color variant to the cart
  Object.entries(colorCounts).forEach(([color, count]) => {
    const variantId = productVariantMap[packageType][color as 'belo' | 'črno'];
    
    if (variantId) {
      items.push({
        variantId,
        quantity: count
      });
    }
  });
  
  // Create the checkout URL with line items
  const lineItems = items.map(item => {
    return `${item.variantId}:${item.quantity}`;
  }).join(',');
  
  // Construct the final checkout URL
  return `https://${shopifyConfig.domain}/cart/${lineItems}?checkout[email]=&access_token=${shopifyConfig.storefrontAccessToken}`;
};

/**
 * Redirects the user to Shopify checkout
 */
export const redirectToShopifyCheckout = (
  packageType: 'basic' | 'double' | 'family',
  colorSelections: Array<{index: number, color: 'belo' | 'črno'}>
): void => {
  const checkoutUrl = createShopifyCheckoutUrl(packageType, colorSelections);
  window.location.href = checkoutUrl;
};
