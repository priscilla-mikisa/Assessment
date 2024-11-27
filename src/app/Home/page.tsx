'use client';
import React from 'react';
import { useShops } from '../hooks/useShop';
import { useProducts } from '../hooks/useProduct';
import { calculateTotalProductValue, formatCurrency } from '../utils/functionalityLogic';
import Layout from '../components/Layout';

export default function HomePage() {
  const { shops } = useShops();
  const { products } = useProducts();

  return (
    <Layout>
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome to ShopYangu Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-600">Total Shops</h3>
          <p className="text-2xl font-bold">{shops.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-600">Total Products</h3>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-600">Total Stock Value</h3>
          <p className="text-2xl font-bold">{formatCurrency(calculateTotalProductValue(products))}</p>
        </div>
      </div>
    </div>
    </Layout>
  );
}