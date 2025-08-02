import React from 'react';
import ProductCard from './ProductCard';
import { productData } from '../lib/api';
import { Product } from '../type/productType'

const Products = async () => {

    const products = await productData()

  return (
    <div className="p-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-40">
      {(products as Product[]).map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          description={product.description}
          rating={product.rating}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default Products;
