'use client';
import React, { useState } from 'react';
import ProductForm from '@/app/components/products/ProductForm/page';
import ProductTable from '@/app/components/products/ProductsTable/page';
import { useProducts } from '@/app/hooks/useProduct';
import { useShops } from '@/app/hooks/useShop';
import { Product } from '@/app/types/product';

export default function ProductsPage() {
  const { products, addProduct, editProduct, removeProduct } = useProducts();
  const { shops } = useShops();
  const [filters, setFilters] = useState({ shopId: '', minPrice: 0, maxPrice: 0 });
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);

  const filteredProducts = products.filter(product => {
    const matchesShop = filters.shopId ? product.shopId === Number(filters.shopId) : true;
    const matchesPrice =
      product.price >= filters.minPrice &&
      (filters.maxPrice === 0 || product.price <= filters.maxPrice);
    return matchesShop && matchesPrice;
  });

  const handleSubmit = (data:Product) => {
    if (selectedProduct) {
      editProduct(selectedProduct.id!, data);
    } else {
      addProduct(data);
    }
    setSelectedProduct(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Manage Products</h1>
      <div className="flex gap-4 mb-6">
        <select
          value={filters.shopId}
          onChange={(e) => setFilters({ ...filters, shopId: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Shops</option>
          {shops.map(shop => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="p-2 border rounded"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="p-2 border rounded"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductForm onSubmit={handleSubmit} initialData={selectedProduct} />
        <ProductTable
          products={filteredProducts}
          onEdit={(product) => setSelectedProduct(product)}
          onDelete={(id) => removeProduct(id)}
        />
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from 'react';
// import ProductForm from '../components/products/ProductForm/page';
// import ProductTable from '../components/products/ProductsTable/page';
// import { useProducts } from '../hooks/useProduct';
// import { useShops } from '../hooks/useShop';
// import { Product } from '@/app/types/product';

// export default function ProductsPage() {
//   const { products, addProduct, editProduct, removeProduct } = useProducts();
//   const { shops } = useShops();
//   const [filters, setFilters] = useState({ shopId: '', minPrice: 0, maxPrice: 0 });
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const filteredProducts = products.filter(product => {
//     const matchesShop = filters.shopId ? product.shopId === Number(filters.shopId) : true;
//     const matchesPrice =
//       product.price >= filters.minPrice &&
//       (filters.maxPrice === 0 || product.price <= filters.maxPrice);
//     return matchesShop && matchesPrice;
//   });

//   const handleSubmit = (data: Product) => {
//     if (selectedProduct) {
//       editProduct(selectedProduct.id!, data); // Use `!` to assert that `id` exists
//     } else {
//       addProduct(data);
//     }
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-8">Manage Products</h1>
//       <div className="flex gap-4 mb-6">
//         <select
//           value={filters.shopId}
//           onChange={(e) => setFilters({ ...filters, shopId: e.target.value })}
//           className="p-2 border rounded"
//         >
//           <option value="">All Shops</option>
//           {shops.map(shop => (
//             <option key={shop.id} value={shop.id}>
//               {shop.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           placeholder="Min Price"
//           className="p-2 border rounded"
//           value={filters.minPrice}
//           onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
//         />
//         <input
//           type="number"
//           placeholder="Max Price"
//           className="p-2 border rounded"
//           value={filters.maxPrice}
//           onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <ProductForm onSubmit={handleSubmit} initialData={selectedProduct} />
//         <ProductTable
//           products={filteredProducts}
//           onEdit={(product) => setSelectedProduct(product)}
//           onDelete={(id) => removeProduct(id)}
//         />
//       </div>
//     </div>
//   );
// }