import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import './Cart.css'
import { deleteAsync , updateAsync} from './cartSlice';

export function Cart() {
  const items=useSelector((state:RootState)=>state.cart.items)
  const dispatch = useDispatch();
  
  const handleChange=(e: React.ChangeEvent<HTMLSelectElement>, id: number)=>{
    console.log(e.target.value)
    dispatch(updateAsync({id,change:{quantity:+e.target.value}})as any)
  }

  return (
    <div>
      <div>  
      {items.map((item) => <div className="cart-item">
        <img
          className="img-fluid"
          src={item.thumbnail}
          alt=""
        />
        <div className="description">
          <p>{item.title}</p>
          <span>{item.brand}</span>
          <strong>${item.price}</strong>
        </div>
        <div className="quantity">
          Quantity
          <select value={item.quantity} onChange={(e)=>handleChange(e,Number(item.id))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className='close'>
          <button onClick={() => dispatch(deleteAsync(item.id) as any)}>X</button>
        </div>
      </div>
        )} 
      </div>
      <h1>
        Total:{items.reduce((acc,item)=>item.price*item.quantity+acc,0)}
      </h1>
    </div>
  );
}
