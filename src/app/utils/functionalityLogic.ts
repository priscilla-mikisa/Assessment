export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  export const calculateTotalProductValue = (products: any[]) => {
    return products.reduce((total, product) => 
      total + (product.price * product.stockLevel), 0);
  };
  
  export const getStockStatus = (stockLevel: number) => {
    if (stockLevel === 0) return 'Out of Stock';
    if (stockLevel > 0 && stockLevel <= 5) return 'Low Stock';
    return 'In Stock';
  };
  
  export const groupProductsByStockStatus = (products: any[]) => {
    return products.reduce((acc, product) => {
      const status = getStockStatus(product.stockLevel);
      if (!acc[status]) acc[status] = [];
      acc[status].push(product);
      return acc;
    }, {});
  };