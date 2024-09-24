import React, { useState } from 'react';

const MenuInventory = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    editingIndex: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.editingIndex !== null) {
      // Update existing item
      const updatedItems = menuItems.map((item, index) =>
        index === formData.editingIndex ? formData : item
      );
      setMenuItems(updatedItems);
    } else {
      // Add new item
      setMenuItems([...menuItems, formData]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData({ ...menuItems[index], editingIndex: index });
  };

  const handleDelete = (index) => {
    const updatedItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedItems);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', editingIndex: null });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Restaurant Menu Inventory</h2>
      <form className="bg-white shadow-md rounded px-8 py-6 mb-6 w-full max-w-lg" onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-4">{formData.editingIndex !== null ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {formData.editingIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
          {formData.editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-4">Current Menu Inventory</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Item Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Price</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.description || 'N/A'}</td>
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
    </div>
  );
};

export default MenuInventory;
