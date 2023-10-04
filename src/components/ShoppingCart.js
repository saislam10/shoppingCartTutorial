import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3001/cart', { headers: { 'Authorization': `Bearer ${token}` } });
    setCart(response.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  function generateItemId() {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  }

  const addItemToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const generatedItemId = generateItemId(); // Generate the item_id here
      const response = await axios.post('http://localhost:3001/cart',
        {
          item_id: generatedItemId,
          quantity: quantity,
          name: name,
          price: price
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.status === 201) {
        alert('Item added to cart successfully!');
        fetchCart();
      }
    } catch (error) {
      alert('Failed to add item to cart.');
    }
  };

  const removeItemFromCart = async (cartId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3001/cart/${cartId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert('Item removed from cart successfully!');
        const updatedCart = cart.filter(item => item.cart_id !== cartId);
        setCart(updatedCart);
      }
    } catch (error) {
      alert('Failed to remove item from cart.');
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$" />


        <button onClick={addItemToCart}>Add Item</button>
      </div>

      <ul>
        {cart.map((item) => (
          <li key={item.cart_id}>
            Name:{item.name}, Quantity: {item.quantity}, Price: {item.price}
            <button onClick={() => removeItemFromCart(item.cart_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
