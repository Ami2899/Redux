import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchAsync} from './productSlice';
import { addAsync } from '../cart/cartSlice';
import './Product.css'
import { RootState } from '../../app/store';
import { Item } from '../cart/cartSlice';

interface Product extends Item {
  brand: string;
  change: string;
  quantity: number;
}

export function Products() {
  const dispatch = useDispatch();
  const products=useSelector((state:RootState)=>state.products.products)
  
  useEffect(()=>{
    dispatch(fetchAsync() as any)
  },[])
  
  const handleAddToCart = (product: Product) => {
    dispatch(addAsync(product) as any);
  };
  return (
    <div>
      <div>
        {products.map((product) => (
          <div className="card">
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} />
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button onClick={()=>handleAddToCart(product)}>Add to Cart</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
