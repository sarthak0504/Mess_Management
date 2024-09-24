import React, { useState, useEffect } from 'react';

const UserMenu = ({ inventory }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        {inventory.map((item, index) => (
          <li key={index} className="border p-2 mb-2 rounded flex justify-between">
            <div>
              <div className="font-bold">{item.itemName}</div>
              <div>Price: ${item.price}</div>
              {item.description && <div>{item.description}</div>}
            </div>
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Your Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="border p-2 mb-2 rounded">
                <div className="font-bold">{item.itemName}</div>
                <div>Price: ${item.price}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
