import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../api/dataStorage';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError('Failed to create product');
    }
  };

  const editProduct = async (id: number, product: Product) => {
    try {
      const updatedProduct = await updateProduct(id, product);
      setProducts(prev => 
        prev.map(p => p.id === id ? updatedProduct : p)
      );
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { 
    products, 
    loading, 
    error, 
    addProduct, 
    editProduct, 
    removeProduct,
    refetch: loadProducts 
  };
};