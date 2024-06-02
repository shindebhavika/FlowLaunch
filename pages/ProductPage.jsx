// pages/product/[id].js
import React from 'react';
import { useRouter } from 'next/router';
import ProductDetails from '../../components/ProductDetails';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch product data here based on `id`
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductDetails
      product={product}
      handleRemove={() => router.push('/')} // Redirect back to home on remove
      handleQuantity={() => {}} // Mock handleQuantity
      price={product.price}
      quantity={1} // Mock quantity
    />
  );
};

export default ProductPage;
