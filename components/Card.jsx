import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import ProductDetails from './ProductDetails'; // Import the ProductDetails component

function Card() {
  const [products, setProducts] = useState([]);
  const [heartedProducts, setHeartedProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const [searchQuery, setSearchQuery] = useState(''); // search state

  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const handleHeartClick = (productId) => {
    setHeartedProducts((prevHeartedProducts) => ({
      ...prevHeartedProducts,
      [productId]: !prevHeartedProducts[productId],
    }));
  };

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderStars = (productRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-2xl ${i <= productRating ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          {i <= productRating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Log the filtered products to debug
  console.log('Filtered Products:', filteredProducts);

  return (
    <>
      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          handleRemove={() => setSelectedProduct(null)} // Mock handleRemove
          handleQuantity={() => {}} // Mock handleQuantity
          price={selectedProduct.price}
          quantity={1} // Mock quantity
        />
      ) : (
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-8 font-sans md:font-serif">Buy Your dream product</h1>
          <div className="relative w-[50%] mb-12">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-green-200 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-12 py-3 shadow-md focus:shadow-md focus:shadow-green-200 w-full"
          autoComplete="off"
        />
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 fill-gray-500 transition"
        >
          <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
        </svg>
      </div>
          {loading ? (
            <div className="w-full gap-x-2 absolute  h-full flex justify-center items-center min-h-screen">
              <h1 className='text-2xl'>Loading</h1>
              <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
              <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
              <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
            </div>
          ) : error ? (
            <div className="w-full gap-x-2 absolute  h-full flex justify-center items-center min-h-screen">
              <h1 className='text-2xl text-red-500'>Error: {error}</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div className="dress-card flex flex-col justify-center items-center" key={product.id} onClick={() => handleClick(product)}>
                  <div className="relative">
                    <img
                      className="w-full h-80 rounded-t-lg"
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="absolute top-4 left-4 text-xl cursor-pointer  w-8" onClick={(e) => {e.stopPropagation(); handleHeartClick(product.id);}}>
                      <i
                        className={`bi ${heartedProducts[product.id] ? 'bi-heart-fill text-red-500' : 'bi-heart text-gray-500'}`}
                        style={{ fontSize: "30px" }} // Adjust the size here as needed
                      ></i>
                    </div>
                  </div>
                  <div className="p-4 rounded-b-lg bg-pink-100 w-full">
                    <h4 className="text-xl font-bold mb-2">{product.title}</h4>
                    <p className="mb-2">{product.category}</p>
                    <p className="mb-2">
                      <span className="text-xl font-bold">Rs.{product.price}</span>
                    </p>
                    <div className="mb-2">
                      {renderStars(product.rating.rate)}
                    </div>
                    <div className="flex justify-center">
                      <a href="#" className="block text-center bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Add to Bag</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Card;
