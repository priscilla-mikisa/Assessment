import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShopSchema } from '@/app/schemas';
import { z } from 'zod';
import { Shop } from '@/app/types/shop';

type ShopFormData = z.infer<typeof ShopSchema>;

interface ShopFormProps {
  onSubmit: (data: ShopFormData) => void;
  initialData?: Partial<Shop> | null;
}

const ShopForm: React.FC<ShopFormProps> = ({ onSubmit, initialData = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShopFormData>({
    resolver: zodResolver(ShopSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      logo: ''
    }
  });

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
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
        placeholder="Shop Name"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      {errors.name && <span style={{color: 'red'}}>{errors.name.message}</span>}

      <textarea 
        {...register('description')}
        placeholder="Shop Description"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc',
          minHeight: 100
        }}
      />
      {errors.description && <span style={{color: 'red'}}>{errors.description.message}</span>}

      <input 
        {...register('logo')}
        placeholder="Logo URL"
        style={{
          padding: 10,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />

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
        {initialData ? 'Update Shop' : 'Create Shop'}
      </button>
    </form>
  );
};

export default ShopForm;