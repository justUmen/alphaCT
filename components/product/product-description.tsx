import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
// import { Product } from 'lib/types';
import { Product } from "@commercetools/platform-sdk";
// import { VariantSelector } from './variant-selector';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    // Stock display logic
    let stockInfo = "Out of stock"; // Default message
    if (product.masterData.current.masterVariant.availability?.isOnStock) {
      const availableQuantity = product.masterData.current.masterVariant.availability.availableQuantity;
      stockInfo = `In stock: ${availableQuantity ?? '...'}`; // Display available quantity or '...' if not available
    }
  
    return (
      <>
        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
          <h1 className="mb-2 text-5xl font-medium">{product.masterData.current.name["en-US"]}</h1>
          <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
            <Price
              amount={((product.masterData.current.masterVariant.prices?.[0]?.value.centAmount ?? 0) / 100).toString()}
              currencyCode={product.masterData.current.masterVariant.prices?.[0]?.value.currencyCode ?? 'USD'}
            />
          </div>
        </div>
  
        {product.masterData.current.name["en-US"] && (
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.masterData.current.description?.["en-US"] || 'No description available'}
          />
        )}
  
        {/* Stock Information Display */}
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={stockInfo}
        />
  
        {product.masterData.current.masterVariant.availability?.isOnStock && <AddToCart availableForSale={true} />}
      </>
    );
  };

//   return (
//     <>
//       <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
//         <h1 className="mb-2 text-5xl font-medium">{product.masterData.current.name["en-US"]}</h1>
//         <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
//           {/* <Price
//             amount={product.priceRange.minVariantPrice.amount}
//             currencyCode={product.priceRange.minVariantPrice.currencyCode}
//           /> */}
//           <Price
//             amount={((product.masterData.current.masterVariant.prices?.[0]?.value.centAmount ?? 0) / 100).toString()}
//             currencyCode={product.masterData.current.masterVariant.prices?.[0]?.value.currencyCode ?? 'USD'}
//           />
//         </div>
//       </div>
//       {/* <VariantSelector options={product.options} variants={product.variants} /> */}

//       {product.masterData.current.description ? (
//         <Prose
//           className="mb-6 text-sm leading-tight dark:text-white/[60%]"
//           html={product.masterData.current.description["en-US"]}
//         />
//       ) : null}

//       {product.masterData.current.masterVariant.availability?.isOnStock ? (
//         <Prose
//           className="mb-6 text-sm leading-tight dark:text-white/[60%]"
//           html={product.masterData.current.masterVariant.availability?.availableQuantity?.toString() || '...'}
//         />
//       ) : "Out of stock"}

//       {/* <AddToCart variants={product.masterData.current.variants} availableForSale={product.availableForSale} /> */}
//       <AddToCart availableForSale={product.masterData.current.masterVariant.availability?.isOnStock || false} />
//     </>
//   );
// }
