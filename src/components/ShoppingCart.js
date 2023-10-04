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

  const calculateTotalCost = () => {
    return cart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
  };

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
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h2>

        <div className="shadow-md bg-white p-6 rounded-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item Name"
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$"
              className="p-2 border rounded w-full"
            />
          </div>

          <button
            onClick={addItemToCart}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full"
          >
            Add Item
          </button>
        </div>

        <ul className="mt-6 space-y-4">
          {cart.map((item) => (
            <li key={item.cart_id} className="shadow-lg bg-white p-5 rounded-md flex justify-between items-center mb-4 hover:bg-gray-50 transition duration-300">
              <div className="flex items-center space-x-6">
                {/* Icon or Image for Product (optional) */}
                {/* <img src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover rounded" /> */}

                <div>
                  <span className="block text-lg font-semibold">{item.name}</span>
                  <span className="block text-gray-600 mt-2">
                    <span className="font-bold">Quantity:</span> {item.quantity}
                  </span>
                  <span className="block text-gray-600 mt-1">
                    <span className="font-bold">Price:</span> ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeItemFromCart(item.cart_id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-md shadow">
        <span className="text-lg font-bold">
          Total Cost: ${calculateTotalCost()}
        </span>
      </div>
    </div>

  );
}

export default ShoppingCart;
