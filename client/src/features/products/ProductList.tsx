import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './types';

const API_URL = 'http://localhost:3000';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (product: Product) => {
    try {
      const { id, createdAt, updatedAt, ...updateData } = product;
      await axios.put(`${API_URL}/products/${id}`, updateData);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="product-list">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {error && <div className="error-message">{error}</div>}
      <button onClick={fetchProducts} className="refresh-btn">
        Actualizar
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              {editingId === product.id ? (
                <EditableRow
                  product={product}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-btn"
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="empty-message">No hay productos disponibles</div>
      )}
    </div>
  );
}

interface EditableRowProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

function EditableRow({ product, onSave, onCancel }: EditableRowProps) {
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <td>{product.id}</td>
      <td>
        <input
          type="text"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={e => handleChange('price', parseFloat(e.target.value) || 0)}
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          value={formData.stock}
          onChange={e => handleChange('stock', parseInt(e.target.value) || 0)}
        />
      </td>
      <td>
        <input
          type="text"
          value={formData.category}
          onChange={e => handleChange('category', e.target.value)}
        />
      </td>
      <td className="actions">
        <button onClick={() => onSave(formData)} className="save-btn">
          Guardar
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
      </td>
    </>
  );
}