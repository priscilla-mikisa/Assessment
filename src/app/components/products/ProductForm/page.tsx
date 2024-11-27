"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/app/schemas';
import { useShops } from '@/app/hooks/useShop';
import { z } from 'zod';

// Infer the type from the Zod schema
type ProductFormData = z.infer<typeof ProductSchema>;

// Define the prop types for the component
interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: ProductFormData | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData = null }) => {
  const { shops } = useShops();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      name: '',
      price: 0,
      stockLevel: 0,
      description: '',
      shopId: undefined,
    }
  });

  const submitHandler = (data: ProductFormData) => {
    onSubmit({
      ...data,
      price: Number(data.price),
      stockLevel: Number(data.stockLevel),
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(submitHandler)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
      }}
    >
      <input 
        {...register('name')}
        placeholder="Product Name"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      {errors.name && <span style={{color: 'red'}}>{errors.name.message}</span>}

      <input 
        {...register('price', { setValueAs: v => Number(v) })}
        type="number"
        placeholder="Price"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      {errors.price && <span style={{color: 'red'}}>{errors.price.message}</span>}

      <input 
        {...register('stockLevel', { setValueAs: v => Number(v) })}
        type="number"
        placeholder="Stock Level"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      {errors.stockLevel && <span style={{color: 'red'}}>{errors.stockLevel.message}</span>}

      <textarea 
        {...register('description')}
        placeholder="Product Description"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc',
          minHeight: 100
        }}
      />
      {errors.description && <span style={{color: 'red'}}>{errors.description.message}</span>}

      <select 
        {...register('shopId', { setValueAs: v => Number(v) })}
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      >
        <option value="">Select Shop</option>
        {shops.map(shop => (
          <option key={shop.id} value={shop.id}>
            {shop.name}
          </option>
        ))}
      </select>
      {errors.shopId && <span style={{color: 'red'}}>{errors.shopId.message}</span>}

      <button 
        type="submit"
        style={{
          padding: 10,
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        {initialData ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductForm;