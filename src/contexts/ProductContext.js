import React, { createContext, useContext, useState } from 'react';
import productsData from '../data/products.json';// this shall be replaced by actual backend API

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
