import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuInventory = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    editingIndex: null,
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch all menu items and categories on component mount
    axios.get('/api/inventory')
      .then(response => {
        setMenuItems(response.data.items || []);
        setCategories(response.data.categories || []);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      category: formData.category, // Reference to category stays as is
    };

    if (formData.editingIndex !== null) {
      // Update existing item
      axios.put(`/api/inventory/${menuItems[formData.editingIndex]._id}`, itemData)
        .then(() => {
          const updatedItems = menuItems.map((item, index) =>
            index === formData.editingIndex ? itemData : item
          );
          setMenuItems(updatedItems);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating menu item:', error);
        });
    } else {
      // Add new item
      axios.post('/api/inventory', itemData)
        .then(response => {
          setMenuItems([...menuItems, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
        });
    }
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      axios.post('/api/inventory/categories', { category: newCategory })
        .then(response => {
          setCategories([...categories, response.data]);
          setNewCategory('');
        })
        .catch(error => {
          console.error('Error adding new category:', error);
        });
    }
  };

  const handleEdit = (index) => {
    setFormData({ ...menuItems[index], editingIndex: index });
  };

  const handleDelete = (index) => {
    const itemId = menuItems[index]._id;
    axios.delete(`/api/inventory/${itemId}`)
      .then(() => {
        const updatedItems = menuItems.filter((_, i) => i !== index);
        setMenuItems(updatedItems);
      })
      .catch(error => {
        console.error('Error deleting menu item:', error);
      });
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', editingIndex: null });
  };

  // Helper function to group menu items by category
  const groupItemsByCategory = () => {
    return menuItems.reduce((acc, item) => {
      const category = item.category ? item.category.name : 'Uncategorized'; // Use populated category name
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  const groupedItems = groupItemsByCategory();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Restaurant Menu Inventory</h2>

      {/* Add New Category Form */}
      <form className="bg-white shadow-md rounded px-8 py-4 mb-6 w-full max-w-lg" onSubmit={handleNewCategorySubmit}>
        <h3 className="text-lg font-semibold mb-4 text-center">Add New Category</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newCategory">Category Name:</label>
          <input
            type="text"
            id="newCategory"
            name="newCategory"
            value={newCategory}
            onChange={handleNewCategoryChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Add Category
        </button>
      </form>

      {/* Add or Edit Menu Item Form */}
      <form className="bg-white shadow-md rounded px-8 py-6 mb-6 w-full max-w-lg" onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-4 text-center">{formData.editingIndex !== null ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {formData.editingIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
          {formData.editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 w-full mt-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Menu Items List Grouped by Category */}
      <div className="overflow-x-auto w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-4 text-center">Current Menu Inventory</h3>
        {Object.keys(groupedItems).length > 0 ? (
          Object.keys(groupedItems).map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h4 className="text-xl font-bold mb-4 text-gray-700">{category}</h4>
              <table className="min-w-full bg-white border border-gray-200 text-left">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200">Item Name</th>
                    <th className="py-2 px-4 border-b border-gray-200">Description</th>
                    <th className="py-2 px-4 border-b border-gray-200">Price</th>
                    <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems[category].map((item, index) => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{item.price}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))} 
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default MenuInventory;
