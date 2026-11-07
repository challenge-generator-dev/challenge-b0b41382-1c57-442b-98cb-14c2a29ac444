import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from '@/features/products/ProductList';
import { ProductForm } from '@/features/products/ProductForm';

export default function App() {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
  };

  const handleCloseForm = () => {
    setProductToEdit(null);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Gestión de Inventario</h1>
          <nav>
            <Link to="/">Productos</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <button
                    className="add-button"
                    onClick={() => setProductToEdit(null)}
                  >
                    Agregar Producto
                  </button>
                  <ProductList onEdit={handleEdit} />
                  {productToEdit !== null && (
                    <ProductForm
                      product={productToEdit}
                      onClose={handleCloseForm}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/new"
              element={<ProductForm onClose={handleCloseForm} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}