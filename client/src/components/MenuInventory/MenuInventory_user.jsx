import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuInventoryUser = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch menu items and categories from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setMenuItems(response.data.items || []);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchData();
  }, []);

  // Function to add items to the cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      alert('Item is already in the cart!');
      return;
    }
    setCartItems([...cartItems, item]);
    alert(`${item.name} has been added to your cart!`);
  };

  // Filter menu items based on selected category
  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category.name === selectedCategory) // Check category name
    : menuItems;

  // Function to view cart
  const viewCart = () => {
    console.log('Viewing cart:', cartItems);
    // Implement your logic for displaying the cart items
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>

      {/* View Cart Button */}
      <div className="mb-4 flex justify-end w-full">
        <button
          onClick={viewCart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Cart
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}> {/* Use category name here */}
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto w-full max-w-4xl">
        {filteredItems.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Item Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Description</th>
                <th className="py-2 px-4 border-b border-gray-200">Price</th>
                <th className="py-2 px-4 border-b border-gray-200">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.price} ₹</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default MenuInventoryUser;
