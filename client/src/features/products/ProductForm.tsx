import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { CreateProductDto, Product } from './types';

const API_URL = 'http://localhost:3000';

const productSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  price: z.number()
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio excede el límite permitido'),
  stock: z.number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  category: z.string()
    .min(1, 'La categoría es requerida')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSuccess?: () => void;
  initialData?: Product;
}

export function ProductForm({ onSuccess, initialData }: ProductFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: initialData
      ? {
          name: initialData.name,
          price: initialData.price,
          stock: initialData.stock,
          category: initialData.category,
        }
      : {
          name: '',
          price: 0,
          stock: 0,
          category: '',
        },
  });

  const onSubmit = async (data: ProductFormData) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (initialData) {
        const { id, createdAt, updatedAt, ...updateData } = { id: initialData.id, ...data };
        await axios.put(`${API_URL}/products/${initialData.id}`, updateData);
      } else {
        const createDto: CreateProductDto = {
          name: data.name,
          price: data.price,
          stock: data.stock,
          category: data.category,
        };
        await axios.post(`${API_URL}/products`, createDto);
      }

      setSubmitSuccess(true);
      reset();
      
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setSubmitError('Ya existe un producto con ese nombre');
        } else {
          setSubmitError(err.response?.data?.message || 'Error al guardar el producto');
        }
      } else {
        setSubmitError('Error inesperado al guardar el producto');
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del producto</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Ingrese el nombre del producto"
          />
          {errors.name && (
            <span className="error">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            {...register('stock', { valueAsNumber: true })}
            placeholder="0"
          />
          {errors.stock && (
            <span className="error">{errors.stock.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            type="text"
            {...register('category')}
            placeholder="Ingrese la categoría"
          />
          {errors.category && (
            <span className="error">{errors.category.message}</span>
          )}
        </div>

        {submitError && (
          <div className="form-error">{submitError}</div>
        )}

        {submitSuccess && (
          <div className="form-success">
            {initialData ? 'Producto actualizado correctamente' : 'Producto creado correctamente'}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="submit-btn"
          >
            {submitting
              ? 'Guardando...'
              : initialData
              ? 'Actualizar'
              : 'Crear Producto'}
          </button>
          
          <button
            type="button"
            onClick={() => reset()}
            className="reset-btn"
            disabled={submitting}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}