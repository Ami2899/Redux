import React, { useState } from 'react';
import './App.css';
import { Products } from './features/products/Products';
import {Cart} from './features/cart/Cart'
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

function App() {
  const [showcart,setShowCart]=useState(false)
  const items=useSelector((state:RootState)=>state.cart.items)
 
  return (
    <div className="App">
      <button onClick={()=>setShowCart(!showcart)}>Cart[{items.length}]</button>
      {showcart?<Cart/>:<Products/>}
    </div>
  );
}

export default App;
