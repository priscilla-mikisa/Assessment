// "use client"
// import { Product } from '@/app/types/product';
// import { formatCurrency } from '@/app/utils/functionalityLogic';
// import React, { useState } from 'react';

// interface ProductTableProps {
//   products: Product[];
//   onEdit: (product: Product) => void;
//   onDelete: (id: number) => void;
// }

// const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 20 }}>
//       <input
//         type="text"
//         placeholder="Search Products"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{
//           width: '100%',
//           padding: 10,
//           marginBottom: 15,
//           borderRadius: 4,
//           border: '1px solid #ccc'
//         }}
//       />
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f4f4f4' }}>
//             <th style={{ padding: 10, textAlign: 'left' }}>Name</th>
//             <th style={{ padding: 10, textAlign: 'left' }}>Price</th>
//             <th style={{ padding: 10, textAlign: 'left' }}>Stock</th>
//             <th style={{ padding: 10, textAlign: 'right' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map(product => (
//             <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
//               <td style={{ padding: 10 }}>{product.name}</td>
//               <td style={{ padding: 10 }}>{formatCurrency(product.price)}</td>
//               <td style={{ padding: 10 }}>{product.stockLevel}</td>
//               <td style={{ padding: 10, textAlign: 'right' }}>
//                 <button
//                   onClick={() => onEdit(product)}
//                   style={{
//                     marginRight: 10,
//                     padding: 5,
//                     backgroundColor: '#2196F3',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: 4
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(product.id!)}
//                   style={{
//                     padding: 5,
//                     backgroundColor: '#F44336',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: 4
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductTable;


// src/app/components/products/ProductsTable/page.tsx
"use client";
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Product } from '@/app/types/product';
import { formatCurrency } from '@/app/utils/functionalityLogic';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{formatCurrency(product.price)}</td>
              <td className="py-2 px-4">{product.stockLevel}</td>
              <td className="py-2 px-4 text-right">
                <button
                  onClick={() => onEdit(product)}
                  className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id!)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex justify-center mt-4 space-x-2"
        activeClassName="font-bold"
        pageClassName="px-3 py-1 border rounded"
        nextClassName="px-3 py-1 border rounded"
        previousClassName="px-3 py-1 border rounded"
      />
    </div>
  );
};

export default ProductTable;