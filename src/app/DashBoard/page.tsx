'use client';
import React from 'react';
import { useShops } from '@/app/hooks/useShop';
import { useProducts } from '@/app/hooks/useProduct';
import StockStatusChart from '@/app/components/dashboard/StockStatusChart/page';
import TopShopsByStock from '@/app/components/dashboard/TopShopsByStock/page';
import { calculateTotalProductValue, formatCurrency } from '@/app/utils/functionalityLogic';
import Layout from '../components/Layout';
export default function Dashboard() {
  const { shops } = useShops();
  const { products } = useProducts();
  const dashboardMetrics = [
    { label: 'Total Shops', value: shops.length },
    { label: 'Total Products', value: products.length },
    { label: 'Total Product Value', value: formatCurrency(calculateTotalProductValue(products)) },
    { label: 'Total Stock', value: products.reduce((sum, p) => sum + p.stockLevel, 0) },
  ];
  return (
    <Layout>
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {dashboardMetrics.map((metric, index) => (
          <div key={index} className="bg-white shadow p-4 rounded">
            <h3 className="text-gray-600">{metric.label}</h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <StockStatusChart products={products} />
        <TopShopsByStock shops={shops} products={products} />
      </div>
    </div>
    </Layout>
  );
}
