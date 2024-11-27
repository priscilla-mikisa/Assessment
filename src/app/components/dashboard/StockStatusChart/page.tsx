import { Product } from '@/app/types/product';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface StockStatusChartProps {
  products: Product[];
}

const getStockStatus = (stockLevel: number): string => {
  if (stockLevel <= 0) return 'Out of Stock';
  if (stockLevel < 10) return 'Low Stock';
  return 'In Stock';
};

const StockStatusChart: React.FC<StockStatusChartProps> = ({ products }) => {
  const stockStatusData = Object.entries(
    products.reduce((acc: Record<string, number>, product) => {
      const status = getStockStatus(product.stockLevel);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS: Record<string, string> = {
    'In Stock': '#4CAF50',
    'Low Stock': '#FFC107',
    'Out of Stock': '#F44336'
  };

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
        Stock Status Distribution
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={stockStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {stockStatusData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name]} 
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockStatusChart;
