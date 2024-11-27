"use client"
import { Shop } from '@/app/types/shop';
import React, { useState } from 'react';

interface ShopTableProps {
  shops: Shop[];
  onEdit: (shop: Shop) => void;
  onDelete: (id: number) => void;
}

const ShopTable: React.FC<ShopTableProps> = ({ shops, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 20 }}>
      <input 
        type="text"
        placeholder="Search Shops"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: 10, textAlign: 'left' }}>Name</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Description</th>
            <th style={{ padding: 10, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredShops.map(shop => (
            <tr key={shop.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{shop.name}</td>
              <td style={{ padding: 10 }}>{shop.description}</td>
              <td style={{ padding: 10, textAlign: 'right' }}>
                <button 
                  onClick={() => onEdit(shop)}
                  style={{
                    marginRight: 10,
                    padding: 5,
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(shop.id!)}
                  style={{
                    padding: 5,
                    backgroundColor: '#F44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopTable;