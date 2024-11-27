// import { useState, useEffect } from 'react';
// import { Shop } from '../types/shop';
// import { createShop, deleteShop, fetchShops, updateShop } from '../api/dataStorage';

// export const useShops = () => {
//   const [shops, setShops] = useState<Shop[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadShops = async () => {
//     try {
//       setLoading(true);
//       const fetchedShops = await fetchShops();
//       setShops(fetchedShops);
//     } catch (err) {
//       setError('Failed to fetch shops');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addShop = async (shop: Shop) => {
//     try {
//       const newShop = await createShop(shop);
//       setShops(prev => [...prev, newShop]);
//     } catch (err) {
//       setError('Failed to create shop');
//     }
//   };

//   const editShop = async (id: number, shop: Shop) => {
//     try {
//       const updatedShop = await updateShop(id, shop);
//       setShops(prev => 
//         prev.map(s => s.id === id ? updatedShop : s)
//       );
//     } catch (err) {
//       setError('Failed to update shop');
//     }
//   };

//   const removeShop = async (id: number) => {
//     try {
//       await deleteShop(id);
//       setShops(prev => prev.filter(shop => shop.id !== id));
//     } catch (err) {
//       setError('Failed to delete shop');
//     }
//   };

//   useEffect(() => {
//     loadShops();
//   }, []);

//   return { 
//     shops, 
//     loading, 
//     error, 
//     addShop, 
//     editShop, 
//     removeShop,
//     refetch: loadShops 
//   };
// };

import { useState, useEffect } from 'react';
import { Shop } from '../types/shop';
import { createShop, deleteShop, fetchShops, updateShop } from '../api/dataStorage';
import { useProducts } from './useProduct';

export const useShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { products } = useProducts(); // Access product data to validate deletion

  const loadShops = async () => {
    try {
      setLoading(true);
      const fetchedShops = await fetchShops();
      setShops(fetchedShops);
    } catch (err) {
      setError('Failed to fetch shops');
    } finally {
      setLoading(false);
    }
  };

  const addShop = async (shop: Shop) => {
    try {
      const newShop = await createShop(shop);
      setShops(prev => [...prev, newShop]);
    } catch (err) {
      setError('Failed to create shop');
    }
  };

  const editShop = async (id: number, shop: Shop) => {
    try {
      const updatedShop = await updateShop(id, shop);
      setShops(prev => prev.map(s => (s.id === id ? updatedShop : s)));
    } catch (err) {
      setError('Failed to update shop');
    }
  };

  const removeShop = async (id: number) => {
    const shopProducts = products.filter(product => product.shopId === id);
    if (shopProducts.length > 0) {
      setError('Cannot delete shop with active products. Reassign or delete products first.');
      return;
    }
    try {
      await deleteShop(id);
      setShops(prev => prev.filter(shop => shop.id !== id));
    } catch (err) {
      setError('Failed to delete shop');
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  return { shops, loading, error, addShop, editShop, removeShop, refetch: loadShops };
};