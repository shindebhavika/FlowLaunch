import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri'; // Import the icon from react-icons

function ProductDetails({ product, handleRemove, handleQuantity, price, quantity }) {
  return (
    <div className="container mx-auto mt-10 p-10 h-full w-full bg-pink-100">
<button className="cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Go Back" onClick={handleRemove}>
  <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-pink-800">
    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
  </svg>
</button>
      <h2 className="text-3xl font-bold text-center mb-8 ">{product.title}</h2>
      <div className="card shadow-lg rounded-lg overflow-hidden bg-white flex flex-col md:flex-row p-10 shadow-lg shadow-red-700/40">
        <div className="w-[200px] md:w-1/3  sm:w-1/2 md:p-30  lg:p-30  h-[10%]  shadow-lg shadow-indigo-500/40 p-6 ">
          <img
            src={product.image}
            className="w-full h-[30%]  object-cover md:rounded-l-lg"
            alt="Product"
          />
        </div>
        <div className="p-6 w-full md:w-1/2 tracking-wider">
          <h5 className="text-2xl font-semibold mb-4">{product.title}</h5>
          <p className="text-lg"><strong>Price:</strong> ₹{product.price}</p>
          <p className="text-lg"><strong>Rating:</strong> <span className="text-yellow-500">{product.rating.rate} ★</span></p>
          <p>Purchased <strong>{product.rating.count}</strong>  people </p>
          <p className="text-lg"><strong>Category:</strong> {product.category}</p>
          <p className="text-lg"><strong>Description:</strong> {product.description}</p>
          <p className="text-lg"><strong>Total:</strong> ₹{price}</p>
          <div className="flex items-center my-4">
            <strong className="text-lg mr-2">Remove:</strong>
            <RiDeleteBin5Fill
              className="text-red-600 cursor-pointer hover:text-red-800"
              onClick={() => handleRemove(product)}
            />
          </div>
          <div className="flex justify-between items-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Order Now
            </button>
            <div className="quantity-container flex items-center space-x-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                onClick={() => handleQuantity(product, 'decrease')}
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                onClick={() => handleQuantity(product, 'increase')}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
