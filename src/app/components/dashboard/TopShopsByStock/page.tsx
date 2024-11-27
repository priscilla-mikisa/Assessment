import { Product } from '@/app/types/product';
import { Shop } from '@/app/types/shop';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TopShopsByStockProps {
  shops: Shop[];
  products: Product[];
}

const TopShopsByStock: React.FC<TopShopsByStockProps> = ({ shops, products }) => {
  const shopStockData = shops.map(shop => {
    const shopProducts = products.filter(p => p.shopId === shop.id);
    const totalStock = shopProducts.reduce((sum, product) => sum + product.stockLevel, 0);
    return {
      name: shop.name,
      stock: totalStock
    };
  }).sort((a, b) => b.stock - a.stock).slice(0, 5);

  return (
    <div style={{ 
      width: '100%', 
      height: 300, 
      backgroundColor: 'white', 
      borderRadius: 8, 
      padding: 16 
    }}>
      <h2 style={{ 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 16 
      }}>
        Top 5 Shops by Stock Level
      </h2>
      <ResponsiveContainer>
        <BarChart data={shopStockData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopShopsByStock;