import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return storedCartItems;
  });

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (storedProduct) setSelectedProduct(storedProduct);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    alert(`Product added to cart: ${product.Name}`);
  };

  const removeItem = (productId) => {
    alert('remove product from cart');
    setCartItems((prevItems) => prevItems.filter((item) => item.ProductID !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, selectedProduct, selectProduct, cartItems, addToCart, removeItem }}>
      {children}
    </ProductContext.Provider>
  );
};
