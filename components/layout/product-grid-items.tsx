import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import { Product } from '@commercetools/platform-sdk';
// import { Product } from 'lib/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  // Normalizes product data to support both layouts (on Search, different layout)
  const normalizeProductData = (product: any) => {
    // Check if product follows the new structure with masterData.current
    if (product.masterData && product.masterData.current) {
      return product.masterData.current;
    }
    // Fallback to masterVariant if masterData.current is not available
    return product;
  };

  //${product.key} good for categories

  return (
    <>
      {products.map((product) => {
        const normalizedProduct = normalizeProductData(product);
        return (
          <Grid.Item key={product.id} className="animate-fadeIn">
            <Link className="relative inline-block h-full w-full" href={`/product/${product.key}`}>
              <GridTileImage
                alt={normalizedProduct.name.toString()}
                label={{
                  title: normalizedProduct.name.toString(),
                  amount: ((normalizedProduct.masterVariant.prices?.[0]?.value.centAmount ?? 0) / 100).toString(),
                  currencyCode: normalizedProduct.masterVariant.prices?.[0]?.value.currencyCode ?? 'USD',
                }}
                src={normalizedProduct.masterVariant.images?.[0]?.url ?? ''}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}



{/* <Card key={product.id} sx={{ width: 345, height: 545 }}>
<CardMedia
  component="img"
  height="140"
  image={
    product.masterData.current.masterVariant.images &&
    product.masterData.current.masterVariant.images[0].url
  }
  alt={product.masterData.current.name["en-US"]}
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    {product.masterData.current.name["en-US"]}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {product.masterData.current.description &&
      product.masterData.current.description["en-US"]}
  </Typography>
  <Typography variant="h6" color="text.primary">
    EUR{" "}
    {product.masterData.current.masterVariant.prices &&
      product.masterData.current.masterVariant.prices[0].value
        .centAmount / 100}
  </Typography>
</CardContent>
</Card> */}