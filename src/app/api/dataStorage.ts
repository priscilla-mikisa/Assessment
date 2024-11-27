import { Product } from "../types/product";
import { Shop } from "../types/shop";

const apiUrl = process.env.API_URL;

export const fetchShops = async (): Promise<Shop[]> => {
  const response = await fetch(`${apiUrl}/shops`);
  return response.json();
};

export const createShop = async (shop: Shop): Promise<Shop> => {
  const response = await fetch(`${apiUrl}/shops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shop)
  });
  return response.json();
};

export const updateShop = async (id: number, shop: Shop): Promise<Shop> => {
  const response = await fetch(`${apiUrl}/shops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shop)
  });
  return response.json();
};

export const deleteShop = async (id: number): Promise<void> => {
  await fetch(`${apiUrl}/shops/${id}`, { method: 'DELETE' });
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${apiUrl}/products`);
  return response.json();
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(`${apiUrl}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return response.json();
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`${apiUrl}/products/${id}`, { method: 'DELETE' });
};