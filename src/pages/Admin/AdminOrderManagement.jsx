import  { useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', items: 'Burger, Fries', total: 15.99, status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', items: 'Pizza, Salad', total: 22.50, status: 'Completed' },
    { id: 3, customerName: 'Bob Johnson', items: 'Sushi Platter', total: 35.00, status: 'In Progress' },
  ]);

  const [newOrder, setNewOrder] = useState({ customerName: '', items: '', total: '', status: 'Pending' });
  const [editingOrder, setEditingOrder] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingOrder) {
      setEditingOrder({ ...editingOrder, [name]: value });
    } else {
      setNewOrder({ ...newOrder, [name]: value });
    }
  };

  const addOrder = (e) => {
    e.preventDefault();
    if (!newOrder.customerName || !newOrder.items || !newOrder.total) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }
    const newId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1;
    setOrders([...orders, { ...newOrder, id: newId, total: parseFloat(newOrder.total) }]);
    setNewOrder({ customerName: '', items: '', total: '', status: 'Pending' });
    setMessage({ text: 'Order added successfully', type: 'success' });
  };

  const removeOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    setMessage({ text: 'Order removed successfully', type: 'success' });
  };

  const startEditing = (order) => {
    setEditingOrder(order);
  };

  const saveEdit = () => {
    setOrders(orders.map(order => order.id === editingOrder.id ? editingOrder : order));
    setEditingOrder(null);
    setMessage({ text: 'Order updated successfully', type: 'success' });
  };

  const cancelEdit = () => {
    setEditingOrder(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>

      {/* Add Order Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
        <form onSubmit={addOrder} className="space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={newOrder.customerName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label htmlFor="items" className="block text-gray-700 text-sm font-bold mb-2">Items</label>
            <input
              type="text"
              id="items"
              name="items"
              value={newOrder.items}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter items (comma separated)"
            />
          </div>
          <div>
            <label htmlFor="total" className="block text-gray-700 text-sm font-bold mb-2">Total</label>
            <input
              type="number"
              id="total"
              name="total"
              value={newOrder.total}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter total amount"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              id="status"
              name="status"
              value={newOrder.status}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FaPlus className="mr-2" /> Add Order
          </button>
        </form>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className={`mb-4 p-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {/* Order List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        name="customerName"
                        value={editingOrder.customerName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-no-wrap">{order.customerName}</p>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="text"
                        name="items"
                        value={editingOrder.items}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-no-wrap">{order.items}</p>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingOrder && editingOrder.id === order.id ? (
                      <input
                        type="number"
                        name="total"
                        value={editingOrder.total}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        step="0.01"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-no-wrap">${order.total.toFixed(2)}</p>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingOrder && editingOrder.id === order.id ? (
                      <select
                        name="status"
                        value={editingOrder.status}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        order.status === 'Completed' ? 'text-green-900' :
                        order.status === 'Pending' ? 'text-yellow-900' :
                        order.status === 'In Progress' ? 'text-blue-900' : 'text-red-900'
                      }`}>
                        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${
                          order.status === 'Completed' ? 'bg-green-200' :
                          order.status === 'Pending' ? 'bg-yellow-200' :
                          order.status === 'In Progress' ? 'bg-blue-200' : 'bg-red-200'
                        }`}></span>
                        <span className="relative">{order.status}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingOrder && editingOrder.id === order.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:text-green-900 transition duration-300 ease-in-out"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(order)}
                          className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => removeOrder(order.id)}
                          className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;