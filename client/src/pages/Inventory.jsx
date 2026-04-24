import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Layout } from '../components/Layout';
import { LoadingSpinner, Badge } from '../components/Common';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    quantity: '',
    price: '',
    supplier: '',
    reorderLevel: '10',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/inventory');
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/inventory/${editingId}`, formData);
      } else {
        await axiosInstance.post('/inventory', formData);
      }
      setFormData({
        name: '',
        sku: '',
        category: 'Electronics',
        quantity: '',
        price: '',
        supplier: '',
        reorderLevel: '10',
      });
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axiosInstance.delete(`/inventory/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
    setShowForm(true);
  };

  if (loading) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Inventory</h1>
            <p className="text-slate-600 text-sm mt-1">Manage products and stock levels</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                name: '',
                sku: '',
                category: 'Electronics',
                quantity: '',
                price: '',
                supplier: '',
                reorderLevel: '10',
              });
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {error && <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg text-sm">{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Office">Office</option>
                <option value="Furniture">Furniture</option>
                <option value="Supplies">Supplies</option>
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
              />
              <input
                type="number"
                placeholder="Reorder Level"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors md:col-span-2 text-sm"
              >
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.supplier || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.quantity <= product.reorderLevel ? (
                      <Badge color="red">Low Stock</Badge>
                    ) : (
                      <Badge color="green">In Stock</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-teal-600 hover:text-teal-700 font-medium text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-700 font-medium text-xs"
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
    </Layout>
  );
};

export default Inventory;
