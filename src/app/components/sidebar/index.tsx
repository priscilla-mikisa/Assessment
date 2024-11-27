import React from 'react';
import Link from 'next/link';
import { FaHome, FaStore, FaBox, FaChartBar } from 'react-icons/fa';
import Layout from '../Layout';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, href: '/DashBoard' }, // Dashboard overview
    { label: 'Shops', icon: <FaStore />, href: '/shops' },        // Shop management
    { label: 'Products', icon: <FaBox />, href: '/Products' },    // Product management
    { label: 'Reports', icon: <FaChartBar />, href: '/reports' }, // Reports and analytics
  ];

  return (
    <Layout>
    <div style={{
      width: 250,
      height: '100vh',
      backgroundColor: '#2C3E50',
      color: 'white',
      padding: 20,
    }}>
      <div style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
      }}>
        ShopYangu Admin
      </div>

      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 12,
            marginBottom: 10,
            textDecoration: 'none',
            color: 'white',
            borderRadius: 8,
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#34495E'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{ marginRight: 10 }}>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
    </Layout>
  );
};

export default Sidebar;