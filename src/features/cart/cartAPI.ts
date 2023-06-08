// A mock function to mimic making an async request for data
import axios from 'axios'
import { Item } from './cartSlice'
export function fetchItems() {
  return axios.get('http://localhost:8080/cart')
}

export function addItem(item:Item) {
  return axios.post('http://localhost:8080/cart',item)
}

export function updateItem(id:number,itemUpdate: { quantity: number }) {
  return axios.patch(`http://localhost:8080/cart/${id}`,itemUpdate)
}

export function deleteItem(id:string) {
  return axios.delete(`http://localhost:8080/cart/${id}`)
}

